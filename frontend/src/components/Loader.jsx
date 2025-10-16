import React from 'react';

const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`
          ${sizeClasses[size]}
          border-gray-200 dark:border-gray-700
          border-t-primary-500
          rounded-full
          animate-spin
        `}
      />
    </div>
  );
};

export default Loader;
