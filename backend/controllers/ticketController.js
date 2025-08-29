const Ticket = require("../models/Ticket");
const sendEmail = require("../utils/emailSender");

const createTicket = async (req, res) => {
    try {
        const { title, description, priority } = req.body;
        const ticket = await Ticket.create({
            title,
            description,
            priority,
            createdBy: req.user._id
        });
        
        await sendEmail({
            to: req.user.email,
            subject: `New ticket created: ${ticket.title}`,
            message: 'Your ticket has been created successfully. Our agents will get to you ASAP!\n Regards\n AskDesk Team'
        })
        res.status(201).json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTickets = async (req, res) => {
    try {
        const { status, priority, page = 1, limit = 10, view = "all" } = req.query;

        let query = {};

        if (status) query.status = status;
        if (priority) query.priority = priority;

        // Restrict to own tickets if user is not admin and view != all
        if (req.user.role !== "admin") {
            if (view === "mine") {
                query.createdBy = req.user._id; // Only user's tickets
            }
            else if (view === "assigned") {
                query.assignedTo = req.user._id; // Only tickets assigned to agent
            }
        }

        const tickets = await Ticket.find(query)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .populate("replies.createdBy", "name email")
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        res.json(tickets);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    };
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { status, assignedTo } = req.body;
        let ticket = await Ticket.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (status) ticket.status = status;
        if (assignedTo) ticket.assignedTo = assignedTo;

        await ticket.save();
        // TODO: Trigger email on status change
        await sendEmail({
            to: ticket.createdBy.email,
            subject: `Agent assigned to your ticket: ${ticket.title}`,
            message: 'Agents are reviewing your query right now. They will reply within a few hours.\n Regards\n AskDesk Team'
        })
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addReply = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        ticket.replies.push({
            message: req.body.message,
            createdBy: req.user._id
        });

        await ticket.save();
        res.status(201).json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const toggleUpvote = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const userId = req.user._id.toString();

    const index = ticket.upvotes.findIndex(id => id.toString() === userId);
    if (index === -1) {
      ticket.upvotes.push(req.user._id);
      // remove downvote if exists
      ticket.downvotes = ticket.downvotes.filter(id => id.toString() !== userId);
    } else {
      ticket.upvotes.splice(index, 1);
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleDownvote = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const userId = req.user._id.toString();

    const index = ticket.downvotes.findIndex(id => id.toString() === userId);
    if (index === -1) {
      ticket.downvotes.push(req.user._id);
      // remove upvote if exists
      ticket.upvotes = ticket.upvotes.filter(id => id.toString() !== userId);
    } else {
      ticket.downvotes.splice(index, 1);
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    addReply,
    toggleUpvote,
    toggleDownvote
};