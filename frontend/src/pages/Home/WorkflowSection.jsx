import React from 'react';
import { FiUserPlus, FiCheckSquare, FiEye, FiPieChart, FiArrowRight } from 'react-icons/fi';

const WorkflowSection = () => {
  const steps = [
    {
      icon: <FiUserPlus className="w-10 h-10" />,
      title: 'Employee Applies',
      description: 'Team members submit leave requests or mark attendance through their dedicated portal',
      color: 'from-blue-500 to-cyan-500',
      badge: 'Step 1'
    },
    {
      icon: <FiCheckSquare className="w-10 h-10" />,
      title: 'HR Reviews',
      description: 'HR department reviews requests, checks eligibility, and approves or rejects with comments',
      color: 'from-purple-500 to-pink-500',
      badge: 'Step 2'
    },
    {
      icon: <FiEye className="w-10 h-10" />,
      title: 'Admin Monitors',
      description: 'System administrators oversee operations, manage policies, and ensure compliance',
      color: 'from-orange-500 to-red-500',
      badge: 'Step 3'
    },
    {
      icon: <FiPieChart className="w-10 h-10" />,
      title: 'Reports Generated',
      description: 'Automated analytics and insights help drive data-driven HR decisions',
      color: 'from-green-500 to-emerald-500',
      badge: 'Step 4'
    }
  ];

  return (
    <section id="workflow" className="py-20 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Streamlined workflow from request to report in four simple steps
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-border group hover:scale-105">
                  {/* Badge */}
                  <div className="absolute -top-4 left-6">
                    <span className={`inline-block px-4 py-1 bg-gradient-to-r ${step.color} text-white text-sm font-bold rounded-full shadow-md`}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${step.color} text-white mb-4 mt-4 group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <FiArrowRight className="w-8 h-8 text-gray-400 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Key Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                90%
              </div>
              <p className="text-gray-700 dark:text-gray-300">Faster Request Processing</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-700 dark:text-gray-300">Accuracy in Records</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-gray-700 dark:text-gray-300">Access Anytime, Anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
