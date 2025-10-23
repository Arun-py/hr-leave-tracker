import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Support = () => {
  const supportOptions = [
    { title: 'Help Center', icon: '❓', link: '/support/help', description: 'FAQs, guides, and troubleshooting for all user roles' },
    { title: 'Documentation', icon: '📚', link: '/support/docs', description: 'Complete system documentation and setup guides' },
    { title: 'Community Forum', icon: '👥', link: '/support/community', description: 'Connect with other users and share knowledge' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">HR Leave Tracker</span>
          </Link>
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">← Back to Home</Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Support Center</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">We're here to help! Choose from our support resources below.</p>
        </div>

        {/* Support Options Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {supportOptions.map((option, idx) => (
            <Link key={idx} to={option.link} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-6xl mb-4">{option.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{option.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
            </Link>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg shadow-xl p-12 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-lg mb-6 opacity-90">Our support team is available 24/7 for enterprise customers</p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-2">📧</div>
              <h3 className="font-bold mb-1">Email Support</h3>
              <p className="text-sm opacity-90">support@hrleavetracker.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-bold mb-1">Live Chat</h3>
              <p className="text-sm opacity-90">Available 9 AM - 6 PM IST</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-bold mb-1">Phone Support</h3>
              <p className="text-sm opacity-90">+91 44 1234 5678</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 HR Leave Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Support;
