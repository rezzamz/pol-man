const mongoose = require('mongoose');
const Hall = require('./Hall');  // مدل سالن

const dailyDataSchema = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall',  // ارتباط با مدل Hall
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  feedConsumption: {
    type: Number,
    required: true
  },
  waterConsumption: {
    type: Number,
    required: true
  },
  averageWeight: {
    type: Number,
    required: true
  },
  mortality: {
    type: Number,
    required: true
  }
});

const DailyData = mongoose.model('DailyData', dailyDataSchema);

module.exports = DailyData;
