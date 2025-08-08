const express = require('express');
const router = express.Router();
const { getAllUsers, changeUserRole } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/user', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.patch('/user/:id/role', authMiddleware, roleMiddleware('admin'), changeUserRole);

module.exports = router;