const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URL_LOCAL || process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,      // Ensure the new URL parser is used
  useUnifiedTopology: true    // Enable the new Server Discover and Monitoring engine
})
  .then(() => console.log("Connected to MongoDB server"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if unable to connect to the DB
  });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error("MongoDB runtime error:", err);
});

db.on('disconnected', () => {
  console.log("Disconnected from MongoDB server");
});

module.exports = db;
