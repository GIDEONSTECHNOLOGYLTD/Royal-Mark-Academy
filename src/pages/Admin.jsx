import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaSignOutAlt, FaUserGraduate, FaInbox, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import AdminApplications from '../components/admin/AdminApplications';
import AdminContacts from '../components/admin/AdminContacts';
import AdminLogin from '../components/admin/AdminLogin';
import AdminUsers from '../components/admin/AdminUsers';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include' // Important for cookies
        });
        
        const data = await res.json();
        
        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        credentials: 'include'
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }
  
  if (!user) {
    return <AdminLogin setUser={setUser} />;
  }
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Royal Mark Academy Admin</h1>
          <div className="flex items-center">
            <div className="mr-4 text-sm text-gray-600">
              <span className="flex items-center">
                <FaUser className="mr-1" /> 
                {user.name} | {user.role}
              </span>
              <span className="flex items-center text-xs">
                <FaEnvelope className="mr-1" /> 
                {user.email}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            >
              <FaSignOutAlt className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex border-b border-gray-300">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 flex items-center ${activeTab === 'applications' ? 'border-b-2 border-blue-800 text-blue-800' : 'text-gray-600'}`}
          >
            <FaUserGraduate className="mr-2" /> Applications
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 flex items-center ${activeTab === 'contacts' ? 'border-b-2 border-blue-800 text-blue-800' : 'text-gray-600'}`}
          >
            <FaInbox className="mr-2" /> Contact Messages
          </button>
          {user.role === 'admin' && (
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 flex items-center ${activeTab === 'users' ? 'border-b-2 border-blue-800 text-blue-800' : 'text-gray-600'}`}
            >
              <FaUser className="mr-2" /> Manage Users
            </button>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'applications' && <AdminApplications userRole={user.role} />}
          {activeTab === 'contacts' && <AdminContacts />}
          {activeTab === 'users' && user.role === 'admin' && <AdminUsers />}
        </div>
      </div>
    </div>
  );
}
