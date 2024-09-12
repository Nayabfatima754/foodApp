const express = require('express');
const { createRestaurant, Allrestaurants,requestedRestaurant,deleteRestaurant,updateRestaurant} = require('../controllers/restaurantController');
const router = express.Router();
const jwtAuthMiddleware = require('../jwtAuth');
const Restaurant = require('../models/restaurant');

router.post('/create',jwtAuthMiddleware,createRestaurant);
router.get('/restaurants',jwtAuthMiddleware,Allrestaurants);
router.get('/:id',jwtAuthMiddleware,requestedRestaurant);
router.delete('/:id',jwtAuthMiddleware,deleteRestaurant);
router.put('/:id',jwtAuthMiddleware,updateRestaurant);









module.exports=router;