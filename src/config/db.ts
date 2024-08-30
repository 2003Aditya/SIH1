import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/default-db'; // Fallback to local if env var not set

    // Connect to MongoDB
    await mongoose.connect(dbURI,);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;

