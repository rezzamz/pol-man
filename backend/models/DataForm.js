const mongoose = require('mongoose');

const dataFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

const DataForm = mongoose.model('DataForm', dataFormSchema);

module.exports = DataForm;