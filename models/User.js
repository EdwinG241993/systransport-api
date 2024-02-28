const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    rol: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    state: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
    },
    photo: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    conductors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conductor' }]
}, { timestamps: true });

// Export the mongoose model for the User
module.exports = mongoose.model("User", userSchema);
