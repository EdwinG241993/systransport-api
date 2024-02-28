const express = require("express");
const dotenv = require("dotenv");
const connectBD = require("./services/connect-bd");
const authRoutes = require("./routes/auth");
const { verifyToken, checkInvalidatedToken } = require("./services/validate-token");

// Load variables from the .env
dotenv.config();

// Initialize application
const app = express();

// Configure the port on which the application will listen for requests
const PORT = process.env.PORT || 3000;

// Middleware to parse request bodies as JSON
app.use(express.json());

// Middleware to check invalidated tokens (applies to all routes except /api/user/register and /api/user/login)
app.use((req, res, next) => {
    const isAuthRoute = req.path.startsWith("/api/user") && (req.method === "POST" || req.method === "GET");

    if (!isAuthRoute) {
        checkInvalidatedToken(req, res, next);
    } else {
        next();
    }
});

// Middleware for token validation on /api/dashboard route
app.use("/api/dashboard", verifyToken);

// Import other routes
const dashboardRoutes = require("./controllers/dashboard");

// Routes for authentication
app.use("/api/user", authRoutes);

// Routes for dashboard with token validation
app.use("/api/dashboard", dashboardRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));