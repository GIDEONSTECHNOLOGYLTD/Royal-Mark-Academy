import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentRegister = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    applicationId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { firstName, lastName, email, password, confirmPassword, applicationId } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !applicationId) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/api/student/register', {
        firstName,
        lastName,
        email,
        password,
        applicationId
      }, {
        withCredentials: true
      });
      
      if (res.data.success) {
        onRegisterSuccess(res.data.student);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Registration failed. Please check your information and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">
        Create Student/Parent Account
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="firstName" 
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            First Name
          </label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-gray-500">
              <FaUser />
            </div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              placeholder="Enter your first name"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="lastName" 
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Last Name
          </label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-gray-500">
              <FaUser />
            </div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email
          </label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-gray-500">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Must match the email used in your application
          </p>
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="applicationId" 
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Application ID
          </label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-gray-500">
              <FaIdCard />
            </div>
            <input
              type="text"
              name="applicationId"
              id="applicationId"
              value={applicationId}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              placeholder="Enter your application ID"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            You received this in your application confirmation email
          </p>
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="password" 
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-gray-500">
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Must be at least 6 characters
          </p>
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="confirmPassword" 
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 text-gray-500">
              <FaLock />
            </div>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Registering...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/student/login')}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;
