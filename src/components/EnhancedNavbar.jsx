import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiSearch, FiUser } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

const EnhancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    {
      name: 'About',
      path: '/about',
      icon: '🏫',
      dropdown: [
        { name: 'Our History', path: '/about#history', icon: '📜' },
        { name: 'Leadership Team', path: '/about#team', icon: '👥' },
        { name: 'Mission & Vision', path: '/about#mission', icon: '🎯' },
        { name: 'Values', path: '/about#values', icon: '💎' },
      ],
    },
    {
      name: 'Academics',
      path: '/academics',
      icon: '📚',
      dropdown: [
        { name: 'Curriculum', path: '/academics#curriculum', icon: '📖' },
        { name: 'Departments', path: '/academics#departments', icon: '🔬' },
        { name: 'Academic Calendar', path: '/academics#calendar', icon: '📅' },
        { name: 'Exam Results', path: '/academics#results', icon: '📊' },
      ],
    },
    {
      name: 'Admissions',
      path: '/admissions',
      icon: '📝',
      dropdown: [
        { name: 'How to Apply', path: '/admissions#apply', icon: '🚀' },
        { name: 'Requirements', path: '/admissions#requirements', icon: '✓' },
        { name: 'Fees & Payment', path: '/admissions#fees', icon: '💰' },
        { name: 'Scholarships', path: '/admissions#scholarships', icon: '🎓' },
      ],
    },
    { name: 'Facilities', path: '/facilities', icon: '🏗️' },
    { name: 'News & Events', path: '/news-events', icon: '📰' },
    { name: 'Gallery', path: '/gallery', icon: '🖼️' },
    { name: 'Contact', path: '/contact', icon: '📞' },
  ];

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Bar with Quick Access */}
      <div className="bg-blue-900 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <span className="mr-2">📧</span>
              info@royalmarkacademy.com
            </span>
            <span className="flex items-center">
              <span className="mr-2">📞</span>
              +234 123 456 7890
            </span>
            <span className="flex items-center">
              <span className="mr-2">📍</span>
              Elepa Road, Odeda, Abeokuta
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1 hover:text-yellow-400 transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-4 h-4" />
            </button>
            <Link
              to="/student"
              className="flex items-center space-x-1 hover:text-yellow-400 transition-colors"
            >
              <FiUser className="w-4 h-4" />
              <span>Student Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onClick={closeDropdowns}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center"
              >
                <FaGraduationCap className="text-white text-xl" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">Royal Mark</h1>
                <p className="text-sm text-blue-700">Academy</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <div key={link.name} className="relative">
                  {link.dropdown ? (
                    <div
                      onMouseEnter={() => handleDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
                          location.pathname === link.path || activeDropdown === index
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                        <FiChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                onClick={closeDropdowns}
                              >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
                          isActive
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`
                      }
                      onClick={closeDropdowns}
                    >
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/admissions"
                className="px-4 py-2 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdown(index)}
                          className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <span className="flex items-center space-x-2">
                            <span>{link.icon}</span>
                            <span>{link.name}</span>
                          </span>
                          <FiChevronDown
                            className={`w-4 h-4 transition-transform ${
                              activeDropdown === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-8 space-y-1"
                            >
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                                  onClick={closeDropdowns}
                                >
                                  <span className="flex items-center space-x-2">
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `block px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? 'text-blue-600 bg-blue-50 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`
                        }
                        onClick={closeDropdowns}
                      >
                        <span className="flex items-center space-x-2">
                          <span>{link.icon}</span>
                          <span>{link.name}</span>
                        </span>
                      </NavLink>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <Link
                    to="/admissions"
                    className="block w-full px-4 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors text-center"
                    onClick={closeDropdowns}
                  >
                    Apply Now
                  </Link>
                  <Link
                    to="/contact"
                    className="block w-full px-4 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center"
                    onClick={closeDropdowns}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              ref={searchRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <FiSearch className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for pages, news, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-lg"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Press ESC to close or start typing to search...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedNavbar;
