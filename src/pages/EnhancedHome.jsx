import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaBookOpen, 
  FaFlask, 
  FaLaptopCode,
  FaStar,
  FaTrophy,
  FaHeart,
  FaCalendarAlt,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa';

const EnhancedHome = () => {
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: <FaUsers />, number: '1200+', label: 'Students', color: 'from-blue-500 to-blue-600' },
    { icon: <FaChalkboardTeacher />, number: '85+', label: 'Teachers', color: 'from-green-500 to-green-600' },
    { icon: <FaTrophy />, number: '50+', label: 'Awards', color: 'from-yellow-500 to-yellow-600' },
    { icon: <FaGraduationCap />, number: '98%', label: 'Graduation Rate', color: 'from-purple-500 to-purple-600' },
  ];

  const features = [
    {
      icon: <FaGraduationCap className="w-12 h-12" />,
      title: 'Academic Excellence',
      description: 'Our rigorous curriculum and dedicated faculty ensure students achieve outstanding academic results.',
      color: 'from-blue-500 to-blue-600',
      stats: '98% University Placement'
    },
    {
      icon: <FaFlask className="w-12 h-12" />,
      title: 'STEM Innovation',
      description: 'State-of-the-art science labs and technology integration prepare students for future careers.',
      color: 'from-green-500 to-green-600',
      stats: '12 Modern Labs'
    },
    {
      icon: <FaUsers className="w-12 h-12" />,
      title: 'Expert Faculty',
      description: 'Highly qualified teachers with advanced degrees and years of experience in education.',
      color: 'from-purple-500 to-purple-600',
      stats: '85+ Certified Teachers'
    },
    {
      icon: <FaLaptopCode className="w-12 h-12" />,
      title: 'Digital Learning',
      description: 'Cutting-edge technology integration in every classroom for enhanced learning experiences.',
      color: 'from-orange-500 to-orange-600',
      stats: '1:1 Device Ratio'
    },
    {
      icon: <FaBookOpen className="w-12 h-12" />,
      title: 'Rich Resources',
      description: 'Extensive library with 5000+ books, digital resources, and research materials.',
      color: 'from-red-500 to-red-600',
      stats: '5000+ Resources'
    },
    {
      icon: <FaHeart className="w-12 h-12" />,
      title: 'Holistic Care',
      description: 'Comprehensive support system focusing on academic, emotional, and social development.',
      color: 'from-pink-500 to-pink-600',
      stats: '24/7 Support'
    }
  ];

  const testimonials = [
    {
      name: 'Mrs. Adebayo',
      role: 'Parent of SS3 Student',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'Royal Mark Academy has transformed my daughter\'s life. The personalized attention and excellent teaching methods have brought out the best in her.',
      rating: 5
    },
    {
      name: 'Dr. Johnson',
      role: 'Parent of JSS2 Student',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'The facilities are world-class, and the dedication of the teachers is unmatched. My son has grown both academically and personally.',
      rating: 5
    },
    {
      name: 'Engr. Mohammed',
      role: 'Parent of SS1 Student',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'Choosing Royal Mark was the best decision for our family. The school truly lives up to its reputation for excellence.',
      rating: 5
    }
  ];

  const events = [
    {
      title: 'Open Day 2024',
      date: 'March 15, 2024',
      description: 'Experience our school environment and meet our dedicated faculty.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop'
    },
    {
      title: 'Science Fair',
      date: 'April 20, 2024',
      description: 'Showcasing innovative student projects and scientific discoveries.',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop'
    },
    {
      title: 'Cultural Day',
      date: 'May 25, 2024',
      description: 'Celebrating Nigeria\'s rich cultural heritage through performances.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=250&fit=crop'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section id="hero" data-section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Excellence in Education
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Nurturing future leaders with world-class education since 2014
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/admissions"
              className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold text-lg rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              Apply Now
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" data-section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={visibleSections.stats ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full text-white text-2xl mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={visibleSections.features ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Royal Mark Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide an exceptional learning environment that nurtures academic excellence and personal growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={visibleSections.features ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-sm font-semibold text-blue-600">{feature.stats}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" data-section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={visibleSections.testimonials ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Parents Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community about their experiences at Royal Mark Academy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={visibleSections.testimonials ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <FaQuoteLeft className="w-8 h-8 text-blue-200 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" data-section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={visibleSections.events ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for exciting events and activities throughout the year
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={visibleSections.events ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-blue-600 mb-2">
                    <FaCalendarAlt className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <Link
                    to="/news-events"
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" data-section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={visibleSections.cta ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Royal Mark Family?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Give your child the gift of quality education. Join thousands of satisfied parents who have chosen excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold text-lg rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                Start Application
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300"
              >
                Schedule Visit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHome;
