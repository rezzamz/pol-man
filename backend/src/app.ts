import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import hallRoutes from './routes/hallRoutes';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/halls', hallRoutes);

// Database connection
const MONGODB_URI = 'mongodb+srv://reza2:reza@cluster0.vvqqpxz.mongodb.net/';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;