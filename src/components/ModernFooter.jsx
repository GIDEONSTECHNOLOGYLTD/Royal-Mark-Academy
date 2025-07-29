import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const ModernFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'News & Events', path: '/news-events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const academicLinks = [
    { name: 'Curriculum', path: '/academics#curriculum' },
    { name: 'Departments', path: '/academics#departments' },
    { name: 'Academic Calendar', path: '/academics#calendar' },
    { name: 'Exam Results', path: '/academics#results' },
    { name: 'Student Portal', path: '/student' },
  ];

  // Using this in the Admission section below
  const admissionLinks = [
    { name: 'How to Apply', path: '/admissions#apply' },
    { name: 'Requirements', path: '/admissions#requirements' },
    { name: 'School Fees', path: '/admissions#fees' },
    { name: 'Scholarships', path: '/admissions#scholarships' },
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: 'Number 1, Elepa Road, Odeda, Abeokuta, Ogun State', href: 'https://maps.google.com' },
    { icon: <FaPhone />, text: '+234 803 123 4567', href: 'tel:+2348031234567' },
    { icon: <FaEnvelope />, text: 'info@royalmarkacademy.com', href: 'mailto:info@royalmarkacademy.com' },
    { icon: <FaClock />, text: 'Mon - Fri: 7:30 AM - 4:00 PM', href: null },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: 'https://facebook.com/royalmarkacademy', color: 'hover:bg-blue-600' },
    { icon: <FaTwitter />, href: 'https://twitter.com/royalmarkacademy', color: 'hover:bg-blue-400' },
    { icon: <FaInstagram />, href: 'https://instagram.com/royalmarkacademy', color: 'hover:bg-pink-600' },
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com/company/royalmarkacademy', color: 'hover:bg-blue-700' },
    { icon: <FaYoutube />, href: 'https://youtube.com/royalmarkacademy', color: 'hover:bg-red-600' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/2348031234567', color: 'hover:bg-green-600' },
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      {/* Newsletter Section */}
      <div className="bg-yellow-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 lg:mb-0"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                Stay Updated with Royal Mark Academy
              </h3>
              <p className="text-blue-800">
                Get the latest news, events, and educational insights delivered to your inbox
              </p>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubscribe}
              className="flex items-center space-x-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-4 py-3 rounded-lg text-gray-900 w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
              >
                <span>Subscribe</span>
                <FiSend />
              </motion.button>
            </motion.form>
          </div>
          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-blue-900 font-semibold"
            >
              Thank you for subscribing! We'll keep you updated.
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <FaGraduationCap className="text-blue-900 text-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Royal Mark Academy</h3>
                  <p className="text-sm text-gray-300">Excellence in Education</p>
                </div>
              </Link>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Royal Mark Academy is a premier educational institution dedicated to fostering academic excellence, 
                character development, and lifelong learning in a nurturing environment.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center ${social.color} transition-all duration-300`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Academic Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Academics</h4>
              <ul className="space-y-2">
                {academicLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Admissions Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Admissions</h4>
              <ul className="space-y-2">
                {admissionLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact Us</h4>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <span className="text-yellow-400 mt-1">{info.icon}</span>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-300">{info.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-950 py-6 border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © {new Date().getFullYear()} Royal Mark Academy. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex space-x-6 text-sm"
            >
              <Link to="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Sitemap
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
