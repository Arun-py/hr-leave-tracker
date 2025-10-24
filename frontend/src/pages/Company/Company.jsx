import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import background8 from '../../assets/images/background8.jpg';

const Company = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${background8})` }}>
      {/* Blur overlay for background */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/20"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Company Logo" className="h-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              HR Leave Tracker
            </span>
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link to="/company/about" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link to="/company/careers" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Careers
            </Link>
            <Link to="/company/contact" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        ) : (
        <>
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Welcome to Our Company
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Transforming HR Management with Innovation and Excellence
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 border-l-4 border-yellow-500 transform hover:scale-105 transition-all duration-300 animate-slideUp">
            <div className="text-4xl mb-4 animate-bounce-slow">🎯</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To be the global leader in HR management solutions, empowering organizations 
              worldwide to create better workplaces through innovative technology and 
              exceptional service.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl mb-4 animate-bounce-slow">🚀</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To simplify and streamline HR processes, enabling businesses to focus on 
              what matters most - their people. We deliver cutting-edge solutions that 
              enhance productivity and employee satisfaction.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-8">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-scaleIn">
              <div className="text-5xl mb-3 animate-pulse-slow">💡</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Innovation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Constantly evolving and improving
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl mb-3 animate-pulse-slow">🤝</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Integrity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Trust and transparency in everything
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl mb-3 animate-pulse-slow">⭐</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Excellence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Striving for the highest quality
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl mb-3 animate-pulse-slow">🌍</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Impact</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Making a difference globally
              </p>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white dark:bg-gray-800 animate-fadeIn rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-6">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Leave Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive leave tracking and approval workflows
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Attendance Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time attendance monitoring and analytics
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Employee Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete employee lifecycle management
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Analytics & Reports
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Data-driven insights for better decisions
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Security & Compliance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enterprise-grade security and data protection
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Mobile Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manage HR tasks on-the-go from any device
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg shadow-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your HR?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of companies already using our platform
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
        </>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 HR Leave Tracker. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link to="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Company;
