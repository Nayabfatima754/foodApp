// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const testRouter = require('./routes/test'); // Correct path to routes file
const  user = require('./routes/authRoute')
const connectdb = require('./db'); 
const  restaurant = require('./routes/restaurantRoute');
const foodCatogeries = require('./routes/foodCatogeryRoute')
const foodItems = require('./routes/foodRoute')
 connectdb();


 

// dotenv file configuration
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/testUser', testRouter); // Routes are mounted at /testUser
app.use('/user', user); // Routes are mounted at /testUser
app.use('/restaurant', restaurant);  
app.use('/foodCategories', foodCatogeries); 
app.use('/foodItems', foodItems); 




// Port declaration from env file
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Food app running on port ${port}`);
});

// start script for nodmon is npm run dev 
