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

router.get('/:hallId', async (req, res) => {
  try {
    const hallDetail = await HallDetail.findOne({ hallId: req.params.hallId });
    if (!hallDetail) return res.status(404).json({ message: 'Hall detail not found' });
    res.json(hallDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:hallId', async (req, res) => {
  try {
    const updatedHallDetail = await HallDetail.findOneAndUpdate({ hallId: req.params.hallId }, req.body, { new: true });
    if (!updatedHallDetail) return res.status(404).json({ message: 'Hall detail not found' });
    res.json(updatedHallDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:hallId', async (req, res) => {
  try {
    const deletedHallDetail = await HallDetail.findOneAndDelete({ hallId: req.params.hallId });
    if (!deletedHallDetail) return res.status(404).json({ message: 'Hall detail not found' });
    res.json({ message: 'Hall detail deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;