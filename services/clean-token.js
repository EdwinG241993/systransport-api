const InvalidatedToken = require('../models/InvalidatedToken');

// Function to delete invalidated tokens older than 30 days
async function deleteOldInvalidatedTokens() {
    const halfDayAgo = new Date();

    halfDayAgo.setHours(halfDayAgo.getHours() - 12);

    await InvalidatedToken.deleteMany({ createdAt: { $lt: halfDayAgo } });
}

// Schedule the function to run once a day
setInterval(deleteOldInvalidatedTokens, 6 * 60 * 60 * 1000);

module.exports = deleteOldInvalidatedTokens;
