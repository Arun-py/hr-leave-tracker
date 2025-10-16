import express from 'express';
import {
  applyLeave,
  getMyLeaves,
  getLeaveById,
  cancelLeave,
  getLeaveStats,
} from '../controllers/leaveController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, applyLeave);
router.get('/my-leaves', protect, getMyLeaves);
router.get('/stats', protect, getLeaveStats);
router.get('/:id', protect, getLeaveById);
router.put('/:id/cancel', protect, cancelLeave);

export default router;
