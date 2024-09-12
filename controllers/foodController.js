const foodModel = require('./../models/foodModel');
const mongoose = require('mongoose');
const orderModel = require('./../models/orderModel');

// Add food item
const addFood = async (req, res) => {
    const { title, description, tag, code, category, isAvailable, rating, imageUrl, price } = req.body;

    try {
        if (!title || !description || !tag || !code || !category || !price) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newFood = await foodModel.create({
            title, 
            description, 
            tag, 
            code, 
            category, 
            isAvailable, 
            rating,  
            imageUrl, 
            price
        });

        res.status(200).json({ message: 'Food item added', newFood });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all food items
const getAllFood = async (req, res) => {
    try {
        const foods = await foodModel.find()
        if (!foods) {
            return res.status(400).json({ message: 'Food items not found' });
        }
        res.status(200).json(foods);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update food item
const updateFood = async (req, res) => {
    const foodId = req.params.id;
    const { title, description, tag, code, category, isAvailable, rating, imageUrl, price } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
            title, 
            description, 
            tag, 
            code, 
            category, 
            isAvailable, 
            rating, 
            imageUrl, 
            price
        }, { new: true }); // Return the updated document

        if (!updatedFood) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json({ message: 'Food item updated successfully', updatedFood });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete food item
const deleteFoodItem = async (req, res) => {
    const foodId = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const requestedFood = await foodModel.findByIdAndDelete(foodId);
        if (!requestedFood) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json({ message: 'Food item deleted successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Create an order
const order = async (req, res) => {
    const { cart, buyerId } = req.body; // Assuming buyerId is sent in the body
    let total = 0;

    try {
        if (!cart || cart.length === 0) {
            return res.status(400).json({ message: "Please provide a valid food cart and payment" });
        }

        // Calculate total price
        cart.forEach((item) => {
            total += parseFloat(item.price); // Ensure price is treated as a number
        });

        // Create the new order
        const newOrder = new orderModel({
            food: cart,
            payment: total,
            buyer: buyerId // Ensure buyerId is provided or fetched from auth middleware
        });

        // Save the new order
        await newOrder.save();

        // Return the new order response
        res.status(200).json({ message: 'New order created', newOrder });

    } catch (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addFood, getAllFood, updateFood, deleteFoodItem, order };
