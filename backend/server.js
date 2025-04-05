const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { pathToRegexp, match, parse, compile } = require('path-to-regexp');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // فعال کردن CORS
app.use(express.json()); // فعال کردن JSON parsing

// MongoDB connection (Atlas)
const uri = "mongodb+srv://rmkraty80:ua9uAp1bk3LPotz2@cluster0.vvqqpxz.mongodb.net/hallDB?retryWrites=true&w=majority";
mongoose.connect(uri).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch(err => {
  console.error("Error connecting to MongoDB Atlas", err);
});

const hallSchema = new mongoose.Schema({
  hallName: String,
  importerName: String,
  chickenCount: Number,
  chickenType: String,
  initialWeight: Number,
  budgetType: String,
});

const Hall = mongoose.model('Hall', hallSchema);

// Routes
app.post('/api/halls', async (req, res) => {
  try {
    const newHall = new Hall(req.body);
    await newHall.save();
    res.status(201).json(newHall);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});