import express from 'express';
import {
  checkIn,
  checkOut,
  getMyAttendance,
  getTodayAttendance,
  getAttendanceStats,
} from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkin', protect, checkIn);
router.put('/checkout', protect, checkOut);
router.get('/my-attendance', protect, getMyAttendance);
router.get('/today', protect, getTodayAttendance);
router.get('/stats', protect, getAttendanceStats);

export default router;
