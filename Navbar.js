import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cart, user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const onLogout = () => {
    handleLogout();
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="webstore-name">TechHaveli</Link>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          🛒
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        {menuOpen && (
          <div className="menu-dropdown">
            <Link to="/catalog" onClick={() => setMenuOpen(false)}>Services</Link>
            {user ? (
              <button onClick={onLogout} className="menu-logout-btn">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 