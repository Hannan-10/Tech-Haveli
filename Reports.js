import React, { useEffect, useState } from 'react';

const Reports = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/contact');
        if (!res.ok) throw new Error('Failed to load messages');
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchMessages();
  }, []);

  return (
    <div className="app-container">
      <h1>User Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td style={{ minWidth: '300px' }}>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports; 