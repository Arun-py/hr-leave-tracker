import React from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiBarChart2, 
  FiShield, 
  FiBell,
  FiFileText,
  FiTrendingUp 
} from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: 'Leave Management',
      description: 'Apply, track, and manage leave requests with automated approval workflows and real-time status updates.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: 'Attendance Tracking',
      description: 'Record daily attendance with check-in/check-out functionality and automatic work hours calculation.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Role-Based Access',
      description: 'Secure portals for Employees, HR, and Admins with customized features and permissions.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights with interactive charts, KPIs, and detailed reports for data-driven decisions.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Employee Management',
      description: 'Complete employee database with profiles, departments, designations, and performance tracking.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <FiBell className="w-8 h-8" />,
      title: 'Real-Time Notifications',
      description: 'Instant alerts for leave approvals, attendance updates, and important announcements.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: 'Policy Management',
      description: 'Define and manage company policies, holidays, and leave types with flexible configurations.',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Advanced Reporting',
      description: 'Generate detailed reports for attendance patterns, leave trends, and department analytics.',
      color: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to manage your workforce efficiently in one comprehensive platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-border hover:scale-105"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Ready to transform your HR operations?
          </p>
          <a
            href="#modules"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all shadow-md hover:shadow-lg"
          >
            Explore Modules
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
