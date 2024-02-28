const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

// Routes for user registration and login (without token validation)
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;