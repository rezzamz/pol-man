const express = require('express');
const router = express.Router();
const Hall = require('../models/Hall');

router.post('/', async (req, res) => {
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

module.exports = router;