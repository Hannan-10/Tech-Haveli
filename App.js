import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./pages/admin/AdminLogin";

// Import pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import Reports from "./pages/admin/Reports";
import About from "./pages/About";
import LandingPage from "./pages/LandingPage";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for saved cart
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);

    // Check for logged-in user
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd verify the token with the backend here
      // For this demo, we'll assume the token is valid
      // You could also store and retrieve user info from localStorage
      setUser({ token });
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const addToCart = (product) => {
    let updatedCart = [...cart];
    const existing = updatedCart.find(item => item._id === product._id);
    if (existing) {
      existing.qty += 1;
    } else {
      updatedCart.push({ ...product, qty: 1 });
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Router>
      <Navbar cart={cart} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} updateCart={updateCart} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App; 