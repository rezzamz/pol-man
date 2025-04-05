const mongoose = require('mongoose');

const hallDetailSchema = new mongoose.Schema({
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  detail: { type: String, required: true },
  dailyData: [{ type: Object, required: true }]
});

const HallDetail = mongoose.model('HallDetail', hallDetailSchema);

module.exports = HallDetail;