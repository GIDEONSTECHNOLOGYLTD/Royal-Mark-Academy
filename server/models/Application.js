import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
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
  dob: {
    type: Date
  },
  gender: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  currentSchool: {
    type: String
  },
  gradeApplying: {
    type: String,
    required: true
  },
  parentName: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  documents: [
    {
      name: String,
      fileType: String,
      path: String,
      uploadDate: {
        type: Date,
        default: Date.now
      },
      size: Number,
      documentType: {
        type: String,
        enum: ['birthCertificate', 'transcript', 'medicalRecord', 'identification', 'other']
      }
    }
  ]
});

export default mongoose.model('Application', applicationSchema);
