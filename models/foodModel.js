const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Food title is required'],
  },
  description: {
    type: String,
    required: [true, 'Food description is required'],
  },
  tag: {
    type: [String], // Array of tags for flexibility
    required: [true, 'At least one tag is required'],
  },
  code: {
    type: String,
    required: [true, 'Food code is required'],
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodCategory',
    required: [true, 'Category is required'],
  },
  price:{
    type:String,
    required:true
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  ratingCount:{
    type:String
  
  },
  imageUrl: {
    type: String,
  },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
