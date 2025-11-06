const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipt');
const Product = require('../models/Product');
const CartItem = require('../models/CartItem');
const auth = require('../middleware/auth');

// POST /api/checkout
router.post('/', auth, async (req, res, next) => {
  try {
    const { cartItems, name, email, useCartItemsFromUser } = req.body;
    const userId = req.user._id;

    let itemsToProcess = cartItems;

    if (useCartItemsFromUser) {
      const cart = await CartItem.find({ userId }).populate('product').lean();
      itemsToProcess = cart.map(ci => ({ productId: ci.product._id, qty: ci.qty }));
    }

    if (!Array.isArray(itemsToProcess) || itemsToProcess.length === 0) {
      return res.status(400).json({ error: 'cartItems required' });
    }

    const itemsDetailed = [];
    let total = 0;
    for (const it of itemsToProcess) {
      const p = await Product.findById(it.productId).lean();
      if (!p) return res.status(400).json({ error: `product not found: ${it.productId}` });
      const qty = Number(it.qty) || 0;
      if (!Number.isInteger(qty) || qty <= 0) return res.status(400).json({ error: 'invalid qty' });
      const subtotal = p.price * qty;
      total += subtotal;
      itemsDetailed.push({ product: p._id, name: p.name, price: p.price, qty, subtotal });
    }

    const receipt = new Receipt({
      items: itemsDetailed,
      total,
      name,
      email,
      userId
    });
    await receipt.save();

    if (useCartItemsFromUser) {
      await CartItem.deleteMany({ userId });
    }

    res.json({
      receiptId: receipt._id,
      total: receipt.total,
      timestamp: receipt.createdAt,
      items: receipt.items
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
