import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/products';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '', image: '' });
  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle create
  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          image: form.image
        })
      });
      if (!res.ok) throw new Error('Failed to add product');
      setForm({ name: '', description: '', price: '', image: '' });
      fetchProducts();
    } catch (err) {
      setError('Failed to add product');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  // Handle edit
  const startEdit = (product) => {
    setEditId(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          price: parseFloat(editForm.price),
          image: editForm.image
        })
      });
      if (!res.ok) throw new Error('Failed to update');
      setEditId(null);
      fetchProducts();
    } catch (err) {
      setError('Failed to update product');
    }
  };

  return (
    <div className="app-container">
      <h1>Manage Products (Admin)</h1>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <h2>Add New Product</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ flex: 1, minWidth: 120, padding: 8 }} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={{ flex: 2, minWidth: 180, padding: 8 }} />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={{ width: 100, padding: 8 }} />
        <input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required style={{ flex: 2, minWidth: 180, padding: 8 }} />
        <button type="submit" style={{ padding: '8px 18px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>Add</button>
      </form>
      <h2>All Products</h2>
      {loading ? <p>Loading...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f1f1' }}>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              editId === product._id ? (
                <tr key={product._id} style={{ background: '#e3f2fd' }}>
                  <td><input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} style={{ width: '100%' }} /></td>
                  <td><input value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} style={{ width: '100%' }} /></td>
                  <td><input type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} style={{ width: 80 }} /></td>
                  <td><input value={editForm.image} onChange={e => setEditForm({ ...editForm, image: e.target.value })} style={{ width: '100%' }} /></td>
                  <td>
                    <button onClick={handleEdit} style={{ marginRight: 8, background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Save</button>
                    <button onClick={() => setEditId(null)} style={{ background: '#bdbdbd', color: '#222', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td><img src={product.image} alt={product.name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} /></td>
                  <td>
                    <button onClick={() => startEdit(product)} style={{ marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(product._id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProducts; 