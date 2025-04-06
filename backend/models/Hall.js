const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  hallName: {
    type: String,
    required: true
  },
  importerName: {
    type: String,
    required: true
  },
  chickenCount: {
    type: Number,
    required: true
  },
  chickenType: {
    type: String,
    required: true
  },
  initialWeight: {
    type: Number,
    required: true
  },
  budgetType: {
    type: String,
    required: true
  }
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;