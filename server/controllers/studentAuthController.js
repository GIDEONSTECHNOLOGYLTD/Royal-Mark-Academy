import Student from '../models/Student.js';
import Application from '../models/Application.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

/* global process */ // Tell ESLint process is a global variable

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id, userType: 'student' }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Send token in response
const sendTokenResponse = (student, statusCode, res) => {
  const token = generateToken(student._id);
  
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };
  
  res
    .status(statusCode)
    .cookie('studentToken', token, cookieOptions)
    .json({
      success: true,
      token,
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        studentId: student.studentId,
        grade: student.grade,
        status: student.status,
        profileImage: student.profileImage
      }
    });
};

// Register a new student/parent account
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, applicationId } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !applicationId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required information'
      });
    }
    
    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }
    
    // Find the application to link
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Verify that email matches application email
    if (application.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: 'Email must match the email used in your application'
      });
    }
    
    // Create the student account
    const student = await Student.create({
      firstName,
      lastName,
      email,
      password,
      application: applicationId,
      status: 'pending',
      // Copy data from application
      grade: application.gradeApplying,
      dateOfBirth: application.dob,
      address: application.address,
      phoneNumber: application.phone,
      gender: application.gender,
      parents: [
        {
          name: application.parentName,
          relationship: 'Parent/Guardian',
          email: application.email,
          phone: application.phone,
          isEmergencyContact: true
        }
      ]
    });
    
    sendTokenResponse(student, 201, res);
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register student account'
    });
  }
};

// Login student
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    // Check if student exists
    const student = await Student.findOne({ email }).select('+password');
    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check if password matches
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Update last login time
    student.lastLogin = Date.now();
    await student.save();
    
    sendTokenResponse(student, 200, res);
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login'
    });
  }
};

// Get current student
export const getCurrentStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id)
      .populate('application', 'status applicationDate gradeApplying documents')
      .select('-password');
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get current student error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get student information'
    });
  }
};

// Update student profile
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, address } = req.body;
    
    // Fields to update
    const fieldsToUpdate = {};
    if (firstName) fieldsToUpdate.firstName = firstName;
    if (lastName) fieldsToUpdate.lastName = lastName;
    if (phoneNumber) fieldsToUpdate.phoneNumber = phoneNumber;
    if (address) fieldsToUpdate.address = address;
    
    const student = await Student.findByIdAndUpdate(
      req.student.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

// Update parent information
export const updateParent = async (req, res) => {
  try {
    const { parentIndex, name, relationship, email, phone, isEmergencyContact } = req.body;
    
    const student = await Student.findById(req.student.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Check if parent exists at the index
    if (!student.parents[parentIndex]) {
      return res.status(404).json({
        success: false,
        message: 'Parent information not found'
      });
    }
    
    // Update parent information
    if (name) student.parents[parentIndex].name = name;
    if (relationship) student.parents[parentIndex].relationship = relationship;
    if (email) student.parents[parentIndex].email = email;
    if (phone) student.parents[parentIndex].phone = phone;
    if (isEmergencyContact !== undefined) student.parents[parentIndex].isEmergencyContact = isEmergencyContact;
    
    await student.save();
    
    res.status(200).json({
      success: true,
      data: student.parents
    });
  } catch (error) {
    console.error('Update parent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update parent information'
    });
  }
};

// Add additional parent/guardian
export const addParent = async (req, res) => {
  try {
    const { name, relationship, email, phone, isEmergencyContact } = req.body;
    
    const student = await Student.findById(req.student.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    const newParent = {
      name,
      relationship,
      email,
      phone,
      isEmergencyContact: isEmergencyContact || false
    };
    
    student.parents.push(newParent);
    await student.save();
    
    res.status(201).json({
      success: true,
      data: student.parents
    });
  } catch (error) {
    console.error('Add parent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add parent information'
    });
  }
};

// Password reset request
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const student = await Student.findOne({ email });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No account found with that email'
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Set expire time - 10 minutes
    const resetExpire = Date.now() + 10 * 60 * 1000;
    
    // Store hashed version of token
    student.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    student.resetPasswordExpire = resetExpire;
    
    await student.save();
    
    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/student/reset-password/${resetToken}`;
    
    const message = `You are receiving this email because you (or someone else) has requested a password reset. Please click the link below to reset your password: \n\n ${resetUrl}`;
    
    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.sendMail({
      from: `"Royal Mark Academy" <${process.env.EMAIL_FROM}>`,
      to: student.email,
      subject: 'Password Reset Request',
      text: message
    });
    
    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    
    // Remove reset token fields if error
    const student = await Student.findOne({ email: req.body.email });
    if (student) {
      student.resetPasswordToken = undefined;
      student.resetPasswordExpire = undefined;
      await student.save();
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to send password reset email'
    });
  }
};

// Logout student
export const logout = (req, res) => {
  res.cookie('studentToken', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};
