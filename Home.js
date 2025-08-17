import React, { useEffect, useState } from 'react';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(`${product.name} added to cart!`);
    setTimeout(() => setCartMessage(''), 1500);
  };

  return (
    <div className="app-container">
      <h1>Home (Product Catalog)</h1>
      {cartMessage && <div style={{ color: '#388e3c', marginBottom: 16, fontWeight: 600 }}>{cartMessage}</div>}
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginTop: '32px',
      }}>
        {products.map(product => (
          <div key={product._id} style={{
            background: '#fafafa',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            padding: 18,
            textAlign: 'center',
          }}>
            <div style={{ height: '180px', marginBottom: '12px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
            </div>
            <h2 style={{ fontSize: '1.2rem', color: '#1976d2', margin: '12px 0 8px' }}>{product.name}</h2>
            <p style={{ color: '#444', minHeight: 40 }}>{product.description}</p>
            <div style={{ fontWeight: 600, color: '#388e3c', marginTop: 8 }}>${product.price.toFixed(2)}</div>
            <button onClick={() => handleAddToCart(product)} style={{ marginTop: 12, padding: '8px 18px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {!loading && products.length === 0 && !error && <p>No products found.</p>}
    </div>
  );
};

export default Home; 