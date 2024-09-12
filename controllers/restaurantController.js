const express = require('express');
const User = require('./../models/userModel');
const Restaurant = require('./../models/restaurant');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// registration

const createRestaurant = async (req, res) => {
    console.log("Request body:", req.body); // Log incoming request body
  
    const { title, imageUrl, food, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, restaurantCode, coords } = req.body;
  
    // Validate required fields
    if (!title || !coords) {
      console.log("Validation failed: Missing title or coordinates");
      return res.status(400).json({ message: 'Title and coordinates are required.' });
    }
  
    try {
      console.log("Creating restaurant...");
  
      // Create restaurant
      const newRestaurant = await Restaurant.create({
        title, imageUrl, food, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, restaurantCode, coords
      });
  
      console.log("Restaurant created successfully:", newRestaurant);
  
      // Send response
      return res.status(201).json({ newRestaurant });
  
    } catch (err) {
      console.error("Error creating restaurant:", err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  // to get all restaurants
  const Allrestaurants = async (req, res) => {
    try {
      // Fetch all restaurants from the database
      const allRestaurants = await Restaurant.find();
      
      // Check if no restaurants were found
      if (!allRestaurants || allRestaurants.length === 0) {
        return res.status(404).json({ message: 'No restaurants found' });
      }
  
      // Return the count and the list of restaurants
      return res.status(200).json({
        count: allRestaurants.length,
        restaurants: allRestaurants
      });
    } catch (err) {
      console.error('Error retrieving restaurants:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
// get specific restaurant by id
const requestedRestaurant = async(req,res)=>{
    const restaurantID = req.params.id;
    try{
        const restaurant = await Restaurant.findById(restaurantID);
        if(!restaurant){
            return res.status(404).json({ message: 'restaurant not found' });

        }
        return res.status(200).json(restaurant );


    }catch(err){
        console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
}  ;
// delete restaurant by id Api 
const deleteRestaurant = async(req, res) => {
    const restaurantID = req.params.id; // postman k params ma se id lenge ya phr slash kr k id likhenge

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(restaurantID)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Fetch the restaurant by ID and ensure it belongs to the authenticated user
        const requestedRestaurant = await Restaurant.findByIdAndDelete(restaurantID);

        // Check if contact was found
        if (!requestedRestaurant) {
            return res.status(404).json({ error: 'restaurant not found' });
        }

        // Delete the restaurant

        return res.status(200).json({ message: 'restaurant deleted successfully' });
    } catch (err) {
        console.error('Error deleting restaurant:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
  const updateRestaurant = async(req,res)=>{
    const restaurantID = req.params.id
    const { title,imageUrl,food, time, pickup,delivery,isOpen, logoUrl,rating,ratingCount,restaurantCode,coords}=req.body
    try{
        if(!title){
            return res.status(400).json({message:'please enter title to updte'});

        }
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantID,{title,imageUrl,food, time, pickup,delivery,isOpen, logoUrl,rating,ratingCount,restaurantCode,coords})
        if(!updatedRestaurant){
            return res.status(404).json({message:'restaurant not found'});

        }
         res.status(200).json({message:'restaurant updated succesfuly',updatedRestaurant});

    }catch(err){
        console.error('Error deleting restaurant:', err);
        return res.status(500).json({ error: "Internal Server Error" });

        
    }
  };
  module.exports = { createRestaurant,Allrestaurants,requestedRestaurant,deleteRestaurant,updateRestaurant };