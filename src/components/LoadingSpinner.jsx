import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    white: 'text-white',
    yellow: 'text-yellow-500',
    gray: 'text-gray-400'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${colorClasses[color] || 'text-blue-600'}`}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
