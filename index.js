const express = require("express");
const app = express();
const authRoutes = require("./controllers/AuthController");// route middlewares
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

// Connect to db
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connect to MongoDB');
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

connectToMongo();

app.use("/api/user", authRoutes);
app.listen(3000, () => console.log("Server is running..."));
