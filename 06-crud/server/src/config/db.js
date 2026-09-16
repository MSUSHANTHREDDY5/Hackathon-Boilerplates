const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using Mongoose.
 * Fails fast if MONGODB_URI environment variable is missing or empty.
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.trim() === '') {
    throw new Error('FATAL CONFIGURATION ERROR: MONGODB_URI environment variable is missing or empty.');
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
