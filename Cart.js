import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateCart }) => {
  const handleQuantityChange = (product, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cart.map(item =>
      item._id === product._id ? { ...item, qty: newQty } : item
    );
    updateCart(updatedCart);
  };

  const handleRemove = (product) => {
    const updatedCart = cart.filter(item => item._id !== product._id);
    updateCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="app-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/catalog" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => handleQuantityChange(item, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => handleQuantityChange(item, item.qty + 1)}>+</button>
                <button onClick={() => handleRemove(item)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>
            <Link to="/checkout" className="btn-primary">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 