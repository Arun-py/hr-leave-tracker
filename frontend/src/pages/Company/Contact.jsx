import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import background11 from '../../assets/images/background11.jpg';
import { showToast } from '../../utils/toast';

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast.success('Thank you for contacting us! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${background11})` }}>
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
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link to="/careers" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Careers
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-96"></div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-96"></div>
            </div>
          </div>
        ) : (
          <>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Address */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                Headquarters
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                <strong>HR Leave Tracker Solutions Pvt. Ltd.</strong><br />
                TIDEL Park, 4th Floor<br />
                Rajiv Gandhi Salai (OMR)<br />
                Taramani, Chennai - 600113<br />
                Tamil Nadu, India
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                Contact Details
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Phone:</strong> +91 44 1234 5678
                </p>
                <p>
                  <strong>Email:</strong> contact@hrleavet racker.com
                </p>
                <p>
                  <strong>Support:</strong> support@hrleavetracker.com
                </p>
                <p>
                  <strong>Sales:</strong> sales@hrleavetracker.com
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM IST
                </p>
                <p>
                  <strong>Saturday:</strong> 9:00 AM - 1:00 PM IST
                </p>
                <p>
                  <strong>Sunday:</strong> Closed
                </p>
                <p className="mt-4 text-sm">
                  24/7 support available for enterprise customers
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg shadow-lg p-8 text-white">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-3">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  📘
                </button>
                <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  🐦
                </button>
                <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  💼
                </button>
                <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  📸
                </button>
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

export default Contact;
