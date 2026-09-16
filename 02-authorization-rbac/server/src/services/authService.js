const User = require('../models/User');

/**
 * Public registration service
 * STRICT SECURITY REQUIREMENT: Never trusts client-supplied role or permissions.
 * All public registrations strictly receive default role "user" and empty permissions [].
 */
const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    const error = new Error('Please provide name, email, and password');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (password.length < 6) {
    const error = new Error('Password must be at least 6 characters long');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('User already exists with this email address');
    error.statusCode = 400;
    throw error;
  }

  // Force safe defaults: role="user", permissions=[]
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'user',
    permissions: []
  });

  return user;
};

/**
 * Trusted internal service for creating users with custom roles & permissions.
 * Used ONLY by seed scripts or trusted administrative initialization logic.
 */
const createUserWithPrivileges = async ({ name, email, password, role = 'user', permissions = [] }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    existingUser.name = name.trim();
    existingUser.password = password;
    existingUser.role = role.toLowerCase().trim();
    existingUser.permissions = Array.isArray(permissions) ? permissions : [];
    await existingUser.save();
    return existingUser;
  }

  return await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: role.toLowerCase().trim(),
    permissions: Array.isArray(permissions) ? permissions : []
  });
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

  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

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
  createUserWithPrivileges,
  loginUser,
  getUserById
};
