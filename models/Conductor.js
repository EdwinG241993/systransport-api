const mongoose = require("mongoose");

// Define the schema for the Conductor model
const conductorSchema = new mongoose.Schema({
    id_number: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 5
    },
    first_name: {
        type: String,
        require: true,
        maxlength: 100,
        minlength: 3
    },
    last_name: {
        type: String,
        require: true,
        maxlength: 100,
        minlength: 3
    },
    address: {
        type: String,
        require: true,
        maxlength: 255,
        minlength: 10
    },
    phone: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 7
    },
    license_number: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 5
    },
    license_expiration_date: {
        type: Date,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
    turns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turn' }],
    affiliatedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'AffiliatedCompany' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Export the mongoose model for the Conductor
module.exports = mongoose.model("Conductor", conductorSchema);

