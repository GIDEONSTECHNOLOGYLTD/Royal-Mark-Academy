import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause, FaChevronRight, FaGraduationCap, FaSchool, FaUniversity } from 'react-icons/fa';

const ModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Simplified slides data
  const slides = [
    {
      id: 1,
      title: "Excellence in Education",
      subtitle: "Nurturing future leaders since 2014",
      icon: <FaUniversity className="text-6xl text-yellow-400" />,
      ctaText: "Explore Programs",
      ctaLink: "/academics"
    },
    {
      id: 2,
      title: "State-of-the-Art Facilities",
      subtitle: "Modern learning environment",
      icon: <FaSchool className="text-6xl text-yellow-400" />,
      ctaText: "Tour Campus",
      ctaLink: "/facilities"
    },
    {
      id: 3,
      title: "Holistic Development",
      subtitle: "Education for mind, body, and character",
      icon: <FaGraduationCap className="text-6xl text-yellow-400" />,
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
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-800">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            {/* School Badge */}
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-yellow-500 flex items-center justify-center">
              <FaGraduationCap className="text-blue-900 text-5xl" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Royal Mark Academy
            </h1>
            
            {/* Current Slide Content */}
            <div key={slides[currentSlide].id} className="animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
                {slides[currentSlide].title}
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                {slides[currentSlide].subtitle}
              </p>

              {/* Icon */}
              <div className="mb-8">
                {slides[currentSlide].icon}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Link
                  to={slides[currentSlide].ctaLink}
                  className="group inline-flex items-center px-8 py-4 bg-yellow-500 text-blue-900 font-bold text-lg rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  {slides[currentSlide].ctaText}
                  <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/admissions"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-all duration-300 shadow-lg"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-all duration-300 shadow-lg"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-all duration-300 shadow-lg"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                index === currentSlide
                  ? 'bg-yellow-500 w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
