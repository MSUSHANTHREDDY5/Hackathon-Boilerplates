const authService = require('../services/authService');
const { sendSuccess } = require('../utils/response');
const { sendTokenCookie, clearTokenCookie } = require('../utils/jwt');

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
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
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
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
 * @desc    Logout user / clear authentication cookie
 * @route   POST /api/auth/logout
 * @access  Private / Public
 */
const logout = async (req, res) => {
  clearTokenCookie(res);
  return sendSuccess(res, 200, 'Logout successful');
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private
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
 * @desc    Test protected endpoint for auth verification
 * @route   GET /api/auth/protected
 * @access  Private
 */
const getProtected = async (req, res) => {
  return sendSuccess(res, 200, 'You are authenticated', {
    user: req.user.toSafeObject()
  });
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  getProtected
};
