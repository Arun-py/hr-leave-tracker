import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  // If already connected, reuse the connection
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    // Serverless-friendly connection options
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Don't exit process in serverless environment
    throw error;
  }
};

export default connectDB;
