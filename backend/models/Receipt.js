const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    qty: Number,
    subtotal: Number
  }],
  total: { type: Number, required: true },
  name: String,
  email: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
