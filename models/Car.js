const mongoose = require("mongoose");

// Define the schema for the Car model
const carSchema = new mongoose.Schema({
    internal_number: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 1
    },
    plate: {
        type: String,
        require: true,
        maxlength: 10,
        minlength: 5
    },
    capacity: {
        type: String,
        require: Number
    },
    brand: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 3
    },
    model: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 3
    },
    status: {
        type: Number,
        require: true
    },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    affiliatedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'AffiliatedCompany' },
    conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'Conductor' }
}, { timestamps: true });

// Export the mongoose model for the Car
module.exports = mongoose.model("Car", carSchema);

