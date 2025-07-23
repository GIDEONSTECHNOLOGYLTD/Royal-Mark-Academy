import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    unique: true,
    sparse: true // allows null values
  },
  grade: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  profileImage: {
    type: String
  },
  enrollmentDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'graduated'],
    default: 'pending'
  },
  parents: [{
    name: String,
    relationship: String,
    email: String,
    phone: String,
    isEmergencyContact: Boolean
  }],
  // Reference to the original application
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  },
  // Academic records will be stored in a separate collection
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hashing middleware
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Student', studentSchema);
