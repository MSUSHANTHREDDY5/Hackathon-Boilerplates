import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * PermissionGuard Component
 * Client-side component wrapper that conditionally renders UI elements based on required permissions.
 */
const PermissionGuard = ({ requiredPermissions = [], children, fallback = null }) => {
  const { permissions, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback || <div className="alert alert-warning">Authentication required to view this section.</div>;
  }

  const normalizedRequired = (Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions]).map(
    (p) => p.toLowerCase().trim()
  );
  const userPerms = (permissions || []).map((p) => p.toLowerCase().trim());

  const hasAllPermissions = normalizedRequired.every((p) => userPerms.includes(p));

  if (!hasAllPermissions) {
    return (
      fallback || (
        <div className="alert alert-error">
          Access Restricted: Missing required permissions. Required: [{normalizedRequired.join(', ')}]
        </div>
      )
    );
  }

  return children;
};

export default PermissionGuard;
