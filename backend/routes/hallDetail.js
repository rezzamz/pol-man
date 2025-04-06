const express = require('express');
const router = express.Router();
const HallDetail = require('../models/HallDetail');

router.post('/create', async (req, res) => {
  try {
    const newHallDetail = new HallDetail(req.body);
    await newHallDetail.save();
    res.status(201).json(newHallDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const hallDetails = await HallDetail.find();
    res.json(hallDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hallDetail = await HallDetail.findById(req.params.id);
    if (!hallDetail) return res.status(404).json({ message: 'HallDetail not found' });
    res.json(hallDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedHallDetail = await HallDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHallDetail) return res.status(404).json({ message: 'HallDetail not found' });
    res.json(updatedHallDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedHallDetail = await HallDetail.findByIdAndDelete(req.params.id);
    if (!deletedHallDetail) return res.status(404).json({ message: 'HallDetail not found' });
    res.json({ message: 'HallDetail deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;