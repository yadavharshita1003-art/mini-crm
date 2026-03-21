const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const jwt = require('jsonwebtoken');

// Middleware to check login
function authCheck(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Get all leads
router.get('/', authCheck, async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

// Add a lead
router.post('/', authCheck, async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

// Get single lead
router.get('/:id', authCheck, async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  res.json(lead);
});

// Update lead
router.put('/:id', authCheck, async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
});

// Delete lead
router.delete('/:id', authCheck, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lead deleted' });
});

module.exports = router; 