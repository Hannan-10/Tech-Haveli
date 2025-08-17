import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to send message');
      } else {
        setSuccess('Your message has been sent!');
        setForm({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: 6 }}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: 6 }}>Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
        <button type="submit" style={{ width: '100%', padding: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact; 