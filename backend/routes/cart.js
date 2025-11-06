const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id;
    const items = await CartItem.find({ userId }).populate('product').lean();
    const mapped = items
      .filter(it => it.product) // drop orphaned cart items with missing product
      .map(it => {
        const price = typeof it.product.price === 'number' ? it.product.price : 0;
        const subtotal = price * it.qty;
        return {
          id: it._id,
          product: {
            id: it.product._id,
            name: it.product.name,
            price: price,
            image: it.product.image
          },
          qty: it.qty,
          subtotal
        };
      });
    const total = mapped.reduce((s, i) => s + i.subtotal, 0);
    res.json({ items: mapped, total });
  } catch (err) {
    next(err);
  }
});

// POST /api/cart
router.post('/', async (req, res, next) => {
  try {
    const { productId, qty = 1 } = req.body;
    const userId = req.user._id;

    if (!productId) return res.status(400).json({ error: 'productId is required' });
    if (!Number.isInteger(qty) || qty <= 0) return res.status(400).json({ error: 'qty must be a positive integer' });
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ error: 'invalid productId' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'product not found' });

    const existing = await CartItem.findOne({ product: productId, userId });
    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.status(200).json({ message: 'Cart updated', id: existing._id });
    }

    const cartItem = new CartItem({ product: productId, qty, userId });
    await cartItem.save();
    res.status(201).json({ message: 'Added to cart', id: cartItem._id });
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/:id
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { qty } = req.body;
    const userId = req.user._id;

    if (!Number.isInteger(qty) || qty <= 0) return res.status(400).json({ error: 'qty must be a positive integer' });

    const item = await CartItem.findOne({ _id: id, userId });
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    item.qty = qty;
    await item.save();
    res.json({ message: 'Cart item updated' });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const result = await CartItem.findOneAndDelete({ _id: id, userId });
    if (!result) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
