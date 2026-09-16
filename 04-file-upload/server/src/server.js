const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5004;

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.trim() === '') {
      console.error('[Config Error] ❌ FATAL: MONGODB_URI environment variable is missing or empty.');
      process.exit(1);
    }

    // Connect to MongoDB BEFORE starting Express listener
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`[Server] File upload server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
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
