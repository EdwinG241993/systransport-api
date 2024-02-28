const mongoose = require('mongoose');
const dotenv = require("dotenv");

// Load variables from the .env
dotenv.config();

// Function connect to the MongoDB 
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the application
    }
};

// Connect DB on application startup
connectToMongo();