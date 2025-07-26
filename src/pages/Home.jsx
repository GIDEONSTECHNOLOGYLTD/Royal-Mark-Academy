import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaFlask, FaUsers, FaLaptopCode, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, []);

  // Add text animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(5deg); }
      }
      @keyframes textShine {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }
      .text-shine {
        background: linear-gradient(
          to right,
          #fff 20%,
          #fff9b0 30%,
          #fff 40%,
          #fff 60%,
          #fff9b0 70%,
          #fff 80%
        );
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: textShine 8s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Counter animation for achievements section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = document.querySelectorAll('.counter');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000; // ms
            const step = Math.ceil(target / (duration / 16)); // 60fps
            let current = 0;
            
            const updateCounter = () => {
              current += step;
              if (current < target) {
                counter.textContent = current;
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            
            updateCounter();
          });
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    const achievements = document.querySelector('section:nth-of-type(4)');
    if (achievements) {
      observer.observe(achievements);
    }
    
    return () => {
      if (achievements) {
        observer.unobserve(achievements);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg)'
        }}></div>
      </div>
      
      {/* Hero Carousel */}
      <section className="relative h-screen max-h-[90vh] overflow-hidden">
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)`,
            transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Slides */}
          <div className="relative h-full w-full">
            <div className="relative h-full w-full">
              <div
                key={currentSlide}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform-gpu"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%), url(${heroImages[currentSlide].image})`,
                  animation: 'fadeIn 1s ease-in-out',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  willChange: 'transform'
                }}
              >
                <div className="container mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
                  <div 
                    className="max-w-5xl mx-auto text-center text-white relative z-20 px-4"
                    style={{
                      animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                  >
                    {/* Animated badge */}
                    <div className="relative inline-block mb-8 group transform transition-all duration-500 hover:scale-105">
                      <span className="absolute -inset-1 bg-yellow-500/90 rounded-full blur-md group-hover:blur-xl transition-all duration-700"></span>
                      <span className="relative z-10 inline-block bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-900 text-sm font-bold px-8 py-3 rounded-full shadow-xl">
                      <span className="relative z-10 flex items-center">
                      <span className="w-2 h-2 bg-yellow-700 rounded-full mr-2 animate-pulse"></span>
                      <span className="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#1a1a1a,45%,#f59e0b,55%,#1a1a1a)] bg-[length:250%_100%]">
                        Welcome to Royal Mark Academy
                      </span>
                    </span>
                  </span>
                  </div>
                  
                  {/* Animated heading */}
                  <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-8 leading-none tracking-tight">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700"></div>
                      <span className="relative block text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-100 to-amber-100">
                        {heroImages[currentSlide].title.split(' ').map((word, i) => (
                          <span 
                            key={i} 
                            className="inline-block transition-all duration-700 hover:translate-y-[-5px] 3d-text-shadow"
                            style={{
                              transitionDelay: `${i * 100}ms`,
                              transform: `perspective(1000px) translateZ(0px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
                            }}
                          >
                            <span className="relative inline-block">
                              <span className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 blur-md rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                              <span className="relative">{word}</span>
                            </span>{' '}
                          </span>
                        ))}
                      </span>
                    </div>
                  </h1>
                  
                  {/* Animated subtitle */}
                  <div className="relative max-w-3xl mx-auto mb-16">
                    <p className="text-xl md:text-2xl text-blue-100 leading-relaxed relative z-10 font-medium">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        {heroImages[currentSlide].subtitle}
                      </span>
                    </p>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-400/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow"></div>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow" style={{
                      animationDelay: '1s'
                    }}></div>
                  </div>
                  </div>
                  
                  {/* Interactive buttons */}
                  <div className="flex flex-wrap justify-center gap-5 relative z-10">
                    <Link 
                      to="/admissions" 
                      className="group relative overflow-hidden perspective-1000 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-1 inline-flex items-center"
                    >
                      {/* Button 3D shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shine-sweep transition-all duration-700"></div>
                      
                      {/* Animated border glow */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-300 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 group-hover:animate-pulse-slow"></div>
                      
                      <span className="relative z-10 flex items-center font-bold text-lg tracking-wide">
                        <span className="mr-3 transition-all duration-300 group-hover:mr-4">
                          APPLY NOW
                        </span>
                        <span className="relative overflow-hidden flex items-center justify-center w-7 h-7 rounded-full bg-white/20 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:bg-white/30">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                          
                          {/* Arrow animation */}
                          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:animate-ping-once">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </span>
                        </span>
                      </span>
                    </Link>
                    
                    <Link 
                      to="/about" 
                      className="group relative overflow-hidden perspective-1000 bg-white/10 backdrop-blur-lg border-2 border-white/20 hover:border-white/40 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 inline-flex items-center"
                    >
                      {/* Glass reflection effect */}
                      <div className="absolute -inset-full h-[400%] w-[200%] opacity-0 group-hover:opacity-20 group-hover:animate-glass-shine bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full"></div>
                      
                      <span className="relative z-10 flex items-center font-bold text-lg tracking-wide">
                        <span className="mr-3 transition-all duration-300 group-hover:mr-4">
                          EXPLORE MORE
                        </span>
                        <span className="relative overflow-hidden flex items-center justify-center w-7 h-7 rounded-full bg-white/10 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:bg-white/20">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
                          </svg>
                          
                          {/* Arrow animation */}
                          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:animate-ping-once">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </span>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-6">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(prev => (prev - 1 + heroImages.length) % heroImages.length);
                }}
                className="group relative w-12 h-12 rounded-full bg-gradient-to-r from-black/40 to-transparent text-white flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-1 inline-flex items-center transform hover:scale-105"
                style={{
                  boxShadow: '0 10px 30px -10px rgba(245, 158, 11, 0.5)'
                }}
                aria-label="Previous slide"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-yellow-400/50 transition-all duration-300"></div>
                <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7m0 0l-7 7 7 7" />
                </svg>
              </button>
              
              {/* Slide Indicators */}
              <div className="flex items-center space-x-2">
                {heroImages.map((_, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className="relative group focus:outline-none"
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <div className="w-8 h-1.5 bg-white/30 rounded-full overflow-hidden">
                        {isActive && (
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                            style={{
                              width: '100%',
                              animation: 'progress 5s linear infinite',
                              animationPlayState: 'running'
                            }}
                          />
                        )}
                      </div>
                      <span className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                        isActive ? 'text-yellow-300 opacity-100' : 'text-white/0 opacity-0'
                      }`}>
                        {heroImages[index].title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(prev => (prev + 1) % heroImages.length);
                }}
                className="group relative w-12 h-12 rounded-full bg-gradient-to-l from-black/40 to-transparent text-white flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-1 inline-flex items-center transform hover:scale-105"
                style={{
                  boxShadow: '0 10px 30px -10px rgba(245, 158, 11, 0.5)'
                }}
                aria-label="Next slide"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-yellow-400/50 transition-all duration-300"></div>
                <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gradient orbs */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(250, 204, 21, 0.15)' : 'rgba(96, 165, 250, 0.15)'} 0%, transparent 70%)`,
              filter: 'blur(60px)',
              animation: `pulse ${Math.random() * 20 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
              transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
            }}
          />
        ))}
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(800px) rotateX(60deg)'
        }}></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div 
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/50"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`
            }}
          ></div>
        ))}
      </div>

      {/* Floating 3D School Logo */}
      <div className="absolute top-10 right-10 z-30 hidden lg:block">
        <div className="relative w-40 h-40">
          <img 
            src="/images/royal-mark-logo.png" 
            alt="Royal Mark Academy Logo"
            className="absolute inset-0 w-full h-full object-contain filter drop-shadow-2xl"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) translateZ(20px)`,
              transition: 'transform 0.2s ease-out',
            }}
          />
          <div 
            className="absolute inset-0 opacity-50 blur-md"
            style={{
              backgroundImage: "url('/images/royal-mark-logo.png')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg) translateZ(10px) scale(1.2)`,
              transition: 'transform 0.3s ease-out',
            }}
          ></div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center group">
        <div className="relative inline-flex flex-col items-center">
          <div className="text-sm text-white/70 font-medium mb-2 group-hover:text-yellow-300 transition-colors duration-300">
            Scroll to explore
          </div>
          <div className="relative w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center p-1 group-hover:border-yellow-400/70 transition-all duration-300">
            <div className="w-1 h-3 bg-gradient-to-b from-yellow-300 to-amber-400 rounded-full animate-bounce"></div>
          </div>
          <div className="absolute -bottom-2 w-1 h-6 bg-gradient-to-t from-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Quick Stats with Modern Design */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 text-white py-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated waves */}
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10">
            <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="rgba(255,255,255,0.3)" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,133.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-wave-slow"></path>
            </svg>
            <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="rgba(255,255,255,0.2)" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,202.7C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-wave-medium"></path>
            </svg>
            <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="rgba(255,255,255,0.1)" fillOpacity="1" d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,240C672,256,768,256,864,234.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-wave-fast"></path>
            </svg>
          </div>
          
          {/* Particles */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={`stat-particle-${i}`}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 8 + 3}px`,
                height: `${Math.random() * 8 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">Our Impact</span> in Numbers
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "95%", label: "Graduation Rate" },
              { value: "25:1", label: "Student-Teacher Ratio" },
              { value: "15+", label: "Extracurricular Activities" },
              { value: "100%", label: "University Acceptance" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/30"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Stat value with animated highlight */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-300/20 to-yellow-500/0 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse-slow"></div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tabular-nums relative text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 group-hover:from-yellow-200 group-hover:to-yellow-100 transition-all duration-300">
                    {stat.value}
                  </div>
                </div>
                
                {/* Stat label */}
                <div className="text-sm uppercase tracking-wider font-semibold text-blue-100 group-hover:text-yellow-100 transition-colors duration-300">
                  {stat.label}
                </div>
                
                {/* Decorative corner element */}
                <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-white/5 opacity-50 group-hover:bg-yellow-300/10 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Modern Design */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 px-4 py-2 rounded-full mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold tracking-wider text-sm">WHY CHOOSE ROYAL MARK ACADEMY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Every Aspect</span> of Education
            </h2>
            
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              At Royal Mark Academy, we provide an exceptional educational experience through our commitment to academic excellence, 
              personalized attention, and state-of-the-art facilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease ${index * 0.15}s forwards`,
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                {/* Card background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-white shadow-xl group-hover:shadow-2xl transition-all duration-300 rounded-2xl border border-gray-100 group-hover:border-blue-100 z-0"></div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0 ${feature.color} opacity-5"></div>
                
                {/* Card content */}
                <div className="relative z-10 p-8">
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300 scale-90 group-hover:scale-110`}></div>
                    <div className="relative w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  
                  {/* Link with animated border */}
                  <Link 
                    to={feature.link} 
                    className="relative inline-flex items-center font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
                  >
                    <span>Learn more</span>
                    <span className="ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M5 12h13" />
                      </svg>
                    </span>
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 transform rotate-45 translate-x-10 -translate-y-10 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-100 animate-gradient"></div>
        
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-20 rotate-180">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,146.53,111.31,217.18,94.19,275.88,79.22,296,59.93,321.39,56.44Z" 
                className="fill-white opacity-20 animate-wave-slow"></path>
            </svg>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-24 rotate-180">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,146.53,111.31,217.18,94.19,275.88,79.22,296,59.93,321.39,56.44Z" 
                className="fill-white opacity-30 animate-wave-medium"></path>
            </svg>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-opacity-20 ${i % 2 === 0 ? 'bg-blue-500' : 'bg-indigo-500'} animate-float`}
              style={{
                width: `${Math.random() * 60 + 40}px`,
                height: `${Math.random() * 60 + 40}px`,
                top: `${Math.random() * 70 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                opacity: Math.random() * 0.1 + 0.05,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${Math.random() * 7 + 10}s`
              }}
            />
          ))}
        </div>
        
        {/* Content container with backdrop blur for better readability */}
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Top accent */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative">
              Join Our Community
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                <path d="M0 3C50 0.5 150 0.5 200 3" stroke="url(#paint0_linear)" strokeWidth="5" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="0" y1="3" x2="200" y2="3" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6" stopOpacity="0"/>
                    <stop offset="0.5" stopColor="#3B82F6"/>
                    <stop offset="1" stopColor="#4F46E5" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>?
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover how Royal Mark Academy can help your child achieve their full potential in a nurturing and challenging environment designed for tomorrow's leaders.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 perspective-1000">
            <Link 
              to="/admissions"
              className="group relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full skew-x-12 animate-glass-shine opacity-30 group-hover:animate-shine-sweep"></span>
              
              <span className="relative inline-flex items-center">
                <span>Apply Now</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/contact"
              className="group relative bg-white text-blue-700 font-bold px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-md overflow-hidden border-2 border-blue-600/20 hover:border-blue-600/40 transform hover:scale-105"
            >
              {/* Pulse effect on hover */}
              <span className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 group-hover:animate-ping-once"></span>
              
              <span className="relative inline-flex items-center">
                <span>Schedule a Visit</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Testimonial preview */}
          <div className="mt-16 max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-lg p-5 border border-blue-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600 text-sm">From 120+ parent reviews</span>
            </div>
            <p className="text-gray-700 italic text-base">"Royal Mark Academy provided my children with an extraordinary educational foundation that prepared them for success in high school and beyond."</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with soft gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-70"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, blue 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Large quote marks */}
        <div className="absolute top-20 left-10 text-9xl text-blue-100 font-serif">"</div>
        <div className="absolute bottom-20 right-10 text-9xl text-blue-100 font-serif transform rotate-180">"</div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-1 rounded-full bg-blue-600"></div>
                <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">What Parents Say</span>
                <div className="w-8 h-1 rounded-full bg-blue-600"></div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Parent</span> Testimonials
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
              Hear what our community of parents and guardians have to say about their experience with Royal Mark Academy.
            </p>
          </div>
          
          {/* Testimonials grid with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              
              {/* Quote icon */}
              <div className="mb-6 text-blue-100">
                <svg className="w-12 h-12 opacity-80 group-hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v6c0 4.4-1.6 8-6 10 .2-2.6-.6-5-2-8h-2v-16h10v8h-5.4c.6 2 1.4 2.8 5.4 0zm20 0v6c0 4.4-1.6 8-6 10 .2-2.6-.6-5-2-8h-2v-16h10v8h-5.4c.6 2 1.4 2.8 5.4 0z"/>
                </svg>
              </div>
              
              {/* Stars */}
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "The teachers at Royal Mark Academy have been incredible mentors to my children. They not only excel academically but have also developed confidence and character. The small class sizes ensure each child receives individualized attention."
              </p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-blue-100">
                  <img 
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                    alt="Parent" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Mrs. Adebayo</h4>
                  <p className="text-sm text-gray-500">Parent of two students</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              
              {/* Quote icon */}
              <div className="mb-6 text-blue-100">
                <svg className="w-12 h-12 opacity-80 group-hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v6c0 4.4-1.6 8-6 10 .2-2.6-.6-5-2-8h-2v-16h10v8h-5.4c.6 2 1.4 2.8 5.4 0zm20 0v6c0 4.4-1.6 8-6 10 .2-2.6-.6-5-2-8h-2v-16h10v8h-5.4c.6 2 1.4 2.8 5.4 0z"/>
                </svg>
              </div>
              
              {/* Stars */}
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "After transferring from another school, the difference was immediately noticeable. The curriculum is challenging yet engaging, and the teachers are passionate about education. My son's grades improved dramatically within one term."
              </p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-blue-100">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                    alt="Parent" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Mr. Ogunleye</h4>
                  <p className="text-sm text-gray-500">Parent of a secondary student</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              
              {/* Quote icon */}
              <div className="mb-6 text-blue-100">
                <svg className="w-12 h-12 opacity-80 group-hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v6c0 4.4-1.6 8-6 10 .2-2.6-.6-5-2-8h-2v-16h10v8h-5.4c.6 2 1.4 2.8 5.4 0zm20 0v6c0 4.4-1.6 8-6 10 .2-2.6-.6-5-2-8h-2v-16h10v8h-5.4c.6 2 1.4 2.8 5.4 0z"/>
                </svg>
              </div>
              
              {/* Stars */}
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "What sets Royal Mark apart is their holistic approach to education. Beyond academics, they focus on character development and practical skills. The extracurricular activities and leadership opportunities have been invaluable for my daughter."
              </p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-blue-100">
                  <img 
                    src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                    alt="Parent" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Mrs. Nwosu</h4>
                  <p className="text-sm text-gray-500">Parent of a primary student</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video testimonial feature */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 p-1">
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-800 to-indigo-800 p-8 md:p-12">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-blue-500 rounded-full opacity-10"></div>
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-40 h-40 bg-indigo-500 rounded-full opacity-10"></div>
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Video thumbnail with play button */}
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Parent Testimonial Video" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80 group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-6 h-6 text-blue-600 transform translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Quote content */}
                <div className="text-center md:text-left">
                  <svg className="w-12 h-12 text-blue-300 opacity-50 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8v6c0 4.4-1.6 8-6 10 .2-2.6-.6-5-2-8h-2v-16h10v8h-5.4c.6 2 1.4 2.8 5.4 0zm20 0v6c0 4.4-1.6 8-6 10 .2-2.6-.6-5-2-8h-2v-16h10v8h-5.4c.6 2 1.4 2.8 5.4 0z"/>
                  </svg>
                  
                  <blockquote className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">
                    "Choosing Royal Mark Academy was one of the best decisions we made for our children's future. The growth we've seen in their academic performance, confidence, and social skills has been remarkable."
                  </blockquote>
                  
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-blue-300">
                      <img 
                        src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
                        alt="Featured Parent" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Dr. & Mrs. Oluwatobi</h4>
                      <p className="text-sm text-blue-200">Parents of three Royal Mark students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* View more testimonials button */}
          <div className="text-center mt-12">
            <Link to="/testimonials" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
              <span>View More Parent Testimonials</span>
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Achievements Showcase - World-Class Premium Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900 opacity-90"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(30, 64, 175, 0.15) 0%, transparent 50%)'
          }}></div>
          
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'center center'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center mb-3">
              <div className="w-12 h-1 bg-yellow-500 rounded-full mr-2 animate-pulse-slow"></div>
              <h2 className="text-yellow-400 uppercase tracking-wider text-lg font-bold">Excellence Since 2014</h2>
              <div className="w-12 h-1 bg-yellow-500 rounded-full ml-2 animate-pulse-slow"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 3d-text-shadow">Achievements</span></h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">Celebrating academic excellence and holistic development at Royal Mark Academy since our founding on October 5, 2014.</p>
          </div>
          
          {/* 3D Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Academic Excellence */}
            <div 
              className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-yellow-400/30"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                transition: 'transform 0.2s ease-out',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Academic Excellence</h3>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-2 counter" data-target="95">
                  95<span className="text-white">%</span>
                </div>
                <p className="text-blue-100 text-sm">Average pass rate across all subjects</p>
              </div>
            </div>
            
            {/* Student Achievements */}
            <div 
              className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-yellow-400/30"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                transition: 'transform 0.2s ease-out',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Award Winners</h3>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 mb-2 counter" data-target="120">
                  120<span className="text-white">+</span>
                </div>
                <p className="text-blue-100 text-sm">National and regional academic awards</p>
              </div>
            </div>
            
            {/* Qualified Teachers */}
            <div 
              className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-yellow-400/30"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                transition: 'transform 0.2s ease-out',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-green-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Expert Faculty</h3>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 mb-2 counter" data-target="45">
                  45<span className="text-white">+</span>
                </div>
                <p className="text-blue-100 text-sm">Qualified teachers and staff members</p>
              </div>
            </div>
            
            {/* Years of Excellence */}
            <div 
              className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-yellow-400/30"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                transition: 'transform 0.2s ease-out',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Years of Excellence</h3>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-2 counter" data-target="11">
                  11<span className="text-white">+</span>
                </div>
                <p className="text-blue-100 text-sm">Years providing quality education since 2014</p>
              </div>
            </div>
          </div>
          
          {/* Premium Award Showcase */}
          <div className="flex flex-wrap justify-center gap-6 items-center mb-16">
            {/* Award 1 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-300 rounded-lg blur opacity-25 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
              <div className="relative p-6 bg-blue-950 ring-1 ring-white/10 rounded-lg flex items-center gap-4 overflow-hidden">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src="/images/awards/academic-excellence.svg" 
                    alt="Academic Excellence Award" 
                    className="w-14 h-14 object-contain" 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Best WAEC Results</h3>
                  <p className="text-xs text-blue-200">Regional Recognition 2023</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-yellow-500 opacity-10 rounded-full"></div>
              </div>
            </div>
            
            {/* Award 2 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-lg blur opacity-25 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
              <div className="relative p-6 bg-blue-950 ring-1 ring-white/10 rounded-lg flex items-center gap-4 overflow-hidden">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src="/images/awards/sports-trophy.svg" 
                    alt="Sports Achievement" 
                    className="w-14 h-14 object-contain" 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Interschool Sports</h3>
                  <p className="text-xs text-blue-200">State Champion 2024</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500 opacity-10 rounded-full"></div>
              </div>
            </div>
            
            {/* Award 3 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-300 rounded-lg blur opacity-25 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
              <div className="relative p-6 bg-blue-950 ring-1 ring-white/10 rounded-lg flex items-center gap-4 overflow-hidden">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src="/images/awards/innovation-award.svg" 
                    alt="Innovation Award" 
                    className="w-14 h-14 object-contain" 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Science Innovation</h3>
                  <p className="text-xs text-blue-200">National Recognition 2023</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-500 opacity-10 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* CTA Banner */}
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden group rounded-2xl bg-gradient-to-r from-blue-800 to-indigo-900 p-8 border border-white/10">
              <div className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              {/* Animated gradient lines */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Visit Our Campus</h3>
                  <p className="text-blue-200 max-w-lg">
                    Experience excellence at Royal Mark Academy. Schedule a tour of our campus at Number 1 Elepa Road, Odeda, Abeokuta.
                  </p>
                </div>
                <Link 
                  to="/contact" 
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-yellow-500 px-8 py-4 font-bold text-white transition-all duration-500"
                >
                  <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-yellow-600 to-amber-500 transition-all duration-500 ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center gap-2">
                    Book A Tour
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 5L20 12L13 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
