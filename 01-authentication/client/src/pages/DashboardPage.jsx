import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getProtectedData } from '../services/authService';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);
  const [errorTest, setErrorTest] = useState('');

  const handleTestProtected = async () => {
    setLoadingTest(true);
    setErrorTest('');
    try {
      const res = await getProtectedData();
      setProtectedData(res);
    } catch (err) {
      setErrorTest(err.message || 'Failed to call protected endpoint');
    } finally {
      setLoadingTest(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <span className="badge badge-success">🔒 Protected Route</span>
      </div>

      <div className="dashboard-card">
        <h3>Authenticated User Details</h3>
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
              <th>Created At:</th>
              <td>{user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dashboard-card">
        <h3>Backend Protected Route Verification</h3>
        <p>Test calling the backend <code>GET /api/auth/protected</code> endpoint using HttpOnly authentication cookie.</p>
        
        <button onClick={handleTestProtected} className="btn btn-secondary" disabled={loadingTest}>
          {loadingTest ? 'Testing Endpoint...' : 'Test Protected API Endpoint'}
        </button>

        {errorTest && <div className="alert alert-error" style={{ marginTop: '1rem' }}>{errorTest}</div>}

        {protectedData && (
          <div className="json-box" style={{ marginTop: '1rem' }}>
            <p><strong>Response from <code>/api/auth/protected</code>:</strong></p>
            <pre>{JSON.stringify(protectedData, null, 2)}</pre>
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
