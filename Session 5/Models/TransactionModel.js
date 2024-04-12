const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  tickerName: {
    type: String,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  investment: {
    type: Number,
    required: true
  },
  transactedAt: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;