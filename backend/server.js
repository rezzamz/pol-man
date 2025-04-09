const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 8000;

// فقط یک بار تعریف CORS با تنظیمات دقیق
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions)); // ✅ استفاده از CORS سفارشی
app.use(express.json()); // ✅ JSON parsing

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch(err => {
  console.error("Error connecting to MongoDB Atlas", err);
});

// روت‌ها باید در فایل `routes/halls.js` تعریف شوند
const hallRoutes = require('./routes/halls'); // ایمپورت روت‌ها از فایل halls.js
app.use('/halls', hallRoutes);  // اضافه کردن روت‌ها به سرور

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
