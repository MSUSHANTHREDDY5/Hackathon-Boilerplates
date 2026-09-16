const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const rbacRoutes = require('./routes/rbacRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. CORS configuration
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5174';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// 3. Request parsing (limited to 1mb) & Cookie parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// 4. API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/authorization', rbacRoutes);

// 5. 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server`
  });
});

// 6. Centralized Error Handler
app.use(errorHandler);

module.exports = app;
