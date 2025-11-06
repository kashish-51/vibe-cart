const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true, min: 1 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CartItem', CartItemSchema);
