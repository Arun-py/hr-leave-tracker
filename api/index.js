import app from '../backend/server.js';
import connectDB from '../backend/config/db.js';

// Initialize database connection for serverless
let isConnected = false;

export default async (req, res) => {
  try {
    // Connect to database on first request
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }
    
    // Handle the request with Express
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
};
