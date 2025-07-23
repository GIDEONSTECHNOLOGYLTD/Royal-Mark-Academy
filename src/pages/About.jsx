import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaBook, FaStar, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

export default function About() {
  const [activeTab, setActiveTab] = useState('history');
  
  // Actual school photos using real images from the project
  const schoolPhotos = [
    {
      src: "/images/school-building.jpg",
      caption: "Royal Mark Academy - Main Building"
    },
    {
      src: "/images/campus/classroom.jpg",
      caption: "Modern Classroom Facilities"
    },
    {
      src: "/images/campus/library.jpg",
      caption: "Library & Resource Center"
    },
    {
      src: "/images/school-building.jpg", // Using main building again as fourth image
      caption: "School Campus Overview"
    }
  ];
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logo */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo and Title Section */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8">
            <motion.div
              className="mb-6 md:mb-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0], transition: { duration: 0.5 } }}
            >
              <img 
                src="/images/school-logo.svg" 
                alt="Royal Mark Academy Logo" 
                className="h-32 md:h-40 filter drop-shadow-lg" 
              />
            </motion.div>
            
            <motion.div className="text-center md:text-right md:max-w-xl">
              <motion.div 
                className="inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">
                  About <span className="text-yellow-500">Royal Mark</span>
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-3">
                  Academy
                </h2>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center md:justify-end mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className="h-1 w-10 bg-blue-700 rounded-full"></div>
                <div className="h-1 w-20 bg-yellow-500 rounded-full mx-2"></div>
                <div className="h-1 w-10 bg-blue-700 rounded-full"></div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Mission Statement */}
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border-l-4 border-yellow-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
          >
            <p className="text-lg text-gray-700 max-w-3xl mx-auto italic text-center">
              Royal Mark Academy is a premier educational institution dedicated to fostering academic excellence, 
              character development, and lifelong learning in a nurturing environment.
            </p>
          </motion.div>
        </motion.div>
        
        {/* School Info Summary */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-500 opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
            
            <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-2xl shadow-xl overflow-hidden p-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100">
                <motion.div 
                  className="bg-white p-6 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: "rgba(239, 246, 255, 0.7)",
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" 
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-xl shadow-md mr-4 transform transition-transform duration-200 group-hover:rotate-6">
                    <FaCalendarAlt className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1 text-lg">Established</h3>
                    <p className="text-gray-700 font-medium">October 5, 2014</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: "rgba(239, 246, 255, 0.7)",
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" 
                  }}
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-4 rounded-xl shadow-md mr-4">
                    <FaMapMarkerAlt className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1 text-lg">Location</h3>
                    <p className="text-gray-700 font-medium">Number 1 Elepa Road, Odeda, Abeokuta</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: "rgba(239, 246, 255, 0.7)",
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" 
                  }}
                >
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-xl shadow-md mr-4">
                    <FaUsers className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1 text-lg">Student Body</h3>
                    <p className="text-gray-700 font-medium">Over 500 students</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Logo and Principal's Welcome */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1 flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-blue-100 shadow-xl mb-4 bg-white flex items-center justify-center">
              <img 
                src="/images/royal-mark-logo.png" 
                alt="Royal Mark Academy Logo" 
                className="w-36 h-36 object-contain" 
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-800">Citadel of Excellence</h2>
              <p className="text-gray-600 italic">Our school motto</p>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 relative">
            <FaQuoteLeft className="text-blue-100 text-4xl absolute top-4 left-4" />
            <div className="px-8 py-4">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Principal's Welcome</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Royal Mark Academy! We are committed to providing a nurturing environment where every student is empowered to reach their full potential. Our unique structure encodes values and principles that foster growth and development for each child.
              </p>
              <p className="text-gray-700 mb-4">
                Since our establishment in 2014, we have remained dedicated to academic excellence while ensuring character development. Our dedicated staff, innovative programs, and strong community support make our school a place of excellence in Ogun State and beyond.
              </p>
              <div className="flex items-center mt-6">
                <div className="w-16 h-16 bg-blue-200 rounded-full mr-4 flex items-center justify-center text-xl font-bold text-blue-800">AO</div>
                <div>
                  <p className="font-semibold text-blue-900">Mrs. Adeola Ogunleye</p>
                  <p className="text-blue-700">Principal</p>
                </div>
              </div>
            </div>
            <FaQuoteRight className="text-blue-100 text-4xl absolute bottom-4 right-4" />
          </div>
        </div>
        
        {/* Tab Navigation */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Discover <span className="text-yellow-500">Our Story</span></h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-xl shadow-lg mb-2">
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <motion.button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${activeTab === 'history' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white text-blue-800 hover:text-blue-600 shadow-md'}`}
                whileHover={activeTab !== 'history' ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <FaBook className={`mr-2 ${activeTab === 'history' ? 'text-yellow-300' : 'text-blue-500'}`} />
                  Our History
                </div>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('vision')}
                className={`px-6 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${activeTab === 'vision' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white text-blue-800 hover:text-blue-600 shadow-md'}`}
                whileHover={activeTab !== 'vision' ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <FaStar className={`mr-2 ${activeTab === 'vision' ? 'text-yellow-300' : 'text-blue-500'}`} />
                  Vision & Mission
                </div>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('values')}
                className={`px-6 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${activeTab === 'values' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white text-blue-800 hover:text-blue-600 shadow-md'}`}
                whileHover={activeTab !== 'values' ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <FaGraduationCap className={`mr-2 ${activeTab === 'values' ? 'text-yellow-300' : 'text-blue-500'}`} />
                  Our Values
                </div>
              </motion.button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-sm bg-opacity-95 relative overflow-hidden">  
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-yellow-400 opacity-5 rounded-full blur-3xl"></div>
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-blue-800 mb-4"
                  initial={{ y: -5 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Our Journey
                </motion.h3>
                <motion.p 
                  className="text-gray-700 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Royal Mark Academy was established on October 5, 2014 with a vision to provide quality education to children in Odeda and surrounding communities. Starting with just two classrooms and a handful of dedicated teachers, our school has grown steadily over the years.
                </motion.p>
                <motion.p 
                  className="text-gray-700 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Located at Number 1 Elepa Road in Odeda, Abeokuta, our campus has expanded to include modern facilities, science laboratories, a library, and sports amenities. What began as a small primary school has evolved into a comprehensive educational institution serving both primary and secondary students.
                </motion.p>
                <motion.p 
                  className="text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Throughout our growth, we have maintained our commitment to academic excellence, moral integrity, and community service. Our graduates have gone on to excel in various fields, carrying the values instilled in them at Royal Mark Academy wherever they go.
                </motion.p>
              </motion.div>
            )}
            
            {activeTab === 'vision' && (
              <motion.div 
                className="grid md:grid-cols-2 gap-8"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div 
                    className="flex items-start mb-4"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaBook className="text-blue-700 text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800">Our Vision</h3>
                  </motion.div>
                  <motion.p 
                    className="text-gray-700 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    To be a leading institution recognized for excellence in teaching, learning, and character building, producing future leaders for Nigeria and the world.
                  </motion.p>
                  <motion.p 
                    className="text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    We envision a school where every child discovers their unique talents and abilities, and is empowered to pursue their dreams with confidence, knowledge, and integrity.
                  </motion.p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.div 
                    className="flex items-start mb-4"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <FaStar className="text-yellow-600 text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800">Our Mission</h3>
                  </motion.div>
                  <motion.p 
                    className="text-gray-700 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Empowering students to achieve their potential, contribute to society, and become responsible citizens through innovative teaching, holistic development, and strong values.
                  </motion.p>
                  <motion.p 
                    className="text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    We are committed to providing a safe, nurturing, and intellectually stimulating environment where students develop critical thinking skills, creativity, and moral character essential for lifelong success.
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
            
            {activeTab === 'values' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-blue-800 mb-6"
                  initial={{ y: -5 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Our Core Values
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <motion.div 
                    className="bg-blue-50 rounded-lg p-5 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">Excellence</h4>
                    <p className="text-gray-700">
                      We strive for the highest standards in all endeavors, encouraging our students to pursue excellence in academics, character, and service.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-blue-50 rounded-lg p-5 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">Integrity</h4>
                    <p className="text-gray-700">
                      We promote honesty, ethical behavior, and accountability in all aspects of school life, teaching students to always do what is right.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-blue-50 rounded-lg p-5 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">Respect</h4>
                    <p className="text-gray-700">
                      We foster mutual respect among students, staff, and the community, celebrating diversity and treating everyone with dignity.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-blue-50 rounded-lg p-5 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">Innovation</h4>
                    <p className="text-gray-700">
                      We embrace creative thinking and innovative approaches to education, preparing students for the challenges of a rapidly changing world.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-blue-50 rounded-lg p-5 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">Discipline</h4>
                    <p className="text-gray-700">
                      We instill self-discipline and responsibility, guiding students to make positive choices and take ownership of their actions.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-blue-50 rounded-lg p-5 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">Teamwork</h4>
                    <p className="text-gray-700">
                      We value collaboration and teamwork, teaching students to work effectively with others and appreciate diverse perspectives.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Leadership Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Leadership & Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg shadow p-4 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-200 rounded-full mb-2 flex items-center justify-center text-2xl font-bold text-blue-800">AO</div>
              <span className="font-semibold text-blue-900">Mrs. Adeola Ogunleye</span>
              <span className="text-blue-700 text-sm">Principal</span>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-4 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-200 rounded-full mb-2 flex items-center justify-center text-2xl font-bold text-blue-800">JK</div>
              <span className="font-semibold text-blue-900">Mr. John Kolawole</span>
              <span className="text-blue-700 text-sm">Vice Principal</span>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-4 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-200 rounded-full mb-2 flex items-center justify-center text-2xl font-bold text-blue-800">SA</div>
              <span className="font-semibold text-blue-900">Ms. Sarah Adeyemi</span>
              <span className="text-blue-700 text-sm">Head Teacher</span>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-4 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-200 rounded-full mb-2 flex items-center justify-center text-2xl font-bold text-blue-800">OA</div>
              <span className="font-semibold text-blue-900">Mr. Oluwaseun Adeleke</span>
              <span className="text-blue-700 text-sm">Admin Manager</span>
            </div>
          </div>
        </div>
        
        {/* Photos Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <div className="absolute -top-10 left-10 w-32 h-32 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 relative">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">Campus <span className="text-yellow-500">Life</span></h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                </div>
                
                <p className="text-gray-600 mt-4 md:mt-0 md:max-w-md">
                  Experience the vibrant environment of Royal Mark Academy through our modern facilities and student activities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {schoolPhotos.map((photo, index) => (
                  <motion.div 
                    key={index}
                    className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02, 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src={photo.src} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-medium text-lg">{photo.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Facilities Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <div className="absolute -top-10 right-10 w-40 h-40 bg-indigo-500 opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-500 opacity-5 rounded-full blur-3xl"></div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 relative">
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-blue-900 mb-2">World-Class <span className="text-yellow-500">Facilities</span></h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                  </div>
                  
                  <p className="text-gray-700 mt-4 md:mt-0 md:max-w-md">
                    At Royal Mark Academy, we understand that a well-maintained learning environment is crucial for student success. 
                    Our facilities are regularly updated to ensure they meet the highest standards.
                  </p>
                </div>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)" 
                  }}
                >
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-300"></div>
                  <div className="p-6">
                    <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transform transition-all duration-300 group-hover:shadow-lg">
                      <FaChalkboardTeacher className="text-blue-700 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-600">Modern Classrooms</h3>
                    <p className="text-gray-700">Spacious, well-lit classrooms equipped with educational technology to enhance the learning experience.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)" 
                  }}
                >
                  <div className="h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-300"></div>
                  <div className="p-6">
                    <div className="bg-indigo-50 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transform transition-all duration-300 group-hover:shadow-lg">
                      <FaBook className="text-indigo-700 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-600">Modern Library</h3>
                    <p className="text-gray-700">A well-stocked library with a diverse collection of books, journals, and digital resources for research and learning.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)" 
                  }}
                >
                  <div className="h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300"></div>
                  <div className="p-6">
                    <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transform transition-all duration-300 group-hover:shadow-lg">
                      <FaGraduationCap className="text-yellow-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-600">Science Labs</h3>
                    <p className="text-gray-700">Fully equipped science laboratories for hands-on learning and practical experiments to foster scientific inquiry.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
