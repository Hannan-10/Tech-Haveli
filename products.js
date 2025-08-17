const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products - fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/products - add a product (for testing/demo)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product data' });
  }
});

// PUT /api/products/:id - update a product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete product' });
  }
});

module.exports = router; 