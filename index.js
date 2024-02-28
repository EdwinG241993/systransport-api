const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const InvalidatedToken = require('./models/InvalidatedToken');
const deleteOldInvalidatedTokens = require('./services/clean-token');

// Load variables from the .env
dotenv.config();

// Initialize application
const app = express();

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

// Configure the port on which the application will listen for requests
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Middleware to check if a token is invalidated
async function checkInvalidatedToken(req, res, next) {
    const token = req.header("auth-token");

    // Check if the token is in the invalidatedTokens list
    const invalidatedToken = await InvalidatedToken.findOne({ token });

    if (invalidatedToken) {
        return res.status(401).json({ error: "Token inválido. Ya ha cerrado sesión." });
    }

    // If the token is not invalidated, continue to the next middleware
    next();
}

// Use the middleware in your routes
app.use(checkInvalidatedToken);

// Import authentication routes
const authRoutes = require("./controllers/AuthController");
// Import dashboard routes
const dashboardRoutes = require("./controllers/dashboard");
// Import token validation middleware
const verifyToken = require("./services/validate-token");

// Middleware to parse request bodies as JSON
app.use(express.json());

// Routes for authentication
app.use("/api/user", authRoutes);

// Token validation middleware for dashboard routes
app.use("/api/dashboard", verifyToken, checkInvalidatedToken, dashboardRoutes);
