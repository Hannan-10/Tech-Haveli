import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        // Use the handleLogin function from App.js
        handleLogin(data.token);
        // Redirect to home or dashboard
        navigate('/');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <span>Don't have an account? </span>
        <Link to="/register" style={{ color: '#1976d2', textDecoration: 'underline' }}>Register</Link>
      </div>
    </div>
  );
};

export default Login; 