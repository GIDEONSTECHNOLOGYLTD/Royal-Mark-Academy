import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  // Throttle scroll handler for better performance
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  // Debounce scroll event for better performance
  useEffect(() => {
    const throttledScroll = () => {
      let ticking = false;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    
    // Add when mounted
    document.addEventListener('mousedown', handleClickOutside);
    // Clean up
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchRef]);

  // Handle keyboard navigation for accessibility
  const closeDropdowns = useCallback(() => {
    setActiveDropdown(null);
    setIsOpen(false);
    setSearchOpen(false);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeDropdowns();
      } else if (e.key === 'Tab' && searchOpen && searchRef.current && !searchRef.current.contains(e.target)) {
        closeDropdowns();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, closeDropdowns]);

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

  const handleDropdown = useCallback((index) => {
    setActiveDropdown(prev => prev === index ? null : index);
  }, []);

  return (
    <>
      {/* Top Bar with Quick Access - Hidden on mobile for better UX */}
      <div className="hidden md:block bg-blue-900 text-white text-sm py-2 px-4">
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
      <nav
        aria-label="Main navigation"
        className={`sticky top-0 z-50 transition-all duration-300 slide-in-animation ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onClick={closeDropdowns}
            >
              <div
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center hover:rotate-logo"
                style={{ transition: 'transform 0.5s ease' }}
              >
                <FaGraduationCap className="text-white text-xl" />
              </div>
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
                      {activeDropdown === index && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 fade-in">
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
                        </div>
                      )}
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
                className="px-4 py-2 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                aria-label="Apply for admissions"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Contact us"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                if (isOpen) {
                  setSearchOpen(false);
                }
              }}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden bg-white border-t border-gray-100 fade-in"
          id="mobile-menu"
          role="region"
          aria-label="Mobile menu"
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
                    {activeDropdown === index && (
                      <div className="pl-8 space-y-1 slide-in-animation">
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
                      </div>
                    )}
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
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <div
            ref={searchRef}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl slide-in-animation"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4" role="search">
              <label htmlFor="search-input" className="sr-only">Search</label>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for pages, news, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  autoComplete="off"
                  autoFocus
                  aria-describedby="search-help"
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                aria-label="Close search"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div id="search-help" className="text-sm text-gray-500 mb-2">
              Press Enter to search or ESC to close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedNavbar;
