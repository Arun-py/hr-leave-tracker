import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import background10 from '../../assets/images/background10.jpg';

const Blog = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const articles = [
    {
      id: 1,
      title: "10 Best Practices for Leave Management in 2025",
      category: "HR Management",
      date: "October 15, 2025",
      author: "Priya Sharma",
      excerpt: "Discover the latest strategies for managing employee leave requests efficiently and maintaining workplace productivity.",
      image: "📊",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Build a Strong Remote Work Culture",
      category: "Remote Work",
      date: "October 10, 2025",
      author: "Rajesh Gupta",
      excerpt: "Learn effective techniques for fostering team collaboration and engagement in distributed work environments.",
      image: "🏠",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Future of HR Technology: AI and Automation",
      category: "Technology",
      date: "October 5, 2025",
      author: "Arun Kumar",
      excerpt: "Explore how artificial intelligence is revolutionizing human resources management and employee experience.",
      image: "🤖",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Employee Wellness Programs That Actually Work",
      category: "Wellness",
      date: "September 28, 2025",
      author: "Priya Sharma",
      excerpt: "Proven wellness initiatives that improve employee health, happiness, and overall productivity.",
      image: "💪",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Compliance Guide: Labor Laws Every HR Should Know",
      category: "Compliance",
      date: "September 20, 2025",
      author: "Rajesh Gupta",
      excerpt: "Stay updated with the latest labor law changes and ensure your organization remains compliant.",
      image: "⚖️",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "Maximizing ROI with HR Analytics",
      category: "Analytics",
      date: "September 15, 2025",
      author: "Arun Kumar",
      excerpt: "Leverage data-driven insights to make smarter HR decisions and demonstrate business value.",
      image: "📈",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${background10})` }}>
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
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-80"></div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-80"></div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-80"></div>
            </div>
          </div>
        ) : (
          <>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            HR Insights & Resources
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and best practices in HR management
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <div key={article.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 h-48 flex items-center justify-center text-8xl">
                {article.image}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 hover:text-orange-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    By {article.author}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{article.date}</span>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg shadow-xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-6 opacity-90">
            Get the latest HR insights delivered directly to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
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

export default Blog;
