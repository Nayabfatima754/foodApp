const express = require('express');
const {addFood,getAllFood,updateFood,deleteFoodItem,order} = require('../controllers/foodController')
const router = express.Router();
const jwtAuthMiddleware = require('../jwtAuth')

router.post('/addfood',jwtAuthMiddleware,addFood);
router.get('/AllFood',jwtAuthMiddleware,getAllFood);
router.put('/:id',jwtAuthMiddleware,updateFood);
router.delete('/:id',jwtAuthMiddleware,deleteFoodItem);
router.post('/PlaceOrder',jwtAuthMiddleware,order);




module.exports=router;
