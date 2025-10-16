import React from 'react';
import { FiUser, FiUsers, FiSettings, FiCheckCircle } from 'react-icons/fi';

const ModulesSection = () => {
  const modules = [
    {
      icon: <FiUser className="w-12 h-12" />,
      title: 'Employee Portal',
      description: 'Designed for team members to manage their work life effortlessly',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Apply for leaves with calendar selection',
        'View leave balance and history',
        'Mark daily attendance (Check-in/Check-out)',
        'View attendance records and work hours',
        'Update personal profile information',
        'Dashboard with quick statistics'
      ]
    },
    {
      icon: <FiUsers className="w-12 h-12" />,
      title: 'HR Dashboard',
      description: 'Comprehensive tools for HR professionals to manage workforce',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Review and approve/reject leave requests',
        'Monitor employee attendance patterns',
        'View detailed employee database',
        'Generate attendance and leave reports',
        'Track department-wise statistics',
        'Manage employee information'
      ]
    },
    {
      icon: <FiSettings className="w-12 h-12" />,
      title: 'Admin Console',
      description: 'Complete control panel for system administrators',
      color: 'from-orange-500 to-red-500',
      features: [
        'Manage user accounts and roles',
        'Configure company holidays and events',
        'Define and update leave policies',
        'System-wide analytics and insights',
        'User activity monitoring',
        'Platform configuration and settings'
      ]
    }
  ];

  return (
    <section id="modules" className="py-20 bg-white dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Three Specialized Modules
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tailored experiences for every role in your organization
          </p>
        </div>

        {/* Modules Grid */}
        <div className="space-y-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-dark-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-border"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Icon & Title Section */}
                <div className="flex-shrink-0">
                  <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${module.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {module.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {module.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    {module.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <FiCheckCircle className={`w-5 h-5 mt-1 flex-shrink-0 bg-gradient-to-r ${module.color} bg-clip-text text-transparent`} />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border border-green-200 dark:border-green-800">
            <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Seamless role switching with secure JWT authentication
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
