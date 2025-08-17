const express = require('express');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

// POST /api/contact - save a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const contactMessage = new ContactMessage({ name, email, message });
    await contactMessage.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/contact - fetch all messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 