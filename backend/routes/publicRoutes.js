import express from 'express';
import {
  submitContactForm,
  submitCareerApplication,
  subscribeNewsletter,
  submitDiscussion
} from '../controllers/publicController.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/contact', submitContactForm);
router.post('/careers', submitCareerApplication);
router.post('/subscribe', subscribeNewsletter);
router.post('/discussion', submitDiscussion);

export default router;
