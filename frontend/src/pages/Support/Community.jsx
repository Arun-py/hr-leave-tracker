import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import background13 from '../../assets/images/background13.jpg';
import { showToast } from '../../utils/toast';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const discussions = [
    { id: 1, title: 'Best practices for leave approval workflow?', author: 'Priya Sharma', category: 'HR Tips', replies: 12, views: 245, lastActive: '2 hours ago', status: 'Active' },
    { id: 2, title: 'How to configure custom leave types?', author: 'Amit Kumar', category: 'Technical', replies: 8, views: 156, lastActive: '5 hours ago', status: 'Answered' },
    { id: 3, title: 'Attendance tracking for remote employees', author: 'Rajesh Patel', category: 'Remote Work', replies: 15, views: 389, lastActive: '1 day ago', status: 'Active' },
    { id: 4, title: 'Integration with payroll systems', author: 'Sneha Reddy', category: 'Integration', replies: 6, views: 178, lastActive: '2 days ago', status: 'Active' },
    { id: 5, title: 'Annual leave policy recommendations', author: 'Vikram Singh', category: 'HR Tips', replies: 20, views: 512, lastActive: '3 days ago', status: 'Answered' }
  ];

  const resources = [
    { title: 'Getting Started Guide', type: 'Tutorial', author: 'Admin Team', downloads: 1234, icon: '📘' },
    { title: 'Leave Policy Templates', type: 'Template', author: 'HR Community', downloads: 856, icon: '📄' },
    { title: 'API Integration Examples', type: 'Code', author: 'Dev Team', downloads: 423, icon: '💻' },
    { title: 'Monthly Reports Dashboard', type: 'Template', author: 'Analytics Team', downloads: 678, icon: '📊' }
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      showToast.error('Please fill in all fields');
      return;
    }
    showToast.success('Discussion posted successfully!');
    setNewPost({ title: '', content: '', category: 'General' });
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${background13})` }}>
      <div className="absolute inset-0 backdrop-blur-xl bg-black/20"></div>
      <div className="relative z-10">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">HR Leave Tracker</span>
          </Link>
          <Link to="/support" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">← Back to Support</Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Community Forum</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Connect, share, and learn with other HR professionals</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'discussions'
                ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            💬 Discussions
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'resources'
                ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            📦 Resources
          </button>
          <button
            onClick={() => setActiveTab('newpost')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'newpost'
                ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            ✏️ New Post
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Discussions Tab */}
          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {discussions.map(disc => (
                <div key={disc.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{disc.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>👤 {disc.author}</span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">{disc.category}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      disc.status === 'Answered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {disc.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mt-4">
                    <span>💬 {disc.replies} replies</span>
                    <span>👁️ {disc.views} views</span>
                    <span>🕒 Last active {disc.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((res, idx) => (
                <div key={idx} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="text-5xl mb-4">{res.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{res.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">{res.type}</span>
                    <span>by {res.author}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">⬇️ {res.downloads} downloads</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-shadow">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Post Tab */}
          {activeTab === 'newpost' && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Start a New Discussion</h2>
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-orange-500"
                  >
                    <option>General</option>
                    <option>HR Tips</option>
                    <option>Technical</option>
                    <option>Remote Work</option>
                    <option>Integration</option>
                    <option>Feature Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Enter discussion title..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows="8"
                    placeholder="Write your question or start a discussion..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Post Discussion
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">📋 Community Guidelines</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Be respectful and professional in all interactions</li>
            <li>Search before posting to avoid duplicate discussions</li>
            <li>Provide clear and descriptive titles for your posts</li>
            <li>Stay on topic and relevant to HR Leave Tracker</li>
            <li>No spam, self-promotion, or commercial advertising</li>
            <li>Protect confidential information - don't share sensitive data</li>
            <li>Help others by sharing your knowledge and experience</li>
            <li>Report inappropriate content to moderators</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Violations of these guidelines may result in warnings or account suspension. Contact <strong>community@hrleavetracker.com</strong> for questions.
          </p>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 HR Leave Tracker. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Community;
