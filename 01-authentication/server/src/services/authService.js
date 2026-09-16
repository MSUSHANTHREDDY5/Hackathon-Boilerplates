const User = require('../models/User');

/**
 * Service to handle user registration
 */
const registerUser = async ({ name, email, password }) => {
  // Input validation
  if (!name || !email || !password) {
    const error = new Error('Please provide name, email, and password');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Check password strength / minimum length
  if (password.length < 6) {
    const error = new Error('Password must be at least 6 characters long');
    error.statusCode = 400;
    throw error;
  }

  // Check existing user
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('User already exists with this email address');
    error.statusCode = 400;
    throw error;
  }

  // Create user (Password hashing is handled in Mongoose pre-save hook)
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password
  });

  return user;
};

/**
 * Service to handle user login
 */
const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error('Please provide email and password');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Find user and explicitly select password field
  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    // Generic error message to prevent account enumeration
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Verify password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  return user;
};

/**
 * Service to fetch user profile by ID
 */
const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById
};
