import { useState, useEffect } from 'react';
import { FaEnvelope, FaCheck, FaSearch, FaSort, FaExclamationCircle } from 'react-icons/fa';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentContact, setCurrentContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [responseUpdating, setResponseUpdating] = useState(false);
  
  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/admin/contacts', {
          credentials: 'include'
        });
        
        const data = await res.json();
        
        if (data.success) {
          setContacts(data.data);
        } else {
          setError(data.message || 'Failed to fetch contacts');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, []);
  
  // Mark contact as responded
  const handleMarkResponded = async (id) => {
    try {
      setResponseUpdating(true);
      
      const res = await fetch(`/api/admin/contacts/${id}/respond`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the contacts list with the updated contact
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, responded: true } : contact
        ));
        
        // Update current contact if it's open
        if (currentContact && currentContact._id === id) {
          setCurrentContact({ ...currentContact, responded: true });
        }
      } else {
        setError(data.message || 'Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Failed to connect to the server');
    } finally {
      setResponseUpdating(false);
    }
  };
  
  // View contact details
  const handleViewContact = (contact) => {
    setCurrentContact(contact);
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
  
  // Filter and sort contacts
  const filteredContacts = contacts
    .filter(contact => {
      const searchFields = [
        contact.name,
        contact.email,
        contact.subject,
        contact.message
      ].join(' ').toLowerCase();
      
      return searchFields.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];
      
      if (sortField === 'date') {
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
        <h2 className="text-xl font-bold text-gray-800">Contact Messages</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      {contacts.length === 0 ? (
        <div className="bg-gray-50 p-6 text-center border rounded-lg">
          <p className="text-gray-600">No contact messages found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === 'date' && (
                      <FaSort className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    From
                    {sortField === 'name' && (
                      <FaSort className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('subject')}
                >
                  <div className="flex items-center">
                    Subject
                    {sortField === 'subject' && (
                      <FaSort className="ml-1" />
                    )}
                  </div>
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
              {filteredContacts.map((contact) => (
                <tr 
                  key={contact._id} 
                  className={`hover:bg-gray-50 ${!contact.responded ? 'font-semibold' : ''}`}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(contact.date)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-inherit text-gray-900">
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-500">{contact.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {contact.subject}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {contact.responded ? (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 flex items-center">
                        <FaCheck className="mr-1" /> Responded
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800 flex items-center">
                        <FaExclamationCircle className="mr-1" /> Awaiting Response
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewContact(contact)}
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
      
      {/* Contact Details Modal */}
      {showModal && currentContact && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaEnvelope className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Message from {currentContact.name}
                    </h3>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        <strong>Email:</strong> {currentContact.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Sent on:</strong> {formatDate(currentContact.date)} at {new Date(currentContact.date).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Status:</strong> {currentContact.responded ? 'Responded' : 'Awaiting Response'}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-gray-700">Subject</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {currentContact.subject}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-gray-700">Message</h4>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">
                          {currentContact.message}
                        </p>
                      </div>
                    </div>
                    
                    {!currentContact.responded && (
                      <div className="mt-6">
                        <button
                          onClick={() => handleMarkResponded(currentContact._id)}
                          disabled={responseUpdating}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                        >
                          {responseUpdating ? (
                            <>
                              <span className="animate-spin mr-2">⟳</span> Updating...
                            </>
                          ) : (
                            <>
                              <FaCheck className="mr-2" /> Mark as Responded
                            </>
                          )}
                        </button>
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
                <a
                  href={`mailto:${currentContact.email}?subject=Re: ${currentContact.subject}`}
                  className="mt-3 mr-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
