const mongoose = require('mongoose');

const hallDetailSchema = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall',
    required: true
  },
  dailyData: [
    {
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
    }
  ]
});

const HallDetail = mongoose.model('HallDetail', hallDetailSchema);

module.exports = HallDetail;