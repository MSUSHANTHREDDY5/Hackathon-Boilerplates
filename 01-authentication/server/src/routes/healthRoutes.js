const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Server health check endpoint
 * @access  Public
 */
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is healthy and running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
