const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import all routes
const authRoutes = require('../forum-backend/routes/auth');
const threadRoutes = require('../forum-backend/routes/threads');
const categoryRoutes = require('../forum-backend/routes/categories');
const userRoutes = require('../forum-backend/routes/users');
const replyRoutes = require('../forum-backend/routes/replies');
const voteRoutes = require('../forum-backend/routes/votes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes (remove /api prefix for serverless)
app.use('/auth', authRoutes);
app.use('/threads', threadRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/replies', replyRoutes);
app.use('/votes', voteRoutes);

module.exports = app;