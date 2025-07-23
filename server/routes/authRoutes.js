import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register); // This will be restricted in production
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getCurrentUser);

// Admin-only routes (for adding new staff accounts)
router.post('/create-staff', protect, authorize('admin'), register);

export default router;
