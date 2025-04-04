const express = require('express');
const router = express.Router();
const Hall = require('../models/Hall');

router.post('/create', async (req, res) => {
  try {
    const newHall = new Hall(req.body);
    await newHall.save();
    res.status(201).json(newHall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const halls = await Hall.find();
    res.json(halls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ message: 'Hall not found' });
    res.json(hall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedHall = await Hall.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHall) return res.status(404).json({ message: 'Hall not found' });
    res.json(updatedHall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedHall = await Hall.findByIdAndDelete(req.params.id);
    if (!deletedHall) return res.status(404).json({ message: 'Hall not found' });
    res.json({ message: 'Hall deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;