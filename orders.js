const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST api/orders
// @desc    Create a new order
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { customerInfo, products, total } = req.body;

    const newOrder = new Order({
      customerInfo,
      products,
      total: parseFloat(total),
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err.message);
    res.status(400).json({ message: `Failed to save order. Server says: ${err.message}` });
  }
});

// @route   GET api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 