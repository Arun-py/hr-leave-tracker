import React from 'react';
import { FiMonitor, FiSmartphone } from 'react-icons/fi';

const ScreenshotsSection = () => {
  const screenshots = [
    {
      title: 'Employee Dashboard',
      description: 'Clean and intuitive interface for managing leaves and attendance',
      badge: 'Employee Portal'
    },
    {
      title: 'HR Dashboard',
      description: 'Comprehensive tools for reviewing requests and managing workforce',
      badge: 'HR Portal'
    },
    {
      title: 'Admin Console',
      description: 'Powerful analytics and system management capabilities',
      badge: 'Admin Portal'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Beautiful & Functional UI
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Designed for productivity with a modern, responsive interface
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-dark-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-border"
            >
              {/* Badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold rounded-full">
                  {screenshot.badge}
                </span>
              </div>

              {/* Placeholder for Screenshot */}
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl h-48 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FiMonitor className="w-16 h-16 text-gray-400 dark:text-gray-600" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {screenshot.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400">
                {screenshot.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features Highlight */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Desktop Experience */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <FiMonitor className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Desktop Optimized
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Full-featured experience with advanced charts, data tables, and comprehensive dashboards for detailed analysis.
                </p>
              </div>
            </div>

            {/* Mobile Experience */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <FiSmartphone className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Mobile Responsive
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Fully responsive design ensures seamless experience on tablets and smartphones for on-the-go access.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* UI Features List */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Dark Mode</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Theme Support</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Charts</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Visual Analytics</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Real-time</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Live Updates</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">Intuitive</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Easy Navigation</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
