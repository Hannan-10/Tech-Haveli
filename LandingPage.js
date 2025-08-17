import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Featured products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 6))) // Show top 6
      .catch(() => setProducts([]));
  }, []);

  // Mock reviews
  const reviews = [
    {
      name: 'Alice',
      text: 'Amazing store! Fast delivery and great products.',
    },
    {
      name: 'Bob',
      text: 'Customer service was super helpful. Highly recommend!',
    },
    {
      name: 'Priya',
      text: 'Love the variety and quality. Will shop again!',
    },
    {
      name: 'David',
      text: 'The products exceeded my expectations. Top-notch quality!',
    },
    {
      name: 'Sophia',
      text: 'A fantastic selection of gadgets. My new favorite online store.',
    },
    {
      name: 'Mohammed',
      text: 'Excellent customer support and very fast shipping. 5 stars!',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: '#1976d2', color: '#fff', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <span style={{ fontSize: '2.5rem', color: '#fff' }}>💻</span>
          <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '3.5rem' }}>Tech</span>
          <span style={{ fontFamily: '"Noto Nastaliq Urdu", serif', fontSize: '3.5rem', color: '#fff' }}>حویلی</span>
          <span style={{ fontSize: '2.5rem', color: '#fff' }}>🛒</span>
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: 28 }}>Your one-stop shop for the latest gadgets and accessories.</p>
        <Link to="/catalog" style={{ background: '#fff', color: '#1976d2', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 18, textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Shop Now</Link>
      </section>

      {/* Featured Products */}
      <section style={{ maxWidth: 1100, margin: '48px auto', padding: '0 16px' }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 32 }}>Featured Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {products.map(product => (
            <div key={product._id} style={{ background: '#fafafa', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 18, textAlign: 'center' }}>
              <div style={{ height: '180px', marginBottom: '12px' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#1976d2', margin: '12px 0 8px' }}>{product.name}</h3>
              <p style={{ color: '#444', minHeight: 40 }}>{product.description}</p>
              <div style={{ fontWeight: 600, color: '#388e3c', marginTop: 8 }}>${product.price?.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section style={{ background: '#f7f7f7', padding: '48px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 32 }}>What Our Customers Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {reviews.map((review, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24 }}>
                <p style={{ fontStyle: 'italic', marginBottom: 12 }}>&ldquo;{review.text}&rdquo;</p>
                <div style={{ fontWeight: 600, color: '#1976d2' }}>- {review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section style={{ maxWidth: 900, margin: '48px auto', padding: '0 16px' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 12 }}>About Us</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <img src="/undertaker.jpg" alt="About our store" style={{ width: '100%', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} />
          </div>
          <div style={{ flex: 2, minWidth: 220 }}>
            <p style={{ fontSize: '1.1rem', marginBottom: 18 }}>
              At <b>TechHaveli</b>, our mission is to bring you the best products at unbeatable prices, with a seamless and enjoyable shopping experience. We believe in quality, trust, and customer satisfaction above all else.
            </p>
            <p style={{ fontSize: '1.1rem' }}>
              Founded in 2024, TechHaveli started as a small team passionate about technology and e-commerce. Today, we serve thousands of happy customers, offering a curated selection of gadgets, accessories, and more. Thank you for being part of our journey!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 