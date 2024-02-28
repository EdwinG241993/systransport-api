const mongoose = require("mongoose");

// Define the schema for the Employee model
const employeeSchema = new mongoose.Schema({
    id_number: {
        type: String,
        require: true,
        maxlengthlength: 15,
        minlength: 3
    },
    first_name: {
        type: String,
        require: true,
        maxlengthlength: 100,
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
        maxlength: 50,
        minlength: 7
    },
    position: {
        type: String,
        require: true,
        maxlength: 50,
        minlength: 3
    },
    date_entry: {
        type: Date,
        require: true,
    },
    salary: {
        type: Number,
        require: true,
    },
    affiliatedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'AffiliatedCompany' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Export the mongoose model for the Employee
module.exports = mongoose.model("Employee", employeeSchema);

