const mongoose = require('mongoose');

const invalidatedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('InvalidatedToken', invalidatedTokenSchema);
