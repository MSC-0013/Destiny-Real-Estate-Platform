const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

router.get('/', async (req, res) => {
  const list = await Order.find().sort({ createdAt: -1 }).lean();
  res.json({ orders: list.map(o => ({ ...o, id: String(o._id) })) });
});

router.post('/', async (req, res) => {
  const { propertyId, type, amount, currency, metadata } = req.body || {};
  const auth = req.headers.authorization || '';
  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    if (!propertyId) return res.status(400).json({ error: 'Missing propertyId' });
    const created = await Order.create({
      userId: payload.sub,
      propertyId,
      type: type || 'rental',
      amount: amount || 0,
      currency: currency || 'INR',
      metadata: metadata || {}
    });
    return res.status(201).json({ order: { ...created.toObject(), id: String(created._id) } });
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).lean();
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ order: { ...order, id: String(order._id) } });
});

router.patch('/:id', async (req, res) => {
  const updates = req.body || {};
  const updated = await Order.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true }).lean();
  if (!updated) return res.status(404).json({ error: 'Order not found' });
  res.json({ order: { ...updated, id: String(updated._id) } });
});

module.exports = router;


