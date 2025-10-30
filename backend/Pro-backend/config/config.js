require("dotenv").config();

// CHANGE: Added a check to ensure JWT_SECRET is loaded.
// This prevents "Invalid Token" errors by crashing the server if the secret is missing.
if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in .env file");
  process.exit(1); // Exits the application with an error code
}

const config = Object.freeze({
  PORT: process.env.PORT || 3000,
  databaseURI: process.env.MONGODB_URL || "mongodb://localhost:2017/proClustor",
  nodeEnv: process.env.NODE_ENV || "development",
  accessTokenSecret: process.env.JWT_SECRET, // This is now guaranteed to exist
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  
  // FIX: Corrected typo from 'RAZORPAY_KEY_SECRETS' (plural)
  razorpaySecretKey: process.env.RAZORPAY_KEY_SECRET ,
  razorpySecret: process.env.RAZORPAY_WEBHOOK_SECRET
});

module.exports = config;