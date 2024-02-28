const mongoose = require("mongoose");

// Define the schema for the Client model
const clientSchema = new mongoose.Schema({
    id_number: {
        type: String,
        require: true,
        maxlength: 15,
        minlength: 3
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
        maxlength:100,
        minlength:3
    },
    address: {
        type: String,
        require: true,
        maxlength: 255,
        minlength:10
    },
    phone: {
        type: String,
        require: true,
        maxlength: 50,
        minlength:7
    },
    date_of_birth: {
        type: Date,
        require: true,
    },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


// Export the mongoose model for the Client
module.exports = mongoose.model("Client", clientSchema);

