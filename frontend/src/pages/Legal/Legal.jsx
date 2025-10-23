import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Legal = () => {
  const legalDocs = [
    {
      title: 'Privacy Policy',
      description: 'Learn how we collect, use, and protect your personal data',
      icon: '🔒',
      link: '/legal/privacy',
      updated: 'Last updated: October 2025'
    },
    {
      title: 'Terms of Service',
      description: 'Understand the terms and conditions of using our platform',
      icon: '📜',
      link: '/legal/terms',
      updated: 'Last updated: October 2025'
    },
    {
      title: 'Cookie Policy',
      description: 'Information about cookies and how we use them',
      icon: '🍪',
      link: '/legal/cookies',
      updated: 'Last updated: October 2025'
    },
    {
      title: 'Disclaimer',
      description: 'Important legal disclaimers and limitations of liability',
      icon: '⚠️',
      link: '/legal/disclaimer',
      updated: 'Last updated: October 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Company Logo" className="h-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              HR Leave Tracker
            </span>
          </Link>
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Legal Information
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Important legal documents and policies governing our services
          </p>
        </div>

        {/* Legal Documents Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {legalDocs.map((doc, index) => (
            <Link
              key={index}
              to={doc.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-6xl mb-4">{doc.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {doc.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {doc.description}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                {doc.updated}
              </p>
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Questions About Our Legal Policies?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have any questions or concerns about our legal policies, please don't hesitate to reach out to our legal team.
          </p>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p><strong>Email:</strong> legal@hrleavetracker.com</p>
            <p><strong>Address:</strong> TIDEL Park, 4th Floor, Taramani, Chennai - 600113, India</p>
          </div>
          <Link
            to="/contact"
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 HR Leave Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Legal;
