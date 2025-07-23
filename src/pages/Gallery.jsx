import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

// Gallery images organized by category
const galleryData = {
  "Campus": [
    {
      id: "campus-1",
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      title: "School Building Front View",
      description: "The main academic building of Royal Mark Academy",
      featured: true
    },
    {
      id: "campus-2",
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
      title: "School Garden",
      description: "Our beautiful garden maintained by the Agricultural Science students"
    },
    {
      id: "campus-3",
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      title: "Library",
      description: "Our well-stocked library with thousands of books and digital resources"
    },
    {
      id: "campus-4",
      src: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80",
      title: "School Cafeteria",
      description: "Where students enjoy nutritious meals in a comfortable setting"
    }
  ],
  "Events": [
    {
      id: "events-1",
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
      title: "Graduation Ceremony 2025",
      description: "Celebrating our graduating class and their achievements",
      featured: true
    },
    {
      id: "events-2",
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      title: "Cultural Day Celebration",
      description: "Students showcasing Nigeria's rich cultural heritage"
    },
    {
      id: "events-3",
      src: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80",
      title: "Christmas Carol",
      description: "Annual Christmas celebration with carols and performances"
    }
  ],
  "Sports": [
    {
      id: "sports-1",
      src: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80",
      title: "Inter-House Sports Competition",
      description: "Annual athletics competition between school houses",
      featured: true
    },
    {
      id: "sports-2",
      src: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80",
      title: "Football Team",
      description: "Our school football team during a match with a neighboring school"
    },
    {
      id: "sports-3",
      src: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?auto=format&fit=crop&w=800&q=80",
      title: "Basketball Tournament",
      description: "Students participating in the annual basketball tournament"
    }
  ],
  "Academics": [
    {
      id: "academics-1",
      src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
      title: "Science Laboratory Session",
      description: "Students engaged in practical science experiments",
      featured: true
    },
    {
      id: "academics-2",
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
      title: "Graduation Day",
      description: "Students celebrating their academic achievements"
    },
    {
      id: "academics-3",
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      title: "Classroom Learning",
      description: "Interactive learning session in one of our modern classrooms"
    }
  ],
  "Arts & Culture": [
    {
      id: "arts-1",
      src: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&w=800&q=80",
      title: "School Choir",
      description: "Our award-winning school choir during a performance",
      featured: true
    },
    {
      id: "arts-2",
      src: "https://images.unsplash.com/photo-1535359056830-d4badde79747?auto=format&fit=crop&w=800&q=80",
      title: "Art Exhibition",
      description: "Student artwork displayed at our annual art exhibition"
    },
    {
      id: "arts-3",
      src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
      title: "Music Class",
      description: "Students learning various musical instruments"
    }
  ]
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const modalRef = useRef(null);
  
  const categories = ['All', ...Object.keys(galleryData)];
  
  // Handle category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchTerm('');
  };
  
  // Filter images based on active category and search term
  const getFilteredImages = () => {
    let images = [];
    
    // Get all images if 'All' is selected, or just the category's images
    if (activeCategory === 'All') {
      Object.values(galleryData).forEach(categoryImages => {
        images = [...images, ...categoryImages];
      });
    } else if (galleryData[activeCategory]) {
      images = galleryData[activeCategory];
    }
    
    // Apply search filter if there's a search term
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      images = images.filter(img => 
        img.title.toLowerCase().includes(lowerSearchTerm) || 
        img.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    return images;
  };
  
  const filteredImages = getFilteredImages();
  
  // Handle image click to open lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };
  
  // Close lightbox when clicking outside the image
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeLightbox();
      }
    };
    
    if (isLightboxOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLightboxOpen]);
  
  // Close lightbox on escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };
    
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isLightboxOpen]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">School Gallery</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Explore photos from our vibrant school community, showcasing campus life, events, and student activities.
        </p>
      </div>
      
      {/* Filters and search */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Search box */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      {/* Featured images section */}
      {activeCategory === 'All' && !searchTerm && (
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Featured Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.values(galleryData)
              .flat()
              .filter(img => img.featured)
              .map(image => (
                <div 
                  key={image.id}
                  className={`overflow-hidden rounded-lg shadow-lg cursor-pointer group ${image.id === 'campus-1' ? 'md:col-span-2 md:row-span-2' : ''}`}
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative h-full">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold">{image.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* Gallery grid */}
      <div className="max-w-7xl mx-auto">
        {activeCategory !== 'All' && (
          <h2 className="text-2xl font-bold text-blue-900 mb-6">{activeCategory} Photos</h2>
        )}
        
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map(image => (
              <div 
                key={image.id} 
                className="overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                onClick={() => openLightbox(image)}
              >
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <p className="text-gray-200 text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No images found matching your criteria.</p>
            <button
              onClick={() => {setActiveCategory('All'); setSearchTerm('');}}
              className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              View All Photos
            </button>
          </div>
        )}
      </div>
      
      {/* Lightbox */}
      {isLightboxOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={closeLightbox}
          >
            <FaTimes className="w-6 h-6" />
          </button>
          
          <div ref={modalRef} className="max-w-4xl mx-auto">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
            
            <div className="mt-4 text-white">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
