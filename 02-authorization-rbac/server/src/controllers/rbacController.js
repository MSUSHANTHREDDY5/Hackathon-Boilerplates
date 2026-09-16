const { sendSuccess } = require('../utils/response');

/**
 * Public endpoint handler - accessible by anyone
 */
const getPublic = (req, res) => {
  return sendSuccess(res, 200, 'Public authorization endpoint accessible by anyone', {
    accessLevel: 'public',
    timestamp: new Date().toISOString()
  });
};

/**
 * Authenticated endpoint handler - accessible by any logged-in user
 */
const getAuthenticated = (req, res) => {
  return sendSuccess(res, 200, 'Authenticated endpoint accessible by any logged-in user', {
    accessLevel: 'authenticated',
    user: req.user.toSafeObject()
  });
};

/**
 * Role-protected endpoint handler - accessible only by authorized roles
 */
const getRoleProtected = (req, res) => {
  return sendSuccess(res, 200, 'Role-protected endpoint accessible only by authorized roles', {
    accessLevel: 'role-protected',
    requiredRole: 'admin (or moderator)',
    user: req.user.toSafeObject()
  });
};

/**
 * Permission-protected endpoint handler - accessible only by users with required permissions
 */
const getPermissionProtected = (req, res) => {
  return sendSuccess(res, 200, 'Permission-protected endpoint accessible only by users with required permissions', {
    accessLevel: 'permission-protected',
    requiredPermissions: ['users.read'],
    user: req.user.toSafeObject()
  });
};

module.exports = {
  getPublic,
  getAuthenticated,
  getRoleProtected,
  getPermissionProtected
};
