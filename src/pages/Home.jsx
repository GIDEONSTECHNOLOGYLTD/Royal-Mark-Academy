import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { FaGraduationCap, FaFlask, FaUsers, FaLaptopCode, FaChalkboardTeacher, FaBookOpen, FaChevronRight } from 'react-icons/fa';
import "../styles/animations.css";

// Hero carousel images with optimized paths and fallback images
const heroImages = [
  {
    id: 1,
    title: "Excellence in Education",
    subtitle: "Nurturing future leaders at Royal Mark Academy since 2014",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    cta: "Discover Our Programs",
    ctaLink: "/academics"
  },
  {
    id: 2,
    title: "Modern Learning Environment",
    subtitle: "State-of-the-art facilities at Number 1 Elepa Road, Odeda, Abeokuta",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    cta: "View Our Facilities",
    ctaLink: "/facilities"
  },
  {
    id: 3,
    title: "Holistic Development",
    subtitle: "Education that nurtures mind, body, and character",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    cta: "Learn About Our Approach",
    ctaLink: "/about"
  }
];

const features = [
  {
    icon: <FaGraduationCap className="h-12 w-12 text-blue-600 group-hover:text-yellow-500 transition-colors duration-300" />,
    title: "Academic Excellence",
    description: "Our students consistently achieve outstanding academic results with impressive university placement rates nationwide.",
    link: "/academics",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: <FaFlask className="h-12 w-12 text-blue-600 group-hover:text-yellow-500 transition-colors duration-300" />,
    title: "STEM Focus",
    description: "Comprehensive programs in Science, Technology, Engineering, and Mathematics that prepare students for future careers.",
    link: "/academics#stem",
    color: "from-indigo-500 to-purple-600"
  },
  {
    icon: <FaUsers className="h-12 w-12 text-blue-600 group-hover:text-yellow-500 transition-colors duration-300" />,
    title: "Experienced Faculty",
    description: "Our teachers hold advanced degrees and bring years of classroom experience to nurture each student's potential.",
    link: "/about#faculty",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: <FaChalkboardTeacher className="h-12 w-12 text-blue-600 group-hover:text-yellow-500 transition-colors duration-300" />,
    title: "Small Class Sizes",
    description: "We maintain small teacher-to-student ratios to ensure personalized attention for every student.",
    link: "/academics#approach",
    color: "from-pink-500 to-red-600"
  },
  {
    icon: <FaLaptopCode className="h-12 w-12 text-blue-600 group-hover:text-yellow-500 transition-colors duration-300" />,
    title: "Technology Integration",
    description: "State-of-the-art technology in every classroom enhances the learning experience for all students.",
    link: "/facilities#technology",
    color: "from-red-500 to-yellow-600"
  },
  {
    icon: <FaBookOpen className="h-12 w-12 text-blue-600 group-hover:text-yellow-500 transition-colors duration-300" />,
    title: "Modern Library",
    description: "Our extensive collection of books, journals, and digital resources supports research and independent learning.",
    link: "/facilities#library",
    color: "from-yellow-500 to-green-600"
  }
];

// Improved floating elements component for background decoration
const FloatingElements = () => {
  const elements = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 15 + 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.3 + 0.05,
    shape: Math.random() > 0.7 ? 'circle' : Math.random() > 0.5 ? 'square' : 'triangle',
    color: Math.random() > 0.7 ? 'bg-blue-200' : Math.random() > 0.5 ? 'bg-yellow-200' : Math.random() > 0.3 ? 'bg-indigo-200' : 'bg-white'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className={`absolute ${el.shape === 'circle' ? 'rounded-full' : el.shape === 'square' ? 'rotate-45' : 'triangle'} ${el.color}`}
          style={{
            width: `${el.size}px`,
            height: `${el.size}px`,
            top: el.top,
            left: el.left,
            opacity: el.opacity,
            animation: `float ${el.animationDuration} ease-in-out ${el.animationDelay} infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeState, setFadeState] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const missionRef = useRef(null);

  // Handle mouse move for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 2 - clientX) / 50;
    const y = (window.innerHeight / 2 - clientY) / 50;
    setMousePosition({ x, y });
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        setFadeState(true);
      }, 1000);
    }, 6000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Rissed En Place inspired */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out z-0" 
          style={{ 
            backgroundImage: `url(${heroImages[currentSlide].image})`,
            opacity: fadeState ? 1 : 0
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/70 to-black/40 z-10"></div>
        <div className="container mx-auto px-6 relative z-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block rounded px-4 py-1 border border-blue-300/30 bg-blue-900/30 backdrop-blur-sm text-blue-100 mb-6 animate-fadeIn">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              <span>Providing Excellence in Education Since 2014</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              <span className="block mb-2">{heroImages[currentSlide].title}</span>
              <span className="block text-yellow-400">Royal Mark Academy</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              {heroImages[currentSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={heroImages[currentSlide].ctaLink} className="inline-flex items-center bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {heroImages[currentSlide].cta}
                <FaChevronRight className="ml-2" />
              </Link>
              <button 
                onClick={() => missionRef.current.scrollIntoView({behavior: 'smooth'})} 
                className="inline-flex items-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium rounded-lg px-8 py-4 transition-all duration-300"
              >
                Our Mission
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section - Inspired by Rissed En Place */}
      <section ref={missionRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Text Content */}
              <div className="lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className="block text-blue-900">VISION</span>
                  <span className="block text-blue-900 relative mt-2 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-blue-900">
                    "To raise a generation prepared for the Lord"
                  </span>
                </h2>
                
                <h2 className="text-3xl sm:text-4xl font-bold mt-12 mb-6">
                  <span className="block text-blue-900">MISSION</span>
                </h2>
                
                <p className="text-gray-700 text-lg">
                  "To establish an ideal comprehensive secondary school that produces well rounded and independent citizens through a broad-based functional education at affordable cost"
                </p>
              </div>
              
              {/* Visual Element */}
              <div className="lg:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute w-64 h-64 rounded-full border-8 border-red-500 top-10 left-10 opacity-70"></div>
                  <div className="absolute w-64 h-64 rounded-full border-8 border-blue-800 top-20 left-20"></div>
                  <div className="relative z-10 bg-white rounded-full w-48 h-48 flex items-center justify-center shadow-xl mx-auto">
                    <span className="text-2xl font-bold text-blue-900">MISSION</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-1 rounded-full bg-blue-600"></div>
                <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
                <div className="w-8 h-1 rounded-full bg-blue-600"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes Royal Mark Academy the ideal learning environment for your child
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link 
                  to={feature.link}
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 inline-flex items-center"
                >
                  Learn More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-blue-800 rounded-full text-blue-100 text-sm font-semibold mb-4">Our Impact</span>
            <h2 className="text-4xl font-bold mb-6">School by Numbers</h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-200 uppercase text-sm tracking-wider">Graduation Rate</div>
            </div>
            <div className="text-center p-6 bg-blue-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">25:1</div>
              <div className="text-blue-200 uppercase text-sm tracking-wider">Student-Teacher Ratio</div>
            </div>
            <div className="text-center p-6 bg-blue-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-200 uppercase text-sm tracking-wider">Extracurricular Activities</div>
            </div>
            <div className="text-center p-6 bg-blue-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200 uppercase text-sm tracking-wider">University Acceptance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-1 rounded-full bg-blue-600"></div>
                <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Testimonials</span>
                <div className="w-8 h-1 rounded-full bg-blue-600"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Parents Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community about their experiences at Royal Mark Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">"Royal Mark Academy has transformed my child's approach to learning. The teachers are dedicated and the school leadership is exemplary."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mr-4">MO</div>
                <div>
                  <h4 className="font-bold text-gray-800">Mrs. Oluwaseyi</h4>
                  <p className="text-gray-500 text-sm">Parent of JSS3 Student</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">"The holistic education my children receive at Royal Mark is exceptional. They've grown academically and in character in ways I never expected."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mr-4">JA</div>
                <div>
                  <h4 className="font-bold text-gray-800">Mr. Adeyemi</h4>
                  <p className="text-gray-500 text-sm">Parent of SS1 & SS3 Students</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">"Choosing Royal Mark Academy was the best decision we made for our daughter's education. The facilities and attention to detail are unmatched."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mr-4">TF</div>
                <div>
                  <h4 className="font-bold text-gray-800">Dr. Folarin</h4>
                  <p className="text-gray-500 text-sm">Parent of JSS1 Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-blue-900/80 backdrop-blur-sm p-8 md:p-12 rounded-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Royal Mark Academy?</h2>
            <p className="text-blue-100 mb-8 text-lg max-w-3xl mx-auto">
              Take the first step towards providing your child with an exceptional education that prepares them for future success
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/admissions" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold transition-all">
                Apply Now
              </Link>
              <Link to="/contact" className="bg-transparent hover:bg-white/10 border border-white/30 text-white px-8 py-4 rounded-lg font-medium transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
