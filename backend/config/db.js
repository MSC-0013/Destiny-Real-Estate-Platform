const mongoose = require('mongoose');

async function connectToDatabase(uri) {
  if (!uri) throw new Error('MONGODB_URI is required');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || undefined,
  });
  console.log('MongoDB connected');
}

module.exports = { connectToDatabase };


