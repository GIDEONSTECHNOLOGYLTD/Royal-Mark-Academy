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
  const missionRef = useRef(null);

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
      {/* Hero Section - Day Waterman College inspired */}
      <section className="relative overflow-hidden min-h-[85vh]">
        {/* Red accent bar at top - DWC inspired */}
        <div className="h-2 bg-red-700 w-full absolute top-0 z-20"></div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out z-0" 
          style={{ 
            backgroundImage: `url(${heroImages[currentSlide].image})`,
            opacity: fadeState ? 1 : 0
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-blue-900/70 z-10"></div>
        <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
          <div className="text-center max-w-4xl mx-auto py-20">
            <div className="inline-block rounded-full px-4 py-1 border border-blue-300/30 bg-blue-900/30 backdrop-blur-sm text-blue-100 mb-6 animate-fadeIn">
              <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
              <span>Excellence in Education Since 2014</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              <span className="block mb-2">{heroImages[currentSlide].title}</span>
              <span className="block text-white">Royal Mark Academy</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              {heroImages[currentSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={heroImages[currentSlide].ctaLink} className="inline-flex items-center bg-red-700 hover:bg-red-600 text-white font-bold px-8 py-4 transition-all duration-300">
                {heroImages[currentSlide].cta}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
              <button 
                onClick={() => missionRef.current.scrollIntoView({behavior: 'smooth'})} 
                className="inline-flex items-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium px-8 py-4 transition-all duration-300"
              >
                Our Mission
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section - Day Waterman College inspired */}
      <section ref={missionRef} className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Vision Panel */}
              <div className="bg-blue-950 p-8 text-white">
                <h2 className="relative text-3xl font-bold mb-8 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-red-700">
                  VISION
                </h2>
                <p className="text-lg leading-relaxed italic mb-8">
                  "To raise a generation prepared for the Lord"
                </p>
                <div className="h-1 w-full bg-red-700 mt-auto"></div>
              </div>
              
              {/* Mission Panel */}
              <div className="lg:col-span-2 bg-gray-50 p-8 border-l-4 border-red-700">
                <h2 className="text-3xl font-bold mb-8 text-blue-950 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-blue-950">
                  MISSION
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  "To establish an ideal comprehensive secondary school that produces well rounded and independent citizens through a broad-based functional education at affordable cost"
                </p>
                <div className="mt-8 flex justify-start">
                  <Link to="/about" className="inline-flex items-center text-blue-950 hover:text-red-700 font-medium transition-colors duration-300">
                    Learn more about us
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - DWC inspired */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-red-700 text-white text-sm font-semibold uppercase tracking-wider mb-4">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-blue-950 mb-4">Our Features</h2>
            <div className="w-20 h-1 bg-red-700 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes Royal Mark Academy the ideal learning environment for your child
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="h-2 bg-red-700"></div>
                <div className="p-8">
                  <div className="mb-6 text-blue-950">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-950">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <Link 
                    to={feature.link}
                    className="text-blue-950 font-semibold hover:text-red-700 transition-colors duration-300 inline-flex items-center"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - DWC inspired */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-red-700 text-white text-sm font-semibold uppercase tracking-wider mb-4">Our Impact</span>
            <h2 className="text-4xl font-bold mb-6 text-white">School by Numbers</h2>
            <div className="w-20 h-1 bg-red-700 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-4 border-red-700 pl-6 py-4">
              <div className="text-5xl font-bold mb-2 text-white">95%</div>
              <div className="text-gray-300 uppercase text-sm font-semibold tracking-wider">Graduation Rate</div>
            </div>
            <div className="border-l-4 border-red-700 pl-6 py-4">
              <div className="text-5xl font-bold mb-2 text-white">25:1</div>
              <div className="text-gray-300 uppercase text-sm font-semibold tracking-wider">Student-Teacher Ratio</div>
            </div>
            <div className="border-l-4 border-red-700 pl-6 py-4">
              <div className="text-5xl font-bold mb-2 text-white">15+</div>
              <div className="text-gray-300 uppercase text-sm font-semibold tracking-wider">Extracurricular Activities</div>
            </div>
            <div className="border-l-4 border-red-700 pl-6 py-4">
              <div className="text-5xl font-bold mb-2 text-white">100%</div>
              <div className="text-gray-300 uppercase text-sm font-semibold tracking-wider">University Acceptance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - DWC inspired */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-red-700 text-white text-sm font-semibold uppercase tracking-wider mb-4">Testimonials</span>
            <h2 className="text-4xl font-bold text-blue-950 mb-6">What Parents Say</h2>
            <div className="w-20 h-1 bg-red-700 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community about their experiences at Royal Mark Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border-t-4 border-red-700 shadow-md p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"Royal Mark Academy has transformed my child's approach to learning. The teachers are dedicated and the school leadership is exemplary."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-950 text-white rounded-full flex items-center justify-center font-bold mr-4">MO</div>
                <div>
                  <h4 className="font-bold text-blue-950">Mrs. Oluwaseyi</h4>
                  <p className="text-gray-500 text-sm">Parent of JSS3 Student</p>
                </div>
              </div>
            </div>
            <div className="bg-white border-t-4 border-red-700 shadow-md p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"The holistic education my children receive at Royal Mark is exceptional. They've grown academically and in character in ways I never expected."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-950 text-white rounded-full flex items-center justify-center font-bold mr-4">JA</div>
                <div>
                  <h4 className="font-bold text-blue-950">Mr. Adeyemi</h4>
                  <p className="text-gray-500 text-sm">Parent of SS1 & SS3 Students</p>
                </div>
              </div>
            </div>
            <div className="bg-white border-t-4 border-red-700 shadow-md p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"Choosing Royal Mark Academy was the best decision we made for our daughter's education. The facilities and attention to detail are unmatched."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-950 text-white rounded-full flex items-center justify-center font-bold mr-4">TF</div>
                <div>
                  <h4 className="font-bold text-blue-950">Dr. Folarin</h4>
                  <p className="text-gray-500 text-sm">Parent of JSS1 Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - DWC inspired */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-red-700 text-white text-sm font-semibold uppercase tracking-wider mb-8">Join Us</span>
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-white">
              Ready to give your child the education they deserve?
            </h2>
            <div className="w-20 h-1 bg-red-700 mx-auto mb-8"></div>
            <p className="text-xl mb-10 text-gray-300">
              Join the Royal Mark Academy family today and set your child on the path to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/admissions"
                className="px-8 py-4 bg-red-700 text-white hover:bg-red-800 font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center group"
              >
                Apply Now
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white hover:border-red-700 hover:text-red-700 font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center"
              >
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
