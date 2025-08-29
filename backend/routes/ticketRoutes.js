const express = require('express');
const router = express.Router();
const { createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    addReply,
    toggleUpvote,
    toggleDownvote } = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('user'), createTicket);
router.get('/', authMiddleware, getTickets);
router.get('/:id', authMiddleware, getTicketById);
router.patch('/:id', authMiddleware, roleMiddleware('admin', 'agent'), updateTicket);
router.patch('/reply/:id', authMiddleware, addReply);
router.patch('/upvote/:id', authMiddleware, roleMiddleware('user'), toggleUpvote);
router.patch('/downvote/:id', authMiddleware, roleMiddleware('user'), toggleDownvote);

module.exports = router;