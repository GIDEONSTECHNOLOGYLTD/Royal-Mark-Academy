import { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaEye, FaTimesCircle, FaSearch, FaDownload, FaSort } from 'react-icons/fa';

export default function AdminApplications({ userRole }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentApplication, setCurrentApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('applicationDate');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/admin/applications', {
          credentials: 'include'
        });
        
        const data = await res.json();
        
        if (data.success) {
          setApplications(data.data);
        } else {
          setError(data.message || 'Failed to fetch applications');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, []);
  
  // Update application status
  const handleStatusUpdate = async (id, status) => {
    if (userRole !== 'admin') return;
    
    try {
      setStatusUpdating(true);
      
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status }),
        credentials: 'include'
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the applications list with the updated application
        setApplications(applications.map(app => 
          app._id === id ? { ...app, status: status } : app
        ));
        
        // Update current application if it's open
        if (currentApplication && currentApplication._id === id) {
          setCurrentApplication({ ...currentApplication, status });
        }
      } else {
        setError(data.message || 'Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      setError('Failed to connect to the server');
    } finally {
      setStatusUpdating(false);
    }
  };
  
  // View application details
  const handleViewApplication = (application) => {
    setCurrentApplication(application);
    setShowModal(true);
  };
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort applications
  const filteredApplications = applications
    .filter(app => {
      const searchFields = [
        app.firstName,
        app.lastName,
        app.email,
        app.gradeApplying,
        app.parentName
      ].join(' ').toLowerCase();
      
      return searchFields.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];
      
      if (sortField === 'applicationDate') {
        fieldA = new Date(fieldA);
        fieldB = new Date(fieldB);
      }
      
      if (sortDirection === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800 flex items-center"><FaClock className="mr-1" /> Pending</span>;
      case 'reviewed':
        return <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 flex items-center"><FaEye className="mr-1" /> Reviewed</span>;
      case 'accepted':
        return <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 flex items-center"><FaCheckCircle className="mr-1" /> Accepted</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800 flex items-center"><FaTimesCircle className="mr-1" /> Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Student Applications</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      {applications.length === 0 ? (
        <div className="bg-gray-50 p-6 text-center border rounded-lg">
          <p className="text-gray-600">No applications found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('applicationDate')}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === 'applicationDate' && (
                      <FaSort className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastName')}
                >
                  <div className="flex items-center">
                    Student Name
                    {sortField === 'lastName' && (
                      <FaSort className="ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent/Guardian
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(application.applicationDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {application.firstName} {application.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{application.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {application.gradeApplying}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {application.parentName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={application.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewApplication(application)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Application Details Modal */}
      {showModal && currentApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Application Details
                      </h3>
                      <StatusBadge status={currentApplication.status} />
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Student Information</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">Name:</span> {currentApplication.firstName} {currentApplication.lastName}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">Date of Birth:</span> {currentApplication.dob ? formatDate(currentApplication.dob) : 'Not provided'}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">Grade Applying For:</span> {currentApplication.gradeApplying}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">Current School:</span> {currentApplication.currentSchool || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Parent/Guardian Information</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">Name:</span> {currentApplication.parentName}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">Email:</span> {currentApplication.email}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">Phone:</span> {currentApplication.phone}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">Address:</span> {currentApplication.address || 'Not provided'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Additional Information</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {currentApplication.message || 'No additional information provided.'}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Application Submitted</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDate(currentApplication.applicationDate)} at {new Date(currentApplication.applicationDate).toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {userRole === 'admin' && (
                      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Update Application Status</h4>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleStatusUpdate(currentApplication._id, 'pending')}
                            disabled={currentApplication.status === 'pending' || statusUpdating}
                            className={`px-3 py-1 text-xs rounded-md flex items-center ${
                              currentApplication.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 cursor-default'
                                : 'bg-yellow-500 text-white hover:bg-yellow-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <FaClock className="mr-1" /> Mark Pending
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(currentApplication._id, 'reviewed')}
                            disabled={currentApplication.status === 'reviewed' || statusUpdating}
                            className={`px-3 py-1 text-xs rounded-md flex items-center ${
                              currentApplication.status === 'reviewed'
                                ? 'bg-blue-100 text-blue-800 cursor-default'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <FaEye className="mr-1" /> Mark Reviewed
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(currentApplication._id, 'accepted')}
                            disabled={currentApplication.status === 'accepted' || statusUpdating}
                            className={`px-3 py-1 text-xs rounded-md flex items-center ${
                              currentApplication.status === 'accepted'
                                ? 'bg-green-100 text-green-800 cursor-default'
                                : 'bg-green-500 text-white hover:bg-green-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <FaCheckCircle className="mr-1" /> Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(currentApplication._id, 'rejected')}
                            disabled={currentApplication.status === 'rejected' || statusUpdating}
                            className={`px-3 py-1 text-xs rounded-md flex items-center ${
                              currentApplication.status === 'rejected'
                                ? 'bg-red-100 text-red-800 cursor-default'
                                : 'bg-red-500 text-white hover:bg-red-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <FaTimesCircle className="mr-1" /> Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-3 mr-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => window.print()}
                >
                  <FaDownload className="mr-2" /> Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
