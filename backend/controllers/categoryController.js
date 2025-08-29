const Category = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  }
  catch (err) {
    console.error('Error fetching categories: ', err);
    res.status(500).json({ message: 'Server error' });
  }
}

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name, description });
    res.status(201).json(category);
  }
  catch (err) {
    console.error('Error creating category: ', err);
    res.status(500).json({ message: 'Server error' });
  }
}

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ message: "Category isn't found!!" });
    }

    const existingCategory = await Category.findOne({ name, _id: { $ne: id } });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category name already in use' });
    }

    if (name) {
      category.name = name;
    }

    if (description) {
      category.description = description;
    }

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }

}

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};