const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  source: { type: String, default: 'Website' },
  status: { type: String, enum: ['new', 'contacted', 'converted'], default: 'new' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);