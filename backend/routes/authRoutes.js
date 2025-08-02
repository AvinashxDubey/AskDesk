const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const {authToken} = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authToken, getProfile);

module.exports = router;