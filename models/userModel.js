const { request } = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: 'client',
    enum: ['client', 'admin', 'vendor', 'driver'], // Ensure this matches input
  },
  profile: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg',
  },
  answer:{
    type:String,
    request:[true,'Answer is required'] //for password change
  },

});

const User = mongoose.model('User', userSchema);
module.exports = User;
