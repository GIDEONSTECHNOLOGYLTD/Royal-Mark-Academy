import mongoose from 'mongoose';

/* global process */ // This comment tells ESLint that process is a global variable

const connectDB = async () => {
  try {
    // MongoDB connection options to handle deployment environments
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // These options help with cloud hosting platforms like Render
      family: 4, // Force IPv4
      retryWrites: true,
      w: 'majority'
    };
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/royal-mark-academy';
    
    const conn = await mongoose.connect(mongoURI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.log('NOTE: If using MongoDB Atlas, please ensure you have:');
    console.log('1. Whitelisted 0.0.0.0/0 in your Atlas Network Access (for testing)');
    console.log('2. Created a database user with proper permissions');
    console.log('3. Set the correct MONGODB_URI in your environment variables');
    
    // Don't exit the process in production, just log the error
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    return null;
  }
};

export default connectDB;
