const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    const normalized = products.map(p => ({ id: p._id, name: p.name, price: p.price, description: p.description, image: p.image }));
    res.json(normalized);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
