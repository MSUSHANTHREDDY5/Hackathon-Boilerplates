const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');
const { sendTokenCookie, clearTokenCookie } = require('../utils/jwt');

/**
 * Public registration endpoint
 * Strictly accepts name, email, password ONLY. Ignores any role/permissions from req.body.
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser({ name, email, password });
    return sendTokenCookie(res, 201, 'Registration successful', user);
  } catch (error) {
    next(error);
  }
};

/**
 * Login endpoint
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser({ email, password });
    return sendTokenCookie(res, 200, 'Login successful', user);
  } catch (error) {
    next(error);
  }
};

/**
 * Logout endpoint
 */
const logout = async (req, res) => {
  clearTokenCookie(res);
  return sendSuccess(res, 200, 'Logout successful');
};

/**
 * Get current authenticated profile
 */
const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user._id);
    return sendSuccess(res, 200, 'Authenticated user profile retrieved', {
      user: user.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Isolated Development-only endpoint to seed test accounts for interactive UI testing.
 * Strictly disabled in production.
 */
const seedTestUsers = async (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return sendError(res, 403, 'Seed endpoint is strictly disabled in production');
  }

  try {
    const seedModule = require('../utils/seed');
    const result = await seedModule.seedDatabase();
    return sendSuccess(res, 200, 'Test users seeded successfully for development', result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  seedTestUsers
};
