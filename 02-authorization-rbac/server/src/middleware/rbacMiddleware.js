const { sendError } = require('../utils/response');

/**
 * Role-Based Authorization Middleware
 * Restricts endpoint access to users possessing one of the allowed roles.
 *
 * Usage example:
 * router.get('/admin', protect, authorizeRoles('admin'), controller);
 * router.get('/manage', protect, authorizeRoles('admin', 'moderator'), controller);
 *
 * @param {...string} allowedRoles - List of role names permitted to access the route
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Ensure user is authenticated first
    if (!req.user) {
      return sendError(res, 401, 'Authentication required before checking role authorization');
    }

    const userRole = (req.user.role || '').toLowerCase().trim();
    const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase().trim());

    // 2. Check if user's role is in the allowed list
    if (!normalizedAllowedRoles.includes(userRole)) {
      return sendError(
        res,
        403,
        `Forbidden: User role '${req.user.role}' is not authorized to access this resource. Required role: [${allowedRoles.join(', ')}]`
      );
    }

    next();
  };
};

/**
 * Permission-Based Authorization Middleware
 * Restricts endpoint access to users possessing required permissions.
 *
 * Evaluation Rule:
 * By default, the user must possess ALL listed required permissions (AND evaluation).
 *
 * Usage example:
 * router.get('/reports', protect, authorizePermissions('reports.read'), controller);
 * router.post('/users', protect, authorizePermissions('users.read', 'users.create'), controller);
 *
 * @param {...string} requiredPermissions - List of permission strings required to access the route
 */
const authorizePermissions = (...requiredPermissions) => {
  return (req, res, next) => {
    // 1. Ensure user is authenticated first
    if (!req.user) {
      return sendError(res, 401, 'Authentication required before checking permission authorization');
    }

    const userPermissions = Array.isArray(req.user.permissions)
      ? req.user.permissions.map((p) => p.toLowerCase().trim())
      : [];

    const normalizedRequiredPermissions = requiredPermissions.map((p) => p.toLowerCase().trim());

    // 2. Evaluate permissions: User must possess ALL required permissions
    const hasAllPermissions = normalizedRequiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    );

    if (!hasAllPermissions) {
      return sendError(
        res,
        403,
        `Forbidden: Insufficient permissions. Required permissions: [${requiredPermissions.join(', ')}]`
      );
    }

    next();
  };
};

module.exports = {
  authorizeRoles,
  authorizePermissions
};
