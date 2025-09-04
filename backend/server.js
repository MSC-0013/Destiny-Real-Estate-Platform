// Load environment variables
const path = require('path');
require('dotenv').config();
if (!process.env.PORT && !process.env.MONGODB_URI && !process.env.MONGO_URI) {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { connectToDatabase } = require('./config/db');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const propertyRoutes = require('./routes/properties');
const contactRoutes = require('./routes/contact');
const constructionRoutes = require('./routes/construction');
const wishlistRoutes = require('./routes/wishlist');

const app = express();
const PORT = process.env.PORT || 8080;

// ================= CORS =================
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'Destiny Backend', version: '1.0.0' });
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/construction', constructionRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Legacy contact URL
app.get('/contact', (req, res) => {
  const { service, model, property } = req.query || {};
  res.json({ ok: true, service: service || null, model: model || null, property: property || null });
});

// Minimal SSR-like HTML for chatbot
app.get('/construction/chatbot', (req, res) => {
  const model = req.query.model || '';
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!doctype html>
  <html>
    <head><meta charset="utf-8"/><title>Construction Chatbot</title></head>
    <body>
      <h1>Construction Chatbot</h1>
      <p>Model: ${String(model)}</p>
      <p>Please use the frontend at /construction/chatbot?model=${String(model)} to submit details.</p>
    </body>
  </html>`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// ================= DB CONNECTION =================
connectToDatabase(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Destiny backend running on http://localhost:${PORT}`);
      console.log(`Frontend allowed URL: ${FRONTEND_URL}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
