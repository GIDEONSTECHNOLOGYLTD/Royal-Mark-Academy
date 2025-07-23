import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaFlask, FaUsers, FaLaptopCode, FaMicroscope, FaBookOpen } from "react-icons/fa";

// Add global styles for animations
const styles = document.createElement('style');
styles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes progress {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  
  @keyframes textShine {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradientBG 15s ease infinite;
  }
  
  @keyframes shine-sweep {
    0% { transform: translateX(-100%) rotate(25deg); }
    100% { transform: translateX(100%) rotate(25deg); }
  }

  @keyframes glass-shine {
    0% { transform: translateX(-100%) skewX(-20deg); }
    100% { transform: translateX(100%) skewX(-20deg); }
  }

  @keyframes ping-once {
    0% { transform: scale(1); opacity: 1; }
    70%, 100% { transform: scale(2); opacity: 0; }
  }

  .animate-shine-sweep {
    animation: shine-sweep 1.5s ease forwards;
  }

  .animate-glass-shine {
    animation: glass-shine 1.5s ease forwards;
  }

  .animate-ping-once {
    animation: ping-once 0.6s ease-out forwards;
  }

  .perspective-1000 {
    perspective: 1000px;
  }
  
  .3d-text-shadow {
    text-shadow: 
      0 1px 0 rgba(255,255,255,0.2),
      0 2px 0 rgba(255,255,255,0.1),
      0 3px 0 rgba(255,255,255,0.05),
      0 4px 4px rgba(0,0,0,0.3);
    transform-style: preserve-3d;
  }
`;
document.head.appendChild(styles);

// Hero carousel images with actual school images
const heroImages = [
  {
    id: 1,
    title: "Excellence in Education",
    subtitle: "Nurturing future leaders at Royal Mark Academy since 2014",
    image: "/images/school-building.jpg",
    cta: "Discover Our Programs"
  },
  {
    id: 2,
    title: "Modern Learning Environment",
    subtitle: "State-of-the-art facilities at Number 1 Elepa Road, Odeda, Abeokuta",
    image: "/images/campus/classroom.jpg",
    cta: "View Our Facilities"
  },
  {
    id: 3,
    title: "Holistic Development",
    subtitle: "Education that nurtures mind, body, and character",
    image: "/images/campus/library.jpg",
    cta: "Learn About Our Approach"
  }
];

const features = [
  {
    icon: <FaGraduationCap className="h-10 w-10 text-blue-600" />,
    title: "Academic Excellence",
    description: "Consistently outstanding academic results with a track record of university placements.",
    link: "/academics"
  },
  {
    icon: <FaFlask className="h-10 w-10 text-blue-600" />,
    title: "STEM Focus",
    description: "Specialized programs in Science, Technology, Engineering, and Mathematics.",
    link: "/academics#stem"
  },
  {
    icon: <FaUsers className="h-10 w-10 text-blue-600" />,
    title: "Experienced Faculty",
    description: "Dedicated teachers with advanced degrees and years of experience.",
    link: "/about#faculty"
  },
  {
    icon: <FaLaptopCode className="h-10 w-10 text-blue-600" />,
    title: "Technology Integration",
    description: "Cutting-edge technology in every classroom for enhanced learning.",
    link: "/facilities#technology"
  },
  {
    icon: <FaMicroscope className="h-10 w-10 text-blue-600" />,
    title: "Science Labs",
    description: "Fully equipped laboratories for hands-on scientific exploration.",
    link: "/facilities#labs"
  },
  {
    icon: <FaBookOpen className="h-10 w-10 text-blue-600" />,
    title: "Library Resources",
    description: "Extensive collection of books and digital learning resources.",
    link: "/facilities#library"
  }
];

// Floating elements component for background decoration
const FloatingElements = () => {
  const elements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 15 + 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.4 + 0.1,
    shape: Math.random() > 0.5 ? 'circle' : 'square',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <div
          key={el.id}
          className={`absolute ${el.shape === 'circle' ? 'rounded-full' : 'rotate-45'} bg-white`}
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

      {/* Quick Stats */}
      <section className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm uppercase tracking-wider">Graduation Rate</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">25:1</div>
              <div className="text-sm uppercase tracking-wider">Student-Teacher Ratio</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm uppercase tracking-wider">Extracurricular Activities</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm uppercase tracking-wider">University Acceptance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Excellence in Every Aspect of Education
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="text-blue-600 font-medium inline-flex items-center hover:text-blue-800 transition-colors"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how Royal Mark Academy can help your child achieve their full potential in a nurturing and challenging environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/admissions" 
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-md transition-colors inline-block"
            >
              Apply Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-white hover:bg-gray-100 text-blue-700 font-bold px-8 py-3 border-2 border-blue-700 rounded-md transition-colors inline-block"
            >
              Contact Us
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
