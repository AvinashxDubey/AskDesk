const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {timestamps: true});

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["open", "in-progress", "closed"], default: "open" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [replySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);