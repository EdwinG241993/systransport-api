const mongoose = require("mongoose");

// Define the schema for the Route model
const routeSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
        maxlength: 70,
        minlength: 5
    },
    source: {
        type: String,
        require: true,
        maxlength: 255,
        minlength: 5
    },
    destination: {
        type: String,
        require: true,
        maxlength: 255,
        minlength: 5
    },
    distance: {
        type: Number,
        require: true,
    },
    frequency: {
        type: Date,
        require: true
    },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
}, { timestamps: true });

// Export the mongoose model for the Route
module.exports = mongoose.model("Route", routeSchema);

