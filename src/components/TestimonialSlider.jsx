import { useState, useEffect, useCallback } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Mrs. Okonkwo",
    role: "Parent",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "Royal Mark Academy has transformed my child's approach to learning. The teachers are dedicated and the curriculum is excellent. My child looks forward to going to school every day!"
  },
  {
    id: 2,
    name: "Mr. Adebayo",
    role: "Parent",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    quote: "The holistic education approach at Royal Mark Academy has helped my children develop not only academically but also in character and confidence. I'm very satisfied with their progress."
  },
  {
    id: 3,
    name: "Ms. Nkechi Okoli",
    role: "Former Student",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    quote: "My years at Royal Mark Academy laid a solid foundation for my university education. The teachers pushed us to excel while making learning enjoyable and meaningful."
  },
  {
    id: 4,
    name: "Dr. Emmanuel Okafor",
    role: "Education Consultant",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    quote: "As an education professional, I'm impressed by Royal Mark Academy's commitment to modern teaching methodologies while maintaining strong cultural values and discipline."
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [currentIndex, nextSlide]);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-800 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">What Parents & Students Say</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial card */}
          <div
            className={`bg-white rounded-xl shadow-xl p-6 sm:p-8 md:p-10 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/4 mb-6 md:mb-0 flex-shrink-0">
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="mb-6 text-blue-900">
                  <FaQuoteLeft className="w-10 h-10 opacity-20" />
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-xl text-blue-900">{testimonials[currentIndex].name}</p>
                  <p className="text-blue-700">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-yellow-500' : 'bg-white/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
