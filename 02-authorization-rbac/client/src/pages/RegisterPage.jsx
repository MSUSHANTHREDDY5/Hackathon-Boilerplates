import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    if (!name || !email || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setSubmitting(true);
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSeedTestUsers = async () => {
    setError('');
    setInfoMsg('');
    try {
      setSubmitting(true);
      const res = await api.post('/auth/seed-test-users');
      setInfoMsg('Dev test accounts seeded! You can log in as admin@example.com, moderator@example.com, or reader@example.com (Password: password123)');
    } catch (err) {
      setError(err.message || 'Failed to seed test users.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        <h2>Create Account</h2>
        <p className="auth-subtitle">
          Public registration automatically assigns default role <code>"user"</code> and empty permissions <code>[]</code>.
        </p>

        {error && <div className="alert alert-error">{error}</div>}
        {infoMsg && <div className="alert alert-success">{infoMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Smith"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••• (Min 6 characters)"
              required
            />
          </div>

          <button type="submit" className="btn btn-submit" disabled={submitting}>
            {submitting ? 'Registering Account...' : 'Register Account'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
            Need accounts with specific roles or permissions for testing?
          </p>
          <button onClick={handleSeedTestUsers} className="btn btn-secondary" style={{ width: '100%', fontSize: '0.85rem' }} disabled={submitting}>
            Seed Development Test Accounts (Admin / Moderator / Reader)
          </button>
        </div>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
