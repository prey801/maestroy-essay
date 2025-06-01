// models/Assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['essay', 'research', 'thesis', 'case', 'presentation'],
  },
  deadline: {
    type: Date,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true, // For simplicity, assume userId is passed from frontend
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Assignment', assignmentSchema);