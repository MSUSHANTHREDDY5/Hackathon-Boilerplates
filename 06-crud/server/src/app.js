const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const itemRoutes = require('./routes/itemRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. CORS configuration using CLIENT_URL environment variable
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5178';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// 3. Body parser with 1mb limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. API Routes
app.use('/api/health', healthRoutes);
app.use('/api/items', itemRoutes);

// 5. Unknown route 404 handler
app.use(notFound);

// 6. Centralized Error Handler
app.use(errorHandler);

module.exports = app;
