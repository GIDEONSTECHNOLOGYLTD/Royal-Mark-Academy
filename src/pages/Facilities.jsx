// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const facilities = [
  {
    title: "Modern Classrooms",
    description: "Well-ventilated, technology-equipped learning spaces with natural lighting and ergonomic furniture.",
    icon: "🏫"
  },
  {
    title: "Science & Computer Labs",
    description: "Fully equipped laboratories for practical learning in sciences and technology.",
    icon: "🔬"
  },
  {
    title: "Library & Resource Center",
    description: "Extensive collection of books and digital resources in a conducive learning environment.",
    icon: "📚"
  },
  {
    title: "Sports Facilities",
    description: "Playing fields and courts for various sports and physical education.",
    icon: "⚽"
  },
  {
    title: "Health & Safety",
    description: "Regular maintenance, clean water supply, and first-aid facilities.",
    icon: "🏥"
  },
  {
    title: "Smart Technology",
    description: "Digital classrooms and high-speed internet access for enhanced learning.",
    icon: "💻"
  }
];

export default function Facilities() {
  const [activeImage, setActiveImage] = useState(null);
  
  // Facility images mapping
  const facilityImages = {
    "Modern Classrooms": "/images/campus/classroom.jpg",
    "Library & Resource Center": "/images/campus/library.jpg",
    "Science & Computer Labs": "/images/campus/classroom.jpg", // Using classroom image as placeholder
    "Sports Facilities": "/images/school-building.jpg", // Using school building as placeholder
    "Health & Safety": "/images/school-building.jpg", // Using school building as placeholder
    "Smart Technology": "/images/campus/library.jpg", // Using library image as placeholder
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section with School Building */}
      <div className="relative overflow-hidden rounded-3xl mb-16 max-w-7xl mx-auto shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 mix-blend-multiply"></div>
        <div className="relative h-96 overflow-hidden">
          <img 
            src="/images/school-building.jpg" 
            alt="Royal Mark Academy Building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg max-w-3xl">
              World-Class Facilities
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 max-w-2xl text-center">
              Established in 2014 at Number 1 Elepa Road, Odeda, Abeokuta, our campus provides a premium learning environment designed for academic excellence.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Watermark logo */}
        <div className="absolute opacity-5 pointer-events-none">
          <img src="/images/royal-mark-logo.png" alt="" className="w-96 h-96 object-contain" />
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover="hover"
              onClick={() => setActiveImage(facility.title)}
              className="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent z-10"></div>
                <img 
                  src={facilityImages[facility.title] || "/images/school-building.jpg"} 
                  alt={facility.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white z-20">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-2xl mb-2 shadow-lg">
                    {facility.icon}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {facility.title}
                </h3>
                <p className="text-gray-700">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for enlarged image view */}
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setActiveImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center z-10 hover:bg-black transition-colors"
              >
                ×
              </button>
              <img 
                src={facilityImages[activeImage] || "/images/school-building.jpg"} 
                alt={activeImage} 
                className="w-full h-auto"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{activeImage}</h3>
                <p className="text-gray-700">
                  {facilities.find(f => f.title === activeImage)?.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Standards Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl border border-blue-100">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl mr-6 shadow-lg">
              ✓
            </div>
            <h2 className="text-3xl font-bold text-blue-900">Our Maintenance Standards</h2>
          </div>
          
          <p className="text-gray-700 mb-6 text-lg">
            At Royal Mark Academy, established in 2014, we take pride in maintaining our facilities to the highest standards. 
            Our dedicated maintenance team ensures our campus at Number 1 Elepa Road, Odeda, Abeokuta remains a premium 
            educational environment year-round.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Regular safety inspections and maintenance of all facilities",
              "Clean and hygienic learning environments",
              "Modern, energy-efficient systems",
              "Accessible facilities for all students",
              "Continuous upgrades to meet educational needs",
              "24/7 campus security for student safety"
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start">
                <div className="mt-1.5 mr-3 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>
                <p className="text-gray-800">{item}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <img src="/images/royal-mark-logo.png" alt="Royal Mark Academy" className="h-20 mx-auto mb-2 opacity-40" />
            <p className="text-sm text-gray-500 italic">Excellence in education since 2014</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
