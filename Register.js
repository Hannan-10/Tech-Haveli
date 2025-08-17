import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setSuccess('Registration successful! You can now log in.');
        setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: 6 }}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
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
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: 6 }}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
        <button type="submit" style={{ width: '100%', padding: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <span>Already have an account? </span>
        <Link to="/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>Login</Link>
      </div>
    </div>
  );
};

export default Register; 