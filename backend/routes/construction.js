const express = require('express');
const router = express.Router();

// In-memory construction contracts and approvals
const contracts = [];

router.get('/contracts', (_req, res) => {
  res.json({ contracts });
});

router.post('/contracts', (req, res) => {
  const { userId, projectName, budgetInInr, location, startDate, endDate, requirements } = req.body || {};
  if (!userId || !projectName || !budgetInInr) {
    return res.status(400).json({ error: 'userId, projectName, budgetInInr are required' });
  }
  const contract = {
    id: `cn_${Date.now()}`,
    userId,
    projectName,
    budgetInInr,
    location: location || 'TBD',
    startDate: startDate || null,
    endDate: endDate || null,
    requirements: requirements || {},
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  contracts.push(contract);
  res.status(201).json({ contract });
});

router.post('/contracts/:id/approve', (req, res) => {
  const contract = contracts.find(c => c.id === req.params.id);
  if (!contract) return res.status(404).json({ error: 'Contract not found' });
  contract.status = 'approved';
  contract.approvedAt = new Date().toISOString();
  res.json({ contract });
});

router.post('/contracts/:id/reject', (req, res) => {
  const contract = contracts.find(c => c.id === req.params.id);
  if (!contract) return res.status(404).json({ error: 'Contract not found' });
  contract.status = 'rejected';
  contract.rejectedAt = new Date().toISOString();
  res.json({ contract });
});

module.exports = router;


