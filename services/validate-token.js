const jwt = require("jsonwebtoken");

// Middleware to validate authentication token
const verifyToken = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.header("auth-token");

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ error: "Acceso Denegado" });
    }

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        // Attach the verified user information to the request object
        req.user = verified;

        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        // Handle invalid token error
        res.status(400).json({ error: "Token Invalido" });
    }
};

// Export the middleware for use in other parts of the application
module.exports = verifyToken;
