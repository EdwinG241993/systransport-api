const mongoose = require("mongoose");

// Define the schema for the AffiliatedCompany model
const affiliatedCompanySchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
        maxlength: 70,
        minlength: 3
    },
    name: {
        type: String,
        require: true,
        maxlength: 100,
        minlength: 3
    },
    nit: {
        type: String,
        require: true,
        maxlength: 15,
        minlength: 10
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
    affiliation_date: {
        type: Date,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    conductors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conductor' }],
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
}, { timestamps: true });


// Export the mongoose model for the Affiliated Company
module.exports = mongoose.model("AffiliatedCompany", affiliatedCompanySchema);
