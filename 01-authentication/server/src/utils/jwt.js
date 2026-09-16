const jwt = require('jsonwebtoken');

/**
 * Validate and retrieve JWT secret from environment configuration.
 * Fails fast if JWT_SECRET is missing or empty.
 */
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim() === '') {
    throw new Error('FATAL CONFIGURATION ERROR: JWT_SECRET environment variable is missing or empty.');
  }
  return secret;
};

/**
 * Retrieve configurable cookie options based on environment variables and defaults.
 * Supports local dev, same-site production, and cross-site production deployments.
 */
const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  let secure;
  if (process.env.COOKIE_SECURE !== undefined) {
    secure = process.env.COOKIE_SECURE === 'true';
  } else {
    secure = isProduction;
  }

  let sameSite = (process.env.COOKIE_SAMESITE || 'lax').toLowerCase();
  if (!['lax', 'strict', 'none'].includes(sameSite)) {
    sameSite = 'lax';
  }

  // Web Standard requirement: SameSite=None MUST be paired with Secure=true
  if (sameSite === 'none') {
    secure = true;
  }

  return {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  };
};

/**
 * Generate a signed JWT token using centralized secret validation
 */
const generateToken = (userId) => {
  const secret = getJwtSecret();
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign({ id: userId }, secret, { expiresIn });
};

/**
 * Verify a signed JWT token using centralized secret validation
 */
const verifyToken = (token) => {
  const secret = getJwtSecret();
  return jwt.verify(token, secret);
};

/**
 * Send token in HttpOnly cookie and return safe user data response
 */
const sendTokenCookie = (res, statusCode, message, user) => {
  const token = generateToken(user._id);
  const cookieOptions = getCookieOptions();

  res.cookie('token', token, cookieOptions);

  const safeUser = user.toSafeObject ? user.toSafeObject() : {
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  return res.status(statusCode).json({
    success: true,
    message,
    data: {
      user: safeUser
    }
  });
};

/**
 * Clear authentication cookie for logout using configurable options
 */
const clearTokenCookie = (res) => {
  const cookieOptions = getCookieOptions();
  res.cookie('token', '', {
    ...cookieOptions,
    expires: new Date(0)
  });
};

module.exports = {
  getJwtSecret,
  getCookieOptions,
  generateToken,
  verifyToken,
  sendTokenCookie,
  clearTokenCookie
};
