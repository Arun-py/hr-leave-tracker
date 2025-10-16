import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Leave from '../models/Leave.js';

dotenv.config();

const clearLeaveRequests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');

    // Delete all leave requests
    const result = await Leave.deleteMany({});
    console.log(`✅ Successfully deleted ${result.deletedCount} leave requests!`);

    mongoose.disconnect();
  } catch (error) {
    console.error('Error clearing leave requests:', error);
    process.exit(1);
  }
};

clearLeaveRequests();
