const mongoose = require("mongoose");

// Define the schema for the Turn model
const turnSchema = new mongoose.Schema({
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
    conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'Conductor' }
}, { timestamps: true });

// Export the mongoose model for the Turn
module.exports = mongoose.model("Turn", turnSchema);

