import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, updateCart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
  });
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const orderDetails = {
      customerInfo,
      products: cart.map(({ _id, name, price, qty }) => ({ productId: _id, name, price, qty })),
      total,
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred.');
      }

      alert('Order placed successfully!');
      updateCart([]); // Clear the cart
      navigate('/orders'); // Redirect to orders page
    } catch (err) {
      console.error('Order placement error:', err);
      alert(err.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={customerInfo.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={customerInfo.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Shipping Address</label>
              <textarea name="address" value={customerInfo.address} onChange={handleInputChange} required></textarea>
            </div>
            <button type="submit" className="btn-primary">Place Order</button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item._id} className="summary-item">
                <span>{item.name} (x{item.qty})</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <hr />
          <div className="summary-total">
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 