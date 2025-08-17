import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      {/* About Section */}
      <div className="footer-section">
        <h3>About TechHaveli</h3>
        <p>
          TechHaveli brings the best tech experiences to your doorstep with a 
          passion for quality and customer satisfaction.
        </p>
      </div>

      {/* Quick Links Section */}
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/catalog">Services</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Admin Section */}
      <div className="footer-section">
        <h3>Admin Side</h3>
        <ul>
          <li>
            <Link to="/admin/login">Admin's Dashboard</Link>
            <small>(only for authorized personnel)</small>
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: contact@techhaveli.com</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} TechHaveli | All Rights Reserved</p>
    </div>
  </footer>
);

export default Footer; 