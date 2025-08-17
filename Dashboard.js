import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="app-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="admin-dashboard-nav">
        <Link to="/admin/products" className="admin-nav-link">
          Manage Products
        </Link>
        <Link to="/admin/orders" className="admin-nav-link">
          Manage Orders
        </Link>
        <Link to="/admin/reports" className="admin-nav-link">
          View Messages
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 