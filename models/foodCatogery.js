const mongoose = require('mongoose');

// Define the FoodCategory schema
const FoodCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Category title is required']
    },
    imageUrl: {
        type: String
    },
});

// Create the FoodCategory model
const FoodCategory = mongoose.model('FoodCategory', FoodCategorySchema);

module.exports = FoodCategory;
