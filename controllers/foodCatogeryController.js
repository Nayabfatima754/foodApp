const FoodCategories = require('./../models/foodCatogery');
const mongoose = require('mongoose');

// Create a new food category
const createCatogery = async (req, res) => {
    const { title } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const existing = await FoodCategories.findOne({ title });
        if (existing) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const newCategory = await FoodCategories.create({ title});
        await newCategory.save();
        res.status(200).json({ message: 'Category created successfully', newCategory });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all food categories
const Allcategories = async (req, res) => {
    try {
        const allCategories = await FoodCategories.find();
        if (!allCategories) {
            return res.status(400).json({ message: 'No categories found' });
        }
        res.status(200).json(allCategories);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update food category
const updateFoodCategory = async (req, res) => {
    const categoryID = req.params.id;
    const { title, imageUrl } = req.body;

    try {
        // Ensure title is provided
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Find and update the category
        const updatedCategory = await FoodCategories.findByIdAndUpdate(categoryID, { title, imageUrl}, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', updatedCategory });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a food category
const deleteCatogery = async (req, res) => {
    const categoryID = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(categoryID)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const requestedCategory = await FoodCategories.findByIdAndDelete(categoryID);
        if (!requestedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createCatogery, Allcategories, updateFoodCategory, deleteCatogery };
