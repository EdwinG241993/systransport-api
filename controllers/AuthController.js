const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const InvalidatedToken = require('../models/InvalidatedToken');

// Function to implement timeout for promises
const timeout = async (promise, ms) => {
    const timer = new Promise((reject) => setTimeout(reject, ms, new Error("Timeout")));
    return Promise.race([promise, timer]);
};

// Validation
const { registerValidation, loginValidation } = require("../services/validation-data");

// Route for user registration
router.post("/register", async (req, res) => {
    // Validate the user input
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the email is already registered
    const isEmailExist = await User.findOne({ email: req.body.email });

    if (isEmailExist) {
        return res.status(400).json({ error: "Este email ya fue registrado" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Create a new User instance
    const user = new User({
        email: req.body.email,
        password,
        rol: req.body.rol,
        state: req.body.state,
        photo: req.body.photo
    });

    try {
        // Save the user with a timeout
        const savedUser = await timeout(user.save(), 10000);
        res.json({
            message: "Usuario creado",
            data: {
                userId: savedUser._id
            }
        });
    } catch (error) {
        if (error.name === "TimeoutError") {
            res.status(504).json({ error: "Se exedio el tiempo de espera para esta solicitud" });
        }
        res.status(400).json({ error });
    }
});

// Login route
router.post("/login", async (req, res) => {
    // Validate user input for login
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ error: "El email no esta registrado" });

    // Check if the password is valid
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });

    // Create a token for the user
    const token = jwt.sign(
        // Payload data
        {
            email: user.email,
            id: user._id
        },
        process.env.TOKEN_SECRET
    );

    // Send the token in the response headers
    res.header("auth-token", token).json({
        error: null,
        data: {
            message: "Ha iniciado sesión correctamente",
            id: user._id,
            token: token
        }
    });
});

// Logout route
router.post("/logout", async (req, res) => {
    const token = req.header("auth-token");

    // Check if the token is in the invalidatedTokens list
    const invalidatedToken = await InvalidatedToken.findOne({ token });

    if (invalidatedToken) {
        return res.status(401).json({ error: "Token inválido. Ya ha cerrado sesión." });
    }

    // Verify the token is valid
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        return res.status(401).json({ error: "Token inválido." });
    }

    // Invalidate the token by adding it to the database
    const newInvalidatedToken = new InvalidatedToken({ token });
    await newInvalidatedToken.save();

    // Clear the auth-token header
    res.clearCookie("auth-token");

    // Send a response to the client indicating successful logout
    res.json({
        error: null,
        data: {
            message: "Ha cerrado sesión correctamente"
        }
    });
});

module.exports = router;
