import React, { useState, useEffect } from 'react';
import { 
  FaUserCircle, 
  FaGraduationCap, 
  FaIdCard, 
  FaClock, 
  FaBell,
  FaFileUpload,
  FaFileDownload,
  FaTrash,
  FaSpinner
} from 'react-icons/fa';
import axios from 'axios';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [fileUpload, setFileUpload] = useState({
    file: null,
    documentType: 'other',
    uploading: false
  });

  // Load student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/student/me', {
          withCredentials: true
        });
        setStudentData(res.data.data);
        
        // If we have an application ID, fetch documents
        if (res.data.data.application) {
          const docsRes = await axios.get(`/api/uploads/applications/${res.data.data.application._id}/documents`, {
            withCredentials: true
          });
          setDocuments(docsRes.data.data);
        }
      } catch (err) {
        setError('Failed to load your information. Please refresh the page.');
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleFileChange = (e) => {
    setFileUpload({
      ...fileUpload,
      file: e.target.files[0]
    });
  };

  const handleDocumentTypeChange = (e) => {
    setFileUpload({
      ...fileUpload,
      documentType: e.target.value
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!fileUpload.file) {
      alert('Please select a file to upload');
      return;
    }
    
    try {
      setFileUpload({ ...fileUpload, uploading: true });
      
      const formData = new FormData();
      formData.append('document', fileUpload.file);
      formData.append('documentType', fileUpload.documentType);
      
      const res = await axios.post(
        `/api/uploads/applications/${studentData.application._id}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );
      
      // Add the new document to the list
      setDocuments([...documents, res.data.data]);
      
      // Reset the file input
      setFileUpload({
        file: null,
        documentType: 'other',
        uploading: false
      });
      
      // Reset the file input element
      document.getElementById('document-upload').value = '';
      
    } catch (err) {
      alert('Failed to upload document. Please try again.');
      console.error('Error uploading document:', err);
      setFileUpload({ ...fileUpload, uploading: false });
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }
    
    try {
      await axios.delete(
        `/api/uploads/applications/${studentData.application._id}/documents/${documentId}`,
        { withCredentials: true }
      );
      
      // Remove the document from the list
      setDocuments(documents.filter(doc => doc._id !== documentId));
    } catch (err) {
      alert('Failed to delete document. Please try again.');
      console.error('Error deleting document:', err);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
    { id: 'application', label: 'Application', icon: <FaIdCard /> },
    { id: 'documents', label: 'Documents', icon: <FaGraduationCap /> },
    { id: 'announcements', label: 'Announcements', icon: <FaBell /> }
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-lg shadow-inner">
        <FaSpinner className="animate-spin text-5xl text-blue-800 mb-4" />
        <p className="text-blue-900 font-medium">Loading your information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-5 rounded-md shadow-md mb-6">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      active: 'bg-green-100 text-green-800 border-green-300',
      inactive: 'bg-gray-100 text-gray-800 border-gray-300',
      graduated: 'bg-blue-100 text-blue-800 border-blue-300',
      accepted: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      reviewed: 'bg-purple-100 text-purple-800 border-purple-300'
    };
    
    return (
      <span className={`${statusStyles[status] || statusStyles.pending} text-sm font-medium px-2.5 py-0.5 rounded border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Hero banner with school colors */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-5 text-white">
        <h2 className="text-xl font-semibold">Welcome to Royal Mark Academy Student Portal</h2>
        <p className="text-blue-100 mt-1">Established October 5, 2014 • Number 1 Elepa Road, Odeda, Abeokuta</p>
      </div>
      
      <div className="p-6">
      {studentData && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
                {studentData.profileImage ? (
                  <img 
                    src={studentData.profileImage} 
                    alt={`${studentData.firstName} ${studentData.lastName}`}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {studentData.firstName} {studentData.lastName}
                </h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <FaIdCard className="mr-2" />
                  <span>
                    {studentData.studentId ? 
                      `Student ID: ${studentData.studentId}` : 
                      'Pending ID Assignment'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <FaGraduationCap className="mr-2 text-blue-900" />
                <span className="text-gray-700 font-medium mr-2">Status:</span>
                {getStatusBadge(studentData.status)}
              </div>
              {studentData.application && (
                <div className="flex items-center">
                  <FaClock className="mr-2 text-blue-900" />
                  <span className="text-gray-700 text-sm">
                    Application Status: {getStatusBadge(studentData.application.status)}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b mb-6">
            <ul className="flex flex-wrap -mb-px">
              {tabs.map(tab => (
                <li key={tab.id} className="mr-2">
                  <button
                    className={`inline-flex items-center py-4 px-6 text-sm font-medium border-b-2 rounded-t-lg transition-all duration-200 ${activeTab === tab.id
                      ? 'text-blue-900 border-blue-900 bg-blue-50'
                      : 'text-gray-500 border-transparent hover:text-blue-700 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className={`mr-2 ${activeTab === tab.id ? 'text-blue-700' : 'text-gray-400'}`}>{tab.icon}</span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{studentData.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {studentData.dateOfBirth ? new Date(studentData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{studentData.gender || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{studentData.address || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{studentData.phoneNumber || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Grade</p>
                  <p className="font-medium">{studentData.grade || 'Not assigned'}</p>
                </div>
                
                {studentData.enrollmentDate && (
                  <div>
                    <p className="text-sm text-gray-500">Enrollment Date</p>
                    <p className="font-medium">
                      {new Date(studentData.enrollmentDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Parent/Guardian Information</h3>
                
                {studentData.parents && studentData.parents.length > 0 ? (
                  studentData.parents.map((parent, index) => (
                    <div key={index} className="mb-6 p-4 border rounded-md">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-800">{parent.name}</p>
                        {parent.isEmergencyContact && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                            Emergency Contact
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{parent.relationship}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <span className="text-gray-500">Email:</span> {parent.email}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Phone:</span> {parent.phone}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No parent/guardian information available.</p>
                )}
                
                <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Parent/Guardian
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Documents</h3>
                <form onSubmit={handleUpload} className="p-4 border rounded-md bg-gray-50">
                  <div className="mb-4">
                    <label htmlFor="document-upload" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Document
                    </label>
                    <input
                      type="file"
                      id="document-upload"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Allowed file types: PDF, Word, Excel, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="document-type" className="block text-sm font-medium text-gray-700 mb-2">
                      Document Type
                    </label>
                    <select
                      id="document-type"
                      value={fileUpload.documentType}
                      onChange={handleDocumentTypeChange}
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="birthCertificate">Birth Certificate</option>
                      <option value="transcript">School Transcript</option>
                      <option value="medicalRecord">Medical Record</option>
                      <option value="identification">Identification</option>
                      <option value="other">Other Document</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={fileUpload.uploading || !fileUpload.file}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      fileUpload.uploading || !fileUpload.file
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-900 hover:bg-blue-800'
                    }`}
                  >
                    {fileUpload.uploading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" /> Uploading...
                      </>
                    ) : (
                      <>
                        <FaFileUpload className="mr-2" /> Upload Document
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Documents</h3>
              
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {documents.map(doc => (
                    <div key={doc._id} className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{doc.documentType.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-xs text-gray-500">
                          Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={`/api/uploads/applications/${studentData.application._id}/documents/${doc._id}/view`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-blue-600 hover:text-blue-800"
                          title="View Document"
                        >
                          <FaFileDownload />
                        </a>
                        <button
                          onClick={() => handleDeleteDocument(doc._id)}
                          className="p-2 text-red-600 hover:text-red-800"
                          title="Delete Document"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No documents uploaded yet. Please upload your required documents.
                </p>
              )}
            </div>
          )}
          
          {activeTab === 'announcements' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Announcements</h3>
              
              {/* Sample announcement data - you would fetch this from an API */}
              {[
                {
                  id: 1,
                  title: 'Welcome to the 2025-2026 Academic Year',
                  date: '2025-07-15',
                  content: 'Welcome to Royal Mark Academy! We are excited to begin a new academic year. Please ensure all documents are submitted before the start of classes.'
                },
                {
                  id: 2,
                  title: 'Parent-Teacher Conference Schedule',
                  date: '2025-07-10',
                  content: 'The first parent-teacher conference of the academic year will be held on August 15, 2025. Please check your email for the detailed schedule.'
                }
              ].map(announcement => (
                <div key={announcement.id} className="mb-4 p-4 border rounded-md">
                  <div className="flex items-start">
                    <FaBell className="text-blue-900 mt-1 mr-3" />
                    <div>
                      <h4 className="text-md font-medium">{announcement.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                      <p className="text-sm mt-2">{announcement.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* If there are no announcements */}
              {/* <p className="text-gray-500">No announcements at this time.</p> */}
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
};

export default StudentDashboard;
