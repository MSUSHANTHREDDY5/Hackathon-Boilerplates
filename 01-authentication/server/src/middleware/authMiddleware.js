const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');

/**
 * Authentication Protection Middleware
 * Verifies JWT token from HttpOnly cookie or Authorization Bearer header
 * Attaches authenticated user object to req.user
 */
const protect = async (req, res, next) => {
  let token;

  // 1. Check HttpOnly cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Check Authorization header as fallback
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is found, return 401 Unauthorized
  if (!token) {
    return sendError(res, 401, 'Not authorized, no authentication token provided');
  }

  try {
    // Verify token using centralized single source of truth
    const decoded = verifyToken(token);

    // Fetch current user from DB (excluding password)
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return sendError(res, 401, 'The user belonging to this token no longer exists');
    }

    // Attach user to request object
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Authentication token has expired. Please log in again.');
    }
    if (error.name === 'JsonWebTokenError') {
      return sendError(res, 401, 'Invalid authentication token');
    }
    return sendError(res, 401, error.message || 'Authentication failed');
  }
};

module.exports = { protect };
