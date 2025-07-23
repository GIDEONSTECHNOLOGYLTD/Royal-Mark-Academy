import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function NewsCard({ news }) {
  const { title, date, summary, image, category, url } = news;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FaCalendarAlt className="mr-2" />
          <span>{date}</span>
        </div>
        
        <h3 className="font-bold text-xl mb-2 text-blue-900">{title}</h3>
        
        <p className="text-gray-600 mb-4">{summary}</p>
      </div>
      
      <div className="px-6 pb-6">
        <Link 
          to={url} 
          className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-colors"
        >
          Read More
          <FaArrowRight className="ml-2 text-sm" />
        </Link>
      </div>
    </div>
  );
}
