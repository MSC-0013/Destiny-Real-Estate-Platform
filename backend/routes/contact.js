const express = require('express');
const router = express.Router();

// Accept contact queries like /contact?service=construction&model=hm-005
router.get('/', (req, res) => {
  const { service, model, property } = req.query || {};
  res.json({ ok: true, service: service || null, model: model || null, property: property || null });
});

router.post('/', (req, res) => {
  const { name, email, message, service, model } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });
  const ticket = {
    id: `ct_${Date.now()}`,
    name,
    email,
    message,
    service: service || null,
    model: model || null,
    createdAt: new Date().toISOString()
  };
  res.status(201).json({ ticket });
});

module.exports = router;


