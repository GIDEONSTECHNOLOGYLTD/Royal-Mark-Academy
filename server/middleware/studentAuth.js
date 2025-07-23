import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

/* global process */ // Tell ESLint process is a global variable

// Middleware to protect student routes
export const protectStudent = async (req, res, next) => {
  let token;
  
  // Check if token exists in headers or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.studentToken) {
    // Get token from cookie
    token = req.cookies.studentToken;
  }

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if it's a student token
    if (decoded.userType !== 'student') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token type for student routes'
      });
    }
    
    // Get student from token
    req.student = await Student.findById(decoded.id).select('-password');
    
    if (!req.student) {
      return res.status(401).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Record last login time
    await Student.findByIdAndUpdate(decoded.id, { lastLogin: Date.now() });
    
    next();
  } catch (error) {
    console.error('Student authentication error:', error.message);
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route' 
    });
  }
};

// Middleware to check student status
export const checkStatus = (...statuses) => {
  return (req, res, next) => {
    if (!req.student || !statuses.includes(req.student.status)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Your account status (${req.student ? req.student.status : 'undefined'}) does not allow access to this resource.` 
      });
    }
    next();
  };
};
