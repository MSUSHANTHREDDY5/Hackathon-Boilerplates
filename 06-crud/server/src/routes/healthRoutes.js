const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * @desc    Health check endpoint returning API & Database status
 * @route   GET /api/health
 * @access  Public
 */
router.get('/', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  return res.status(200).json({
    success: true,
    message: 'CRUD API is healthy',
    database: isConnected ? 'connected' : 'disconnected'
  });
});

module.exports = router;
