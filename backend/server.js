import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import hrRoutes from './routes/hrRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import simpleLeaveRoutes from './routes/simpleLeaveRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS Configuration (as per documentation requirements)
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8081',
    'https://hr-leave-tracker-lk1b.vercel.app',
    /https:\/\/8081-.+\.premiumproject\.examly\.io/,
    /https:\/\/.+\.vercel\.app/, // Allow all Vercel deployments
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'HR Leave Tracker API is running...' });
});

// Authenticated routes (must come before catch-all routes)
app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

// Simple Leave Routes (as per documentation - no /api prefix, no auth)
app.use('/', simpleLeaveRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Port configuration (as per documentation)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export default app;
