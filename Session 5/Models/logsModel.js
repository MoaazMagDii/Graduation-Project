const mongoose = require('mongoose');

const actionLogSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  logAction: {
    type: String,
    required: true,
  },
  loggedAt: {
    type: Date,
    default: Date.now
  }
});

const ActionLog = mongoose.model('ActionLog', actionLogSchema);

module.exports = ActionLog;