const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const contactRoutes = require('./routes/contact');
const ordersRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', ordersRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_auth_demo';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => {
    console.error('Initial MongoDB connection error:', err);
    process.exit(1);
  });

mongoose.connection.on('error', err => {
  console.error('MongoDB runtime error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 