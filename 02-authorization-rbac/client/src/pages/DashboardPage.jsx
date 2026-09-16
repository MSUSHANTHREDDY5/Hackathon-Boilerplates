import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import RoleGuard from '../components/RoleGuard';
import PermissionGuard from '../components/PermissionGuard';
import {
  getPublicEndpoint,
  getAuthenticatedEndpoint,
  getRoleProtectedEndpoint,
  getPermissionProtectedEndpoint
} from '../services/rbacService';

const DashboardPage = () => {
  const { user, role, permissions, logout } = useAuth();
  const [apiResult, setApiResult] = useState(null);
  const [loadingEndpoint, setLoadingEndpoint] = useState('');
  const [errorEndpoint, setErrorEndpoint] = useState('');

  const callEndpoint = async (endpointName, apiFn) => {
    setLoadingEndpoint(endpointName);
    setErrorEndpoint('');
    setApiResult(null);
    try {
      const res = await apiFn();
      setApiResult({ endpoint: endpointName, status: 200, data: res });
    } catch (err) {
      setErrorEndpoint(`[Status ${err.status || 403}] ${err.message}`);
    } finally {
      setLoadingEndpoint('');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Authorization Dashboard</h1>
        <span className="badge badge-info">Role-Based & Permission-Based Control</span>
      </div>

      {/* User Information */}
      <div className="dashboard-card">
        <h3>Authenticated Identity</h3>
        <table className="user-details-table">
          <tbody>
            <tr>
              <th>ID:</th>
              <td>{user?._id}</td>
            </tr>
            <tr>
              <th>Name:</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{user?.email}</td>
            </tr>
            <tr>
              <th>Assigned Role:</th>
              <td>
                <span className="badge badge-role">{role}</span>
              </td>
            </tr>
            <tr>
              <th>Permissions:</th>
              <td>
                {permissions && permissions.length > 0 ? (
                  permissions.map((p) => (
                    <span key={p} className="badge badge-perm" style={{ marginRight: '0.4rem' }}>
                      {p}
                    </span>
                  ))
                ) : (
                  <span style={{ color: '#888' }}>None assigned</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Conditional UI Rendering Demonstration */}
      <div className="dashboard-card">
        <h3>Client-Side Guard Components Demonstration</h3>
        <p style={{ marginBottom: '1rem' }}>The blocks below test client-side RoleGuard and PermissionGuard components.</p>

        {/* Role Guard Demonstration */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4>Role Guard Block (Requires role: "admin" or "moderator")</h4>
          <RoleGuard allowedRoles={['admin', 'moderator']}>
            <div className="alert alert-success">
              Access Granted: Your role ({role}) is permitted to view this RoleGuard block.
            </div>
          </RoleGuard>
        </div>

        {/* Permission Guard Demonstration */}
        <div>
          <h4>Permission Guard Block (Requires permission: "users.read")</h4>
          <PermissionGuard requiredPermissions={['users.read']}>
            <div className="alert alert-success">
              Access Granted: You possess the required permission ("users.read") to view this PermissionGuard block.
            </div>
          </PermissionGuard>
        </div>
      </div>

      {/* Interactive API Endpoint Testing */}
      <div className="dashboard-card">
        <h3>Backend Endpoint Authorization Testing</h3>
        <p style={{ marginBottom: '1rem' }}>Test real-time HTTP requests to backend authorization middleware endpoints:</p>

        <div className="button-grid">
          <button
            onClick={() => callEndpoint('GET /api/authorization/public', getPublicEndpoint)}
            className="btn btn-secondary"
            disabled={!!loadingEndpoint}
          >
            Test Public Route
          </button>

          <button
            onClick={() => callEndpoint('GET /api/authorization/authenticated', getAuthenticatedEndpoint)}
            className="btn btn-secondary"
            disabled={!!loadingEndpoint}
          >
            Test Authenticated Route
          </button>

          <button
            onClick={() => callEndpoint('GET /api/authorization/role-protected', getRoleProtectedEndpoint)}
            className="btn btn-secondary"
            disabled={!!loadingEndpoint}
          >
            Test Role Route ('admin'/'moderator')
          </button>

          <button
            onClick={() => callEndpoint('GET /api/authorization/permission-protected', getPermissionProtectedEndpoint)}
            className="btn btn-secondary"
            disabled={!!loadingEndpoint}
          >
            Test Permission Route ('users.read')
          </button>
        </div>

        {loadingEndpoint && <p style={{ marginTop: '1rem' }}>Calling {loadingEndpoint}...</p>}

        {errorEndpoint && <div className="alert alert-error" style={{ marginTop: '1rem' }}>{errorEndpoint}</div>}

        {apiResult && (
          <div className="json-box" style={{ marginTop: '1rem' }}>
            <p><strong>Result from {apiResult.endpoint}:</strong></p>
            <pre>{JSON.stringify(apiResult.data, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
