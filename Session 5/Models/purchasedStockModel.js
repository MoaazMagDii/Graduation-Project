const mongoose = require('mongoose');


const purchasedStockSchema = mongoose.Schema({
  userId: {
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
    min: 0
  },

  investment: {
    type: Number,
    required: true
  }
});

const PurchasedStock = mongoose.model('PurchasedStock', purchasedStockSchema);

module.exports = PurchasedStock;