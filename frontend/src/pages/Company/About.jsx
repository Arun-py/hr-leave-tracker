import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import background6 from '../../assets/images/background6.jpg';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${background6})` }}>
      <div className="absolute inset-0 backdrop-blur-xl bg-black/20"></div>
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
            <Link to="/company" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Company
            </Link>
            <Link to="/careers" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Careers
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48"></div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48"></div>
            </div>
            <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64"></div>
          </div>
        ) : (
          <>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-8 text-center">
          About Us
        </h1>

        {/* Our Story */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideUp rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Founded in 2020, HR Leave Tracker was born from a simple observation: HR teams spend too much time 
            on manual leave management and attendance tracking. We envisioned a world where technology handles 
            the mundane, allowing HR professionals to focus on what truly matters - building great company cultures 
            and supporting employees.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Today, we serve over 1,000+ companies worldwide, from startups to enterprises, helping them streamline 
            their HR operations and create better workplace experiences.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8 text-center">
            Meet Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideUp rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                AK
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">Arun Kumar</h3>
              <p className="text-orange-600 font-semibold mb-2">Chief Executive Officer</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                15+ years experience in SaaS and HR technology
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideUp rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                PS
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">Priya Sharma</h3>
              <p className="text-orange-600 font-semibold mb-2">Chief Technology Officer</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Former lead engineer at Fortune 500 tech companies
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideUp rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                RG
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">Rajesh Gupta</h3>
              <p className="text-orange-600 font-semibold mb-2">Chief Operations Officer</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                MBA from IIM, specialist in operational excellence
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg shadow-xl p-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Impact in Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">1,000+</div>
              <div className="text-lg opacity-90">Companies</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50,000+</div>
              <div className="text-lg opacity-90">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-lg opacity-90">Uptime</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Support</div>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideUp rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-6">
            What We Do
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
                  Leave Management System
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Automated leave requests, approvals, and tracking with real-time balance updates
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">⏰</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
                  Attendance Tracking
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive attendance monitoring with analytics and insights
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
                  Analytics & Reporting
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced reporting tools to make data-driven HR decisions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">🔐</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
                  Security & Compliance
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enterprise-grade security with full compliance to data protection regulations
                </p>
              </div>
            </div>
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
        </div>
      </footer>
      </div>
    </div>
  );
};

export default About;
