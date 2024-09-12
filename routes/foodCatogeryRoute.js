const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('./../jwtAuth');
const {
  createCatogery,
  Allcategories,
  updateFoodCategory,
  deleteCatogery
} = require('./../controllers/foodCatogeryController');

// Route to create a food category, with restaurantId in URL params
router.post('/createCatogery', jwtAuthMiddleware, createCatogery);

// Route to get all food categories
router.get('/categories', jwtAuthMiddleware, Allcategories);

// Route to update a food category by ID
router.put('/:id', jwtAuthMiddleware, updateFoodCategory);

// Route to delete a food category by ID
router.delete('/:id', jwtAuthMiddleware, deleteCatogery);

module.exports = router;
