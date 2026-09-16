const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  getProtected
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);
router.get('/protected', protect, getProtected);

module.exports = router;
