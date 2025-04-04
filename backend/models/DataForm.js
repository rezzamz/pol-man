const mongoose = require('mongoose');

const dataFormSchema = new mongoose.Schema({
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  formData: { type: Object, required: true }
});

const DataForm = mongoose.model('DataForm', dataFormSchema);

module.exports = DataForm;