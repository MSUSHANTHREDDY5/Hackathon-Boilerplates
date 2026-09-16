const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env if present
dotenv.config({ path: path.join(__dirname, '../.env') });

const { getJwtSecret } = require('./utils/jwt');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Fail Fast: Validate required JWT_SECRET configuration
  try {
    getJwtSecret();
  } catch (err) {
    console.error(`[Config Error] ❌ ${err.message}`);
    process.exit(1);
  }

  // Connect to MongoDB
  await connectDB();

  // Start HTTP Server
  const server = app.listen(PORT, () => {
    console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections gracefully
  process.on('unhandledRejection', (err) => {
    console.error(`[Server] Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();
