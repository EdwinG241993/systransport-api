const mongoose = require("mongoose");

// Define the schema for the Ticket model
const ticketSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true
    },
    start_time: {
        type: Date,
        require: true
    },
    end_time: {
        type: Date,
        require: true
    },
    rate: {
        type: Number,
        require: true
    },
    seat_number: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 1
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
}, { timestamps: true });

// Export the mongoose model for the Ticket
module.exports = mongoose.model("Ticket", ticketSchema);

