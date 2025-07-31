import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause, FaChevronRight, FaGraduationCap } from 'react-icons/fa';

const ModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const intervalRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Excellence in Education",
      subtitle: "Nurturing future leaders with world-class education since 2014",
      description: "Discover why Royal Mark Academy is the premier choice for holistic education in Abeokuta",
      image: "/images/campus/classroom.jpg",
      ctaText: "Explore Our Programs",
      ctaLink: "/academics",
      stats: { students: "1200+", teachers: "85+", years: "10+" }
    },
    {
      id: 2,
      title: "State-of-the-Art Facilities",
      subtitle: "Modern learning environment designed for 21st century education",
      description: "Experience our cutting-edge facilities that inspire creativity and innovation",
      image: "/images/school-building.jpg",
      ctaText: "Tour Our Campus",
      ctaLink: "/facilities",
      stats: { labs: "12", classrooms: "45", library: "5000+" }
    },
    {
      id: 3,
      title: "Holistic Development",
      subtitle: "Education that nurtures mind, body, and character",
      description: "We develop well-rounded individuals ready to excel in a global society",
      image: "/images/campus/library.jpg",
      ctaText: "Learn Our Approach",
      ctaLink: "/about",
      stats: { sports: "15", clubs: "20", awards: "50+" }
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Parallax Effect */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transform: `scale(${index === currentSlide ? 1 + scrollY * 0.0002 : 1.1})`,
              transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out',
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/30" />
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto content-animation">
            {/* School Logo */}
            <img src="/images/royal-mark-logo.png" alt="Royal Mark Academy Logo" 
                 className="h-28 md:h-32 mx-auto mb-6 filter drop-shadow-xl" />
            
            {/* Main Content */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-white font-medium drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
              {slides[currentSlide].subtitle}
            </p>
            
            <p className="text-lg md:text-xl mb-8 text-white font-medium max-w-3xl mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
              {slides[currentSlide].description}
            </p>

            {/* Stats Counter */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-10 stats-animation">
              {Object.entries(slides[currentSlide].stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-4xl font-bold text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">{value}</div>
                  <div className="text-sm font-semibold text-white uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bounce-animation">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center shadow-lg">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
