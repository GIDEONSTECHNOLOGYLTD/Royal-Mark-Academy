import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { sendContactMessage } from '../utils/api';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const [formErrors, setFormErrors] = useState({});

  function validateForm() {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setSubmitError("");
      
      // Send message to the backend API using utility
      sendContactMessage(formData)
      .then(data => {
        if (data.success) {
          setIsSubmitting(false);
          setFormErrors({});
          setSubmitted(true);
          console.log("Form submitted successfully:", formData);
          
          setTimeout(() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: ""
            });
          }, 4000);
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setIsSubmitting(false);
        setSubmitError(error.message || "Failed to send message. Please try again later.");
      });
    } else {
      setFormErrors(errors);
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Contact <span className="text-yellow-500">Us</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out for inquiries, admissions information, 
            or visit us at our campus to see our facilities firsthand.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">Contact Information</h2>
                <p className="text-blue-100">Reach out to us through any of these channels</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-blue-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Our Address</h3>
                    <p className="text-gray-600 mt-1">Number 1 Elepa Road, Odeda, Abeokuta, Ogun State, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaPhone className="text-blue-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600 mt-1">+234 803 456 7890</p>
                    <p className="text-gray-600">+234 905 678 1234</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-blue-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600 mt-1">info@royalmarkacademy.ng</p>
                    <p className="text-gray-600">admissions@royalmarkacademy.ng</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaClock className="text-blue-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Office Hours</h3>
                    <p className="text-gray-600 mt-1">Monday - Friday: 7:30 AM - 4:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 12:00 PM (Admin only)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaCalendarAlt className="text-blue-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Founded</h3>
                    <p className="text-gray-600 mt-1">Established on October 5, 2014</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="md:col-span-2 relative">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 p-6 border-b">Send us a Message</h2>
              
              {/* Form */}
              {submitted ? (
                <div className="p-8 text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting Royal Mark Academy. We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form className="p-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full py-2 px-4 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                      disabled={isSubmitting}
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full py-2 px-4 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      disabled={isSubmitting}
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full py-2 px-4 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${formErrors.subject ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  />
                  {formErrors.subject && <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>}
                </div>
                
                <div className="mt-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full py-2 px-4 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  ></textarea>
                  {formErrors.message && <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>}
                </div>
                
                {submitError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}
                
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : "Send Message"}
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 p-6 border-b">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title="Royal Mark Academy Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.0213563971996!2d3.3309383!3d7.140077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103976a097f4532f%3A0x8f27a8f2c71cff19!2sOdeda%2C%20Abeokuta!5e0!3m2!1sen!2sng!4v1626953478251!5m2!1sen!2sng"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Our Campus</h3>
              <p className="text-gray-600">
                We welcome prospective parents and students to visit our campus during office hours. 
                Please call ahead to schedule a tour so we can ensure someone is available to show you around.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How can I apply for admission?</h3>
              <p className="mt-2 text-gray-600">You can download our application form from the Admissions page or visit our campus to pick up a physical copy. Complete the form and return it with all required documents.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">What are the school hours?</h3>
              <p className="mt-2 text-gray-600">Our academic day runs from 8:00 AM to 2:30 PM for primary school and 8:00 AM to 3:30 PM for secondary school, Monday through Friday.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Do you offer transportation services?</h3>
              <p className="mt-2 text-gray-600">Yes, we offer school bus services for students living within a 15km radius of the school. Additional fees apply based on distance.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How can I make fee payments?</h3>
              <p className="mt-2 text-gray-600">Payments can be made directly to our bank account or at the school's finance office. We also accept online transfers and mobile payments.</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-700 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Join the Royal Mark Academy Family?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Take the first step towards providing your child with a quality education that nurtures academic excellence and character development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/admissions" 
              className="px-6 py-3 bg-yellow-500 text-blue-900 font-medium rounded-lg hover:bg-yellow-400 transition duration-300"
            >
              Apply Now
            </a>
            <a 
              href="tel:+2348034567890" 
              className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
