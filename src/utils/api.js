/**
 * API utility to handle backend requests with automatic dev/prod URL selection
 */

const API_BASE_URL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:3000/api' 
  : '/api';

/**
 * Send a contact form message
 * @param {Object} contactData - Contact form data
 * @returns {Promise} - Response from the API
 */
export const sendContactMessage = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};

/**
 * Submit an admissions application
 * @param {Object} applicationData - Application form data
 * @returns {Promise} - Response from the API
 */
export const submitApplication = async (applicationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};
