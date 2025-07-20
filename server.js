import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reviews', review);
app.use('/api/reviews', require('./routes/reviewRoutes'));



// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
