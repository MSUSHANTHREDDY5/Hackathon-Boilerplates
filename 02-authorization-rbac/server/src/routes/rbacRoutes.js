const express = require('express');
const router = express.Router();
const {
  getPublic,
  getAuthenticated,
  getRoleProtected,
  getPermissionProtected
} = require('../controllers/rbacController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles, authorizePermissions } = require('../middleware/rbacMiddleware');

// Public route - accessible by anyone
router.get('/public', getPublic);

// Authenticated route - requires valid JWT
router.get('/authenticated', protect, getAuthenticated);

// Role-protected route - requires 'admin' or 'moderator' role
router.get('/role-protected', protect, authorizeRoles('admin', 'moderator'), getRoleProtected);

// Permission-protected route - requires 'users.read' permission
router.get('/permission-protected', protect, authorizePermissions('users.read'), getPermissionProtected);

module.exports = router;
