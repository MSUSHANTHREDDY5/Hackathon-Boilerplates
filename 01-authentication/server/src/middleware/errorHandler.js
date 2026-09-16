const { sendError } = require('../utils/response');

/**
 * Centralized Express Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    statusCode = 400;
    message = `Duplicate value entered for ${field}. Please use another value.`;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  // Handle Mongoose invalid ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found. Invalid ${err.path}`;
  }

  // Log error details in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error] ${statusCode} - ${message}`);
    if (err.stack) console.error(err.stack);
  }

  return sendError(res, statusCode, message);
};

module.exports = errorHandler;
