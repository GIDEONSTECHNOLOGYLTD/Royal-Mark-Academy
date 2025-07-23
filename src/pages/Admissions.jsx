import React, { useState } from 'react';
import { FaIdCard, FaCheckCircle, FaCalendarCheck, FaUserFriends, FaClipboardList, FaFileAlt, FaUniversity, FaCalendarAlt, FaUserGraduate, FaDownload, FaGraduationCap, FaArrowRight, FaChalkboardTeacher, FaBuilding, FaStar } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { submitApplication } from '../utils/api';

function Admissions() {
  // State management
  const [activeTab, setActiveTab] = useState('requirements');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    desiredGrade: '',
    previousSchool: '',
    startTerm: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Application Form Handlers
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function validateForm() {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.childName.trim()) errors.childName = "Child's name is required";
    if (!formData.childAge.trim()) errors.childAge = "Child's age is required";
    if (!formData.desiredGrade.trim()) errors.desiredGrade = "Desired grade is required";
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Send application to the backend API using utility
      submitApplication(formData)
      .then(data => {
        if (data.success) {
          setIsSubmitting(false);
          setFormErrors({});
          setSubmitted(true);
          console.log("Application submitted:", formData);
          
          setTimeout(() => {
            setShowApplicationForm(false);
            setSubmitted(false);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              childName: '',
              childAge: '',
              desiredGrade: '',
              previousSchool: '',
              startTerm: '',
              message: ''
            });
          }, 3000);
        } else {
          throw new Error(data.message || 'Failed to submit application');
        }
      })
      .catch(error => {
        console.error('Error submitting application:', error);
        setIsSubmitting(false);
        setFormErrors(prev => ({
          ...prev,
          general: error.message || "Failed to submit application. Please try again later."
        }));
      });
    } else {
      setFormErrors(errors);
    }
  }
  
  // Animation definitions - removed unused tabVariants
  
  const processSteps = [
    { id: 1, title: 'Submit Application', icon: FaClipboardList, desc: 'Complete and submit the online application form along with all required documents.' },
    { id: 2, title: 'Entrance Assessment', icon: FaChalkboardTeacher, desc: 'Students take part in our comprehensive academic and aptitude assessment at our campus in Number 1 Elepa Road, Odeda, Abeokuta.' },
    { id: 3, title: 'Family Interview', icon: FaUserGraduate, desc: 'Meet with our admissions team to discuss educational goals and school values established since our founding in 2014.' },
    { id: 4, title: 'Decision & Enrollment', icon: FaCheckCircle, desc: 'Receive an admission decision and complete the enrollment process if accepted.' },
  ];

  // Application Form Modal Component
  const applicationFormModal = showApplicationForm ? (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        
        {/* Modal panel */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => !isSubmitting && !submitted && setShowApplicationForm(false)}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-5 sm:px-6">
            <h3 className="text-2xl leading-6 font-bold text-white" id="modal-title">
              Royal Mark Academy Application Form
            </h3>
            <p className="mt-1 text-blue-100">
              Please complete all required fields to begin your application process.
            </p>
          </div>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-white">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                {/* Parent Information */}
                <div className="sm:col-span-2">
                  <h4 className="text-lg font-medium text-blue-800 mb-3">Parent/Guardian Information</h4>
                </div>
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  />
                  {formErrors.fullName && <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  />
                  {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                </div>
                
                {/* Child Information */}
                <div className="sm:col-span-2 pt-3">
                  <h4 className="text-lg font-medium text-blue-800 mb-3">Student Information</h4>
                </div>
                
                <div>
                  <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">Child's Full Name *</label>
                  <input
                    type="text"
                    name="childName"
                    id="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${formErrors.childName ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  />
                  {formErrors.childName && <p className="mt-1 text-sm text-red-600">{formErrors.childName}</p>}
                </div>
                
                <div>
                  <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">Child's Age *</label>
                  <input
                    type="text"
                    name="childAge"
                    id="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${formErrors.childAge ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  />
                  {formErrors.childAge && <p className="mt-1 text-sm text-red-600">{formErrors.childAge}</p>}
                </div>
                
                <div>
                  <label htmlFor="desiredGrade" className="block text-sm font-medium text-gray-700 mb-1">Desired Grade/Class *</label>
                  <select
                    name="desiredGrade"
                    id="desiredGrade"
                    value={formData.desiredGrade}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${formErrors.desiredGrade ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select Grade/Class</option>
                    <option value="Nursery 1">Nursery 1</option>
                    <option value="Nursery 2">Nursery 2</option>
                    <option value="Primary 1">Primary 1</option>
                    <option value="Primary 2">Primary 2</option>
                    <option value="Primary 3">Primary 3</option>
                    <option value="Primary 4">Primary 4</option>
                    <option value="Primary 5">Primary 5</option>
                    <option value="Primary 6">Primary 6</option>
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="JSS 3">JSS 3</option>
                    <option value="SS 1">SS 1</option>
                    <option value="SS 2">SS 2</option>
                    <option value="SS 3">SS 3</option>
                  </select>
                  {formErrors.desiredGrade && <p className="mt-1 text-sm text-red-600">{formErrors.desiredGrade}</p>}
                </div>
                
                <div>
                  <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700 mb-1">Previous School (if any)</label>
                  <input
                    type="text"
                    name="previousSchool"
                    id="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="startTerm" className="block text-sm font-medium text-gray-700 mb-1">Preferred Start Term</label>
                  <select
                    name="startTerm"
                    id="startTerm"
                    value={formData.startTerm}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isSubmitting}
                  >
                    <option value="">Select Term</option>
                    <option value="First Term (September)">First Term (September)</option>
                    <option value="Second Term (January)">Second Term (January)</option>
                    <option value="Third Term (April)">Third Term (April)</option>
                  </select>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Please include any special requirements or questions you might have."
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <div className="sm:col-span-2 mt-4">
                  <div className="flex justify-end items-center space-x-3">
                    <button 
                      type="button" 
                      onClick={() => setShowApplicationForm(false)}
                      disabled={isSubmitting} 
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : "Submit Application"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="px-4 py-8 sm:px-6 bg-green-50 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-green-800">
                  Application Submitted Successfully!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-green-700">
                    Thank you for applying to Royal Mark Academy. Our admissions team will review your application and contact you shortly to discuss the next steps in the enrollment process.
                  </p>
                </div>
              </div>
            </div>
          )}  
        </div>
      </div>
    </div>
  ) : null;
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
              Admissions at Royal Mark Academy
            </h1>
            <p className="mt-3 text-xl text-blue-100 max-w-3xl mx-auto">
              Join our inclusive learning community where every student is empowered to excel academically and grow personally.
            </p>
            <div className="mt-8">
              <motion.button
                onClick={() => setShowApplicationForm(true)}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Start application process"
              >
                Apply Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Join Our School Community</h2>
          <p className="text-lg text-gray-700">
            Royal Mark Academy, established in October 2014, welcomes applications from students seeking a quality education at our campus located at Number 1 Elepa Road, Odeda, Abeokuta. Our admissions process is designed to identify students who will thrive in our rigorous academic environment and contribute to our vibrant community.  
          </p>
        </div>
      
        {/* Tabs Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-6 py-3 text-lg font-medium ${activeTab === 'requirements' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-600'}`}
          >
            <FaClipboardList className="inline mr-2" />
            Requirements
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-6 py-3 text-lg font-medium ${activeTab === 'process' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-600'}`}
          >
            <FaFileAlt className="inline mr-2" />
            Process
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-6 py-3 text-lg font-medium ${activeTab === 'fees' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-600'}`}
          >
            <FaUniversity className="inline mr-2" />
            Tuition & Fees
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-3 text-lg font-medium ${activeTab === 'faq' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-600'}`}
          >
            <FaCalendarAlt className="inline mr-2" />
            FAQs
          </button>
        </div>
      
        {/* Tab Content */}
        <div className="py-4">
          {/* Requirements Tab */}
          {activeTab === 'requirements' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Admission Requirements</h3>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaIdCard className="mr-2" /> Required Documents
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Completed application form</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Birth certificate or passport (for age verification)</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Academic records from previous school (last 2 years)</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Two recent passport-sized photographs</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Immunization records</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaUserGraduate className="mr-2" /> Academic Requirements
                </h4>
                <div className="space-y-4 text-gray-700">
                  <p>
                    All applicants must meet the following academic requirements to be considered for admission to Royal Mark Academy:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>Demonstrate age-appropriate academic proficiency</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>Successfully complete the entrance assessment (for Primary 2 and above)</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>Show readiness for our academic curriculum</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <motion.button
                  onClick={() => setShowApplicationForm(true)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Application <FaArrowRight className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Process Tab */}
          {activeTab === 'process' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Application Process</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <motion.div 
                      key={step.id}
                      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                      whileHover={{
                        y: -5,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      <div className="rounded-full bg-blue-100 p-3 mb-4">
                        <Icon className="h-8 w-8 text-blue-800" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-blue-800 text-white flex items-center justify-center mb-4">
                        {step.id}
                      </div>
                      <h4 className="text-xl font-semibold text-blue-800 mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaCalendarCheck className="mr-2" /> Key Application Dates
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Opens</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Deadline</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term Begins</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">First Term</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">August 15</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">September</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Second Term</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">October 1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">December 15</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">January</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Third Term</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">February 1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">March 15</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-4">* Applications are processed on a rolling basis. Early application is encouraged as spaces are limited.</p>
              </div>
              
              <div className="mt-6 flex justify-center">
                <motion.button
                  onClick={() => setShowApplicationForm(true)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Begin Application Process <FaArrowRight className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Fees Tab */}
          {activeTab === 'fees' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tuition & Fees</h3>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">2023-2024 Academic Year</h4>
                <p className="text-gray-700 mb-6">
                  Royal Mark Academy is committed to providing quality education at reasonable costs. Our fee structure is comprehensive and transparent.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuition (Per Term)</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Fee</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Development Fee</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nursery</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦45,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦10,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦15,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Primary</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦55,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦10,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦20,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Junior Secondary</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦65,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦15,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦25,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Senior Secondary</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦75,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦15,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦25,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <h5 className="text-lg font-medium text-gray-900 mb-3">Additional Fees:</h5>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>School Uniform: ₦15,000 - ₦25,000 (varies by grade level)</li>
                    <li>Books and Supplies: ₦10,000 - ₦20,000 (varies by grade level)</li>
                    <li>Transportation (optional): ₦15,000 - ₦30,000 per term (based on distance)</li>
                    <li>Extracurricular Activities: Varies by activity</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md mt-6">
                  <h5 className="text-lg font-medium text-blue-800 mb-2">Payment Information:</h5>
                  <p className="text-gray-700">
                    Fees can be paid in installments. A 5% discount is offered for full annual payment made before the start of the first term. Sibling discounts available for families with multiple children enrolled.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaGraduationCap className="mr-2" /> Scholarships & Financial Aid
                </h4>
                <p className="text-gray-700">
                  Royal Mark Academy is committed to making quality education accessible. We offer academic merit scholarships and need-based financial aid to qualified students. Please contact the admissions office for more information on our scholarship programs.
                </p>
              </div>
              
              <div className="mt-6 flex justify-center">
                <motion.a 
                  href="/fees-document.pdf" 
                  download
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload className="mr-2" /> Download Fee Structure
                </motion.a>
              </div>
            </motion.div>
          )}
          
          {/* FAQs Tab */}
          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden divide-y divide-gray-200">
                <div className="p-6">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">What is the application deadline?</h4>
                  <p className="text-gray-700">
                    Applications are accepted on a rolling basis throughout the year, but we recommend applying by our priority deadlines: August 15 for First Term, December 15 for Second Term, and March 15 for Third Term. Early application is encouraged as spaces fill quickly.
                  </p>
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">What age requirements do you have for admission?</h4>
                  <p className="text-gray-700">
                    For Nursery 1, children must be at least 3 years old by September 1st of the academic year. For other grades, appropriate age requirements apply. We assess each student individually to ensure proper grade placement.
                  </p>
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">Do you accept mid-year transfers?</h4>
                  <p className="text-gray-700">
                    Yes, we accept mid-year transfers subject to space availability and the student meeting our admission requirements. We work closely with families to ensure a smooth transition for transfer students.
                  </p>
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">How can I schedule a school tour?</h4>
                  <p className="text-gray-700">
                    We welcome prospective families to visit our campus at Number 1 Elepa Road, Odeda, Abeokuta. School tours can be scheduled by calling our admissions office or by filling out the tour request form on our website. Tours are typically conducted on weekdays between 9 AM and 2 PM.
                  </p>
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">What curriculum do you follow?</h4>
                  <p className="text-gray-700">
                    Royal Mark Academy follows the Nigerian National Curriculum enhanced with international best practices. Our curriculum is comprehensive and designed to develop critical thinking, creativity, and practical skills alongside academic excellence.
                  </p>
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">Are there transportation options available?</h4>
                  <p className="text-gray-700">
                    Yes, we offer school bus transportation services to various locations within Abeokuta. The fees vary depending on distance. Please contact the school office for specific routes and pricing information.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaUserFriends className="mr-2" /> Still Have Questions?
                </h4>
                <p className="text-gray-700 mb-4">
                  Our admissions team is here to help you with any questions you may have about Royal Mark Academy and the application process.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:+2348012345678" className="inline-flex items-center px-4 py-2 border border-blue-800 rounded-md text-base font-medium text-blue-800 hover:bg-blue-800 hover:text-white">
                    Call Us: +234 801 234 5678
                  </a>
                  <a href="mailto:admissions@royalmarkacademy.edu.ng" className="inline-flex items-center px-4 py-2 border border-blue-800 rounded-md text-base font-medium text-blue-800 hover:bg-blue-800 hover:text-white">
                    Email Admissions
                  </a>
                  <button 
                    onClick={() => setShowApplicationForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-800 hover:bg-blue-700"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Application Form Modal */}
      {applicationFormModal}
    </div>
  );
}

export default Admissions;
