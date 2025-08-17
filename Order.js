const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema); 