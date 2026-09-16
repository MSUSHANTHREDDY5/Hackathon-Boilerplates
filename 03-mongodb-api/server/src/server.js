const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5003;

const startServer = async () => {
  try {
    // 1. Validate MONGODB_URI & Connect to Database before starting Express listener
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.trim() === '') {
      console.error('[Config Error] ❌ FATAL: MONGODB_URI environment variable is missing or empty.');
      process.exit(1);
    }

    await connectDB();

    // 2. Start HTTP Server only after database connection succeeds
    const server = app.listen(PORT, () => {
      console.log(`[Server] MongoDB API server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    process.on('unhandledRejection', (err) => {
      console.error(`[Server] Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error(`[Server Startup Error] ❌ ${err.message}`);
    process.exit(1);
  }
};

startServer();
