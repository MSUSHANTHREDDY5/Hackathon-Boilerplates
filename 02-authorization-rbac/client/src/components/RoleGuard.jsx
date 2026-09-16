import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * RoleGuard Component
 * Client-side component wrapper that conditionally renders UI elements based on allowed user roles.
 */
const RoleGuard = ({ allowedRoles = [], children, fallback = null }) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback || <div className="alert alert-warning">Authentication required to view this section.</div>;
  }

  const normalizedAllowed = (Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]).map((r) =>
    r.toLowerCase().trim()
  );

  const hasAllowedRole = normalizedAllowed.includes((role || '').toLowerCase().trim());

  if (!hasAllowedRole) {
    return (
      fallback || (
        <div className="alert alert-error">
          Access Restricted: Your current role ({role}) is not authorized to view this block. Required role: [
          {normalizedAllowed.join(', ')}]
        </div>
      )
    );
  }

  return children;
};

export default RoleGuard;
