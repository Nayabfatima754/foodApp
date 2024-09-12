const express = require('express');
const User = require('./../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// registration
const register = async (req, res) => {
    const { username, email, password, address, phone,answer } = req.body;

    try {

        if (!username || !email || !password || !address || !phone ||!answer) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // hash password creation
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
             username, 
             phone, 
             email, 
             address, 
             password:hashedPassword,
             answer})
        return res.status(201).json(newUser); // Ensure response is sent only once

    } catch (err) {
        console.error('Registration error:', err);

        // Ensure a response is sent only once, even in case of an error
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

//login api
const login = async(req,res)=>{
    const {email,password} =req.body
    try{
    // Find user by username
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    
     // Generate JWT token
     const Token = jwt.sign(
        {
            user: {
                id: user._id,
                username: user.username,
            },
        }, // user i and username + JWT secret key k madad se token generate kia
        process.env.JWT_SECRET, // Ensure you have this environment variable set
        { expiresIn: '30m' } // Token expiration time
    );
    return res.status(200).json({ message: `login sccuessful ${Token}`}); // message + token

    
}   catch(err){
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
}}

// get api
// accesss private 
const currentUser = async (req, res) => {
    try {
        // Extract the user ID from the req.user object (populated by jwtAuthMiddleware)
        const userID = req.user.id;

        console.log("Extracted User ID from Middleware:", userID); // Debugging

        // Fetch the user by ID
        const user = await User.findById(userID);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }

        // Hide the password field before sending the response
        user.password = undefined;

        // Return the user if found
        return res.status(200).json({ user });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const updateUserData = async (req, res) => {
    const { username, email, address, phone } = req.body;
    
    try {
        
        const userID = req.user.id; // taking id from token
        const user = await User.findById(userID);


        
        if (username) user.username = username;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        
        await user.save();  // Correctly calling the save method
        
        return res.status(200).json({ message: 'User data updated successfully', user });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
// reset password
const updatePassword = async (req, res) => {
    const { email, newpassword, answer } = req.body;

    try {
        // Check if all required fields are present
        if (!email || !newpassword || !answer) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the user by email and answer
        const user = await User.findOne({ email, answer });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the new password is the same as the current password
        const isSamePassword = await bcrypt.compare(newpassword, user.password); // purane or newpassword ko compare krega
        if (isSamePassword) {
            return res.status(400).json({ message: 'Please enter a new password' });
        }

        // Hash the new password and update the user's password
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedPassword;
        await user.save();  // Corrected this line to call the save method

        // Return a success message
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteProfile = async(req, res) => {
    const userID = req.params.id; // postman k params ma se id lenge ya phr slash kr k id likhenge

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Fetch the contact by ID and ensure it belongs to the authenticated user
        const user = await User.findOne({ _id: userID});

        // Check if contact was found
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        // Delete the contact
        await User.findByIdAndDelete(userID);

        return res.status(200).json({ message: 'user deleted successfully' });
    } catch (err) {
        console.error('Error deleting contact:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Please provide a valid order id",
            });
        }

        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
        });
    }
};






module.exports = { register,login ,currentUser,updateUserData,updatePassword,deleteProfile,orderStatusController};
