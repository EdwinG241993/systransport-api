const InvalidatedToken = require('../models/InvalidatedToken');

// Function to delete invalidated tokens older than 30 days
async function deleteOldInvalidatedTokens() {
    const fifteenDaysAgo = new Date();

    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    await InvalidatedToken.deleteMany({ createdAt: { $lt: fifteenDaysAgo } });
}

// Schedule the function to run once a day
setInterval(deleteOldInvalidatedTokens, 24 * 60 * 60 * 1000);

module.exports = deleteOldInvalidatedTokens;
