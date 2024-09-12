const mongoose = require('mongoose');

// Order schema
const orderSchema = new mongoose.Schema({
  food:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',  // Reference to Food model
      required: true
  }],
  payment: {},
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model
    required: true
  },
  status: {
    type: String,
    enum: ['processing', 'preparing', 'on the way', 'delivered'],  // Enum values for status
    default: 'processing'  // Default status is 'processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Order model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
