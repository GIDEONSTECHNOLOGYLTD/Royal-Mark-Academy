import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaPause, FaPlay, FaGraduationCap, FaUniversity, FaSchool, FaBookOpen, FaAward } from 'react-icons/fa';

// Import actual school images for background (bypassing Safari image loading issues)
const schoolImages = [
  '/images/campus/campus-main.jpg',
  '/images/campus/classroom.jpg',
  '/images/campus/library.jpg'
];

const ModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Enhanced slides data with additional icons for better visibility
  const slides = [
    {
      id: 1,
      title: "Excellence in Education",
      subtitle: "Nurturing future leaders since 2014",
      icon: <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FaUniversity style={{ fontSize: '5rem', color: '#FFCC00', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }} />
            </div>,
      ctaText: "Explore Programs",
      ctaLink: "/academics"
    },
    {
      id: 2,
      title: "State-of-the-Art Facilities",
      subtitle: "Modern learning environment",
      icon: <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FaSchool style={{ fontSize: '5rem', color: '#FFCC00', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }} />
            </div>,
      ctaText: "Tour Campus",
      ctaLink: "/facilities"
    },
    {
      id: 3,
      title: "Holistic Development",
      subtitle: "Education for mind, body, and character",
      icon: <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FaBookOpen style={{ fontSize: '5rem', color: '#FFCC00', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }} />
            </div>,
      ctaText: "Learn More",
      ctaLink: "/about"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Fixed Background Image for Safari Compatibility */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `url(${schoolImages[currentSlide % schoolImages.length]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      ></div>
      
      {/* Background Overlay with Maximum Contrast for Safari */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }}></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            {/* Enhanced School Logo for Safari */}
            <div className="mx-auto mb-6" style={{ width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Fixed Logo with Fallback Icon */}
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFCC00',
                borderRadius: '50%',
                padding: '3px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.5)'
              }}>
                <FaGraduationCap style={{ 
                  fontSize: '6rem', 
                  color: '#1e3a8a',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }} />
              </div>
            </div>
            
            {/* Main Heading with Strong Contrast */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-4" 
              style={{ 
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '10px 20px',
                borderRadius: '10px',
                display: 'inline-block',
                textShadow: '0 2px 4px rgba(0,0,0,1), 0 4px 8px rgba(0,0,0,0.8)',
                WebkitTextStroke: '1px rgba(0,0,0,0.5)',
                WebkitTextFillColor: 'white', /* Safari specific */
                letterSpacing: '1px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
              }}
            >
              Royal Mark Academy
            </h1>
            
            {/* Current Slide Content with Enhanced Visibility */}
            <div 
              key={slides[currentSlide].id} 
              style={{ 
                opacity: 1,
                backgroundColor: 'rgba(0,0,0,0.85)',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 12px 24px rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                width: '100%',
                maxWidth: '700px',
                margin: '0 auto'
              }}
            >
              <h2 
                className="text-xl md:text-2xl font-bold mb-6" 
                style={{ 
                  color: '#FFCC00',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
                  WebkitTextStroke: '0.5px rgba(0,0,0,0.5)', /* Safari specific */
                  letterSpacing: '0.5px',
                  marginTop: '10px'
                }}
              >
                {slides[currentSlide].title}
              </h2>
              
              <p 
                className="text-xl md:text-2xl mb-8 font-medium" 
                style={{ 
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'inline-block',
                  textShadow: '0 2px 3px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.8)',
                  fontWeight: 700,
                  WebkitTextStroke: '0.3px rgba(0,0,0,0.4)',
                  WebkitTextFillColor: 'white'
                }}
              >
                {slides[currentSlide].subtitle}
              </p>

              {/* Icon */}
              <div className="mb-8">
                {slides[currentSlide].icon}
              </div>
              
              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }} className="sm:flex-row">
                <Link
                  to={slides[currentSlide].ctaLink}
                  className="group inline-flex items-center px-8 py-4 font-bold text-lg rounded-full"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#FFCC00',
                    color: '#1e3a8a',
                    border: '2px solid #1e3a8a',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 12px rgba(0,0,0,0.4)',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    width: '220px',
                    justifyContent: 'center'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFCC00';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.4)';
                  }}
                >
                  {slides[currentSlide].ctaText}
                  <FaChevronRight className="ml-2" style={{ transition: 'transform 0.3s ease' }} />
                </Link>
                <Link
                  to="/admissions"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#1e3a8a';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Previous Button with Safari-specific styling */}
          <button
            onClick={prevSlide}
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid white',
              borderRadius: '50%',
              color: 'white',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#FFCC00';
              e.currentTarget.style.color = '#1e3a8a';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              e.currentTarget.style.color = 'white';
            }}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              padding: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)', /* Safari specific */
              borderRadius: '9999px',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <FaPause style={{ width: '16px', height: '16px' }} /> : <FaPlay style={{ width: '16px', height: '16px' }} />}
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            style={{
              padding: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)', /* Safari specific */
              borderRadius: '9999px',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            aria-label="Next slide"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 20 }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                height: '12px',
                width: index === currentSlide ? '32px' : '12px',
                borderRadius: '9999px',
                backgroundColor: index === currentSlide ? '#eab308' : 'rgba(255, 255, 255, 0.5)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              onMouseOver={(e) => {
                if (index !== currentSlide) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                }
              }}
              onMouseOut={(e) => {
                if (index !== currentSlide) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
