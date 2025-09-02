const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body || {};
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const doc = await User.create({ name, email, passwordHash, role: role || 'tenant', phone });
    const token = jwt.sign({ sub: doc._id, role: doc.role }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash: _, ...safe } = doc.toObject();
    return res.json({ user: { ...safe, id: String(doc._id) }, token });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash: _, ...safe } = user.toObject();
    return res.json({ user: { ...safe, id: String(user._id) }, token });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to login' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const { passwordHash: _, ...safe } = user.toObject();
    return res.json({ user: { ...safe, id: String(user._id) } });
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;


