const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // بارگذاری متغیرهای محیطی

const app = express();
const port = 5000;

// تنظیمات دقیق‌تر CORS
const corsOptions = {
  origin: 'http://localhost:3000', // آدرس فرانت‌اند شما
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // استفاده از تنظیمات CORS سفارشی
app.use(express.json()); // فعال کردن JSON parsing

// MongoDB connection (Atlas)
const uri = process.env.MONGODB_URI;
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
app.options('/api/halls', cors(corsOptions)); // پاسخ به درخواست‌های preflight

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