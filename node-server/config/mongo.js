const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectMongoDB = async () => {
    try {
      const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/watch-em';
  
      await mongoose.connect(mongoURI, {
        dbName: 'watchem',
      });
  
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1);
    }
  };
  
module.exports = connectMongoDB;