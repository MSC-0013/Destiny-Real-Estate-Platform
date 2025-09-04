const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// ================= SIGNUP =================
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const normEmail = email.toLowerCase().trim();

    // Check if user exists
    const existingUser = await User.findOne({ email: normEmail });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists', message: 'This email is already registered' });
    }

    // Create new user (plain password)
    const userDoc = await User.create({
      name,
      email: normEmail,
      password, // store plain password
      role: role || 'tenant',
      phone
    });

    // Generate JWT token
    const token = jwt.sign({ sub: userDoc._id, role: userDoc.role }, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...safeUser } = userDoc.toObject();
    res.json({ user: { ...safeUser, id: String(userDoc._id) }, token, message: 'User created successfully' });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    if (err.code === 11000 || (err.message || '').includes('duplicate key')) {
      return res.status(409).json({ error: 'Duplicate user', details: err.message });
    }
    res.status(500).json({ error: 'Signup failed', details: err.message || 'unknown' });
  }
});

// ================= LOGIN =================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const normEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normEmail });
    if (!user || password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...safeUser } = user.toObject();

    res.json({ user: { ...safeUser, id: String(user._id) }, token });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// ================= EMAIL CHECK =================
router.get('/exists', async (req, res) => {
  try {
    const email = (req.query.email || '').toString().toLowerCase().trim();
    if (!email) return res.status(400).json({ error: 'Email query is required' });
    const exists = await User.exists({ email });
    res.json({ exists: !!exists });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check email', details: err.message });
  }
});

router.get('/check-email/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();
    const user = await User.findOne({ email }, { email: 1, name: 1, role: 1, createdAt: 1 });
    if (user) {
      res.json({
        exists: true,
        user: { id: user._id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt }
      });
    } else {
      res.json({ exists: false, user: null });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to check email', details: err.message });
  }
});

// ================= DEBUG / CLEAR =================
router.get('/debug', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const sampleUsers = await User.find({}, { email: 1, name: 1, role: 1, createdAt: 1 }).limit(10);
    res.json({
      totalUsers,
      sampleUsers: sampleUsers.map(u => ({ id: u._id, email: u.email, name: u.name, role: u.role, createdAt: u.createdAt }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get debug info', details: err.message });
  }
});

router.delete('/clear-all', async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.json({ message: 'All users cleared', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear users', details: err.message });
  }
});

// ================= CURRENT USER =================
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { password: _, ...safeUser } = user.toObject();
    res.json({ user: { ...safeUser, id: String(user._id) } });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized', details: err.message });
  }
});

// ================= DB STATUS =================
router.get('/db-status', async (req, res) => {
  try {
    const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
    const dbState = mongoose.connection.readyState;
    res.json({
      connection: states[dbState] || 'unknown',
      readyState: dbState,
      database: mongoose.connection.db?.databaseName || 'unknown',
      host: mongoose.connection.host || 'unknown',
      port: mongoose.connection.port || 'unknown'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check DB status', details: err.message });
  }
});

module.exports = router;
