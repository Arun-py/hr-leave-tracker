import express from 'express';
import {
  addLeave,
  getAllLeave,
  updateLeave,
  deleteLeave,
} from '../controllers/simpleLeaveController.js';

const router = express.Router();

// Simple CRUD routes (no authentication required as per documentation)
router.post('/addLeave', addLeave);
router.get('/getAllLeave', getAllLeave);
router.put('/updateLeave/:id', updateLeave);
router.delete('/deleteLeave/:id', deleteLeave);

export default router;
