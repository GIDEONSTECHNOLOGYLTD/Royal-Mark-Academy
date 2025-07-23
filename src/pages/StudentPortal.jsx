import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaSpinner, FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import StudentLogin from '../components/student/StudentLogin';
import StudentRegister from '../components/student/StudentRegister';
import StudentDashboard from '../components/student/StudentDashboard';

const StudentPortal = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if student is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get('/api/student/me', {
          withCredentials: true
        });
        
        if (res.data.success && res.data.data) {
          setStudent(res.data.data);
          navigate('/student/dashboard');
        } else {
          // If user is not logged in and trying to access dashboard, redirect to login
          if (location.pathname === '/student/dashboard') {
            navigate('/student/login');
          }
        }
      } catch (err) {
        // Not logged in or token expired
        console.log('User not logged in:', err.message);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigate, location.pathname]);

  const handleLoginSuccess = (studentData) => {
    setStudent(studentData);
    navigate('/student/dashboard');
  };

  const handleRegisterSuccess = (studentData) => {
    setStudent(studentData);
    navigate('/student/dashboard');
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/student/logout', {
        withCredentials: true
      });
      setStudent(null);
      navigate('/student/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl text-blue-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <a href="/" className="flex items-center text-blue-900 hover:text-blue-700 mr-4">
              <FaChevronLeft className="mr-1" />
              <span>Back to Homepage</span>
            </a>
            <h1 className="text-3xl font-bold text-blue-900">
              {location.pathname.includes('/login') ? 'Student Portal Login' : 
               location.pathname.includes('/register') ? 'Student Registration' : 
               'Student Dashboard'}
            </h1>
          </div>
          
          {student && (
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          )}
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Routes>
            <Route path="/" element={<Navigate to="/student/login" />} />
            <Route path="/login" element={
              <div className="p-8">
                <StudentLogin onLoginSuccess={handleLoginSuccess} />
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    New student?{' '}
                    <button
                      onClick={() => navigate('/student/register')}
                      className="text-blue-600 hover:underline"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </div>
            } />
            
            <Route path="/register" element={
              <div className="p-8">
                <StudentRegister onRegisterSuccess={handleRegisterSuccess} />
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
            } />
            
            <Route path="/dashboard" element={
              student ? (
                <div className="p-8">
                  <StudentDashboard />
                </div>
              ) : (
                <Navigate to="/student/login" />
              )
            } />
          </Routes>
        </div>
      </div>
      
      <footer className="bg-white shadow-inner py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Royal Mark Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudentPortal;
