const express = require('express');
const router = express.Router();
const { getAllUsers, changeUserRole } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.patch('/:id', authMiddleware, roleMiddleware('admin'), changeUserRole);

module.exports = router;