// backend/src/db.ts

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/fifo-queue');

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));
