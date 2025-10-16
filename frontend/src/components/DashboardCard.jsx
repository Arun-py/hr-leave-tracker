import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, color = 'blue', subtitle, onClick }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    yellow: 'from-yellow-400 to-orange-500',
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-pink-600',
    purple: 'from-purple-500 to-indigo-600',
    orange: 'from-orange-500 to-red-500',
    primary: 'from-yellow-400 to-orange-500',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-dark-card rounded-lg shadow-md p-6
        border border-gray-200 dark:border-dark-border
        transition-all duration-300 hover:shadow-lg
        ${onClick ? 'cursor-pointer hover:scale-105' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-full bg-gradient-to-r ${colorClasses[color] || colorClasses.blue}`}>
            {typeof Icon === 'function' ? <Icon className="text-white" size={24} /> : Icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
