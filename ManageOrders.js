import React, { useEffect, useState } from 'react';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders');
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="app-container">
      <h1>Manage Orders (Admin)</h1>
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Address</th>
              <th>Total</th>
              <th>Date</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customerInfo.name}</td>
                <td>{order.customerInfo.email}</td>
                <td>{order.customerInfo.address}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <ul>
                    {order.products.map(p => (
                      <li key={p.productId}>{p.name} (x{p.qty})</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOrders; 