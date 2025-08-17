import React from 'react';

const About = () => {
  return (
    <div className="app-container" style={{ maxWidth: 800 }}>
      <h1>About Us</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <img
            src="/undertaker.jpg"
            alt="About our store"
            style={{ width: '100%', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          />
        </div>
        <div style={{ flex: 2, minWidth: 260 }}>
          <h2 style={{ color: '#1976d2', marginBottom: 12 }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: 18 }}>
            At <b>TechHaveli</b>, our mission is to bring you the best products at unbeatable prices, with a seamless and enjoyable shopping experience. We believe in quality, trust, and customer satisfaction above all else.
          </p>
          <h2 style={{ color: '#1976d2', marginBottom: 12 }}>Our Story</h2>
          <p style={{ fontSize: '1.1rem' }}>
            Founded in 2024, TechHaveli started as a small team passionate about technology and e-commerce. Today, we serve thousands of happy customers, offering a curated selection of gadgets, accessories, and more. Thank you for being part of our journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 