import express from 'express';
import {
  register,
  login,
  getCurrentStudent,
  updateProfile,
  updateParent,
  addParent,
  forgotPassword,
  logout
} from '../controllers/studentAuthController.js';
import { protectStudent, checkStatus } from '../middleware/studentAuth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/logout', logout);

// Protected routes
router.get('/me', protectStudent, getCurrentStudent);
router.put('/profile', protectStudent, updateProfile);
router.put('/parents/:index', protectStudent, updateParent);
router.post('/parents', protectStudent, addParent);

// Routes that require active student status
router.get('/dashboard', protectStudent, checkStatus('active', 'pending'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Access granted to student dashboard',
    data: {
      announcements: [],
      upcomingEvents: [],
      studentStatus: req.student.status
    }
  });
});

export default router;
