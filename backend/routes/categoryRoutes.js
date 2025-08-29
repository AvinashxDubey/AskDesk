const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, getCategories);
router.post('/', authMiddleware, roleMiddleware('admin'), createCategory);
router.patch('/:id', authMiddleware, roleMiddleware('admin'), updateCategory);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteCategory);

module.exports = router;