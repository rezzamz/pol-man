const express = require('express');
const router = express.Router();
const DataForm = require('../models/DataForm');

router.post('/create', async (req, res) => {
  try {
    const newDataForm = new DataForm(req.body);
    await newDataForm.save();
    res.status(201).json(newDataForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const dataForms = await DataForm.find();
    res.json(dataForms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dataForm = await DataForm.findById(req.params.id);
    if (!dataForm) return res.status(404).json({ message: 'DataForm not found' });
    res.json(dataForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedDataForm = await DataForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDataForm) return res.status(404).json({ message: 'DataForm not found' });
    res.json(updatedDataForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedDataForm = await DataForm.findByIdAndDelete(req.params.id);
    if (!deletedDataForm) return res.status(404).json({ message: 'DataForm not found' });
    res.json({ message: 'DataForm deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;