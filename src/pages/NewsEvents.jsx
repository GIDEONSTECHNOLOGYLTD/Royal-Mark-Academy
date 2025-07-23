import { useState } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import NewsCard from '../components/NewsCard';

// Sample news data (to be replaced with actual content from an API or CMS)
const newsData = [
  {
    id: 1,
    title: "2024/2025 Admissions Now Open",
    date: "July 15, 2025",
    category: "Admissions",
    summary: "Applications for the new academic session are now being accepted. Limited spots available across all classes.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    url: "/admissions"
  },
  {
    id: 2,
    title: "Annual Sports Festival Scheduled for August",
    date: "July 10, 2025",
    category: "Events",
    summary: "Our annual inter-house sports competition will take place from August 5-7. Parents and guardians are invited to attend.",
    image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80",
    url: "/events/sports-festival"
  },
  {
    id: 3,
    title: "Outstanding WAEC Results for Class of 2025",
    date: "June 28, 2025",
    category: "Achievements",
    summary: "Our graduating class has achieved remarkable results with 95% scoring distinctions in core subjects.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    url: "/news/waec-results-2025"
  },
  {
    id: 4,
    title: "Science Fair Winners Represent School at National Competition",
    date: "June 15, 2025",
    category: "Achievements",
    summary: "Our science club members who won the regional science fair will represent the school at the national level next month.",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=800&q=80",
    url: "/news/science-fair-winners"
  },
  {
    id: 5,
    title: "New Computer Laboratory Opening",
    date: "June 5, 2025",
    category: "Facilities",
    summary: "Our state-of-the-art computer laboratory with 30 new workstations will be officially opened next week.",
    image: "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?auto=format&fit=crop&w=800&q=80",
    url: "/news/new-computer-lab"
  },
  {
    id: 6,
    title: "Parent-Teacher Conference Date Announced",
    date: "May 30, 2025",
    category: "Events",
    summary: "The end-of-term parent-teacher conference will be held on June 20. Schedule your appointment online.",
    image: "https://images.unsplash.com/photo-1560252829-804f1aedf1be?auto=format&fit=crop&w=800&q=80",
    url: "/events/ptc-june-2025"
  }
];

// Sample upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Inter-House Sports Competition",
    date: "August 5-7, 2025",
    location: "School Sports Complex"
  },
  {
    id: 2,
    title: "Parent-Teacher Conference",
    date: "June 20, 2025",
    location: "Main School Hall"
  },
  {
    id: 3,
    title: "Cultural Day Celebration",
    date: "July 22, 2025",
    location: "School Quadrangle"
  },
  {
    id: 4,
    title: "Graduation Ceremony",
    date: "July 28, 2025",
    location: "Main School Hall"
  },
];

export default function NewsEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Events', 'Admissions', 'Achievements', 'Facilities'];
  
  const filteredNews = newsData.filter(news => {
    // Apply category filter
    const categoryMatch = filter === 'All' || news.category === filter;
    
    // Apply search filter
    const searchMatch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        news.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">News & Events</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">Stay updated with the latest happenings, achievements, and upcoming events at Royal Mark Academy.</p>
      </div>
      
      {/* Filters and Search */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === category 
                ? 'bg-blue-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search news..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* News Cards */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Latest News</h2>
          
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredNews.map(news => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">No news found matching your criteria.</p>
            </div>
          )}
        </div>
        
        {/* Upcoming Events */}
        <div className="col-span-1">
          <div className="bg-blue-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-700" />
              Upcoming Events
            </h2>
            
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-blue-800">{event.title}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-600 text-xs" />
                      {event.date}
                    </div>
                    <div className="mt-1">
                      <svg className="inline-block h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <a 
                href="/calendar" 
                className="inline-block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View Full Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
