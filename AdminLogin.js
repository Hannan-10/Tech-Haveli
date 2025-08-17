import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // For demo: hardcoded admin credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Admin Login</h1>
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
          {loading ? 'Logging in...' : 'Login as Admin'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin; 