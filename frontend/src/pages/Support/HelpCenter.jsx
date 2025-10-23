import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import background7 from '../../assets/images/background7.jpg';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('employee');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const faqs = {
    employee: [
      { q: 'How do I apply for leave?', a: 'Navigate to "Apply Leave" from the dashboard. Select leave type, dates, and provide a reason. Your request will be sent to HR for approval.' },
      { q: 'Can I cancel a leave request?', a: 'Yes, you can cancel pending leave requests from the "My Leaves" page before HR approves them.' },
      { q: 'How do I check my leave balance?', a: 'Your leave balance is displayed on the dashboard and in the "Apply Leave" page.' },
      { q: 'What happens if I exceed my leave quota?', a: 'Leave requests exceeding your quota will be flagged and require special approval from HR or Admin.' },
      { q: 'How do I update my profile information?', a: 'Go to "Profile" from the top navigation menu to update your contact details and password.' },
      { q: 'Can I view company holidays?', a: 'Yes, navigate to "Holidays" to view all public holidays and company-declared holidays for the year.' }
    ],
    hr: [
      { q: 'How do I approve/reject leave requests?', a: 'Go to "Leave Requests" to view all pending requests. Click on a request to view details and approve or reject with a remark.' },
      { q: 'Can I view employee attendance?', a: 'Yes, use the "Attendance Summary" page to view daily attendance, trends, and generate reports by department.' },
      { q: 'How do I add a new employee?', a: 'Navigate to "Manage Employees" and click "Add Employee" to create new employee accounts with role assignment.' },
      { q: 'Can I edit employee leave balances?', a: 'Yes, from the "Manage Employees" page, you can edit individual employee leave quotas and balances.' },
      { q: 'How do I generate reports?', a: 'Use the "Attendance Summary" and "Reports" sections to generate PDF/Excel reports filtered by date, department, or employee.' },
      { q: 'Can I declare company holidays?', a: 'Yes, HR can add custom company holidays from the "Holidays" page in addition to public holidays.' }
    ],
    admin: [
      { q: 'How do I manage user roles?', a: 'From "Manage Employees", click on any user to edit their role (Employee, HR, Admin) and permissions.' },
      { q: 'Can I configure leave policies?', a: 'Yes, navigate to "Settings" to configure annual leave quotas, leave types, and approval workflows.' },
      { q: 'How do I backup system data?', a: 'Use the "Settings" > "Data Management" section to schedule automatic backups or manually export database dumps.' },
      { q: 'Can I integrate with other systems?', a: 'Yes, refer to the API Reference for integration endpoints. Contact support for SSO integration.' },
      { q: 'How do I monitor system health?', a: 'The Admin dashboard shows system metrics, active users, database status, and error logs.' },
      { q: 'Can I customize email notifications?', a: 'Yes, go to "Settings" > "Notifications" to customize email templates and notification triggers.' }
    ],
    technical: [
      { q: 'What browsers are supported?', a: 'We support the latest versions of Chrome, Firefox, Edge, and Safari. For best experience, use Chrome or Edge.' },
      { q: 'Is there a mobile app?', a: 'Currently, we offer a responsive web application. Native mobile apps are in development.' },
      { q: 'How is my data secured?', a: 'We use AES-256 encryption, secure HTTPS connections, JWT authentication, and regular security audits. See Privacy Policy for details.' },
      { q: 'What should I do if I forget my password?', a: 'Click "Forgot Password" on the login page. You will receive a password reset link via email.' },
      { q: 'Why am I getting login errors?', a: 'Ensure you are using the correct email and password. Clear browser cache and cookies. If the issue persists, contact IT support.' },
      { q: 'Can I access the system from multiple devices?', a: 'Yes, you can access your account from any device. Only one active session is allowed at a time for security.' }
    ]
  };

  const categories = [
    { key: 'employee', label: 'For Employees', icon: '👤' },
    { key: 'hr', label: 'For HR', icon: '👔' },
    { key: 'admin', label: 'For Admins', icon: '⚡' },
    { key: 'technical', label: 'Technical', icon: '💻' }
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${background7})` }}>
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Help Center</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Frequently Asked Questions</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setExpandedQuestion(null); }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          {faqs[activeCategory].map((faq, idx) => (
            <div key={idx} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md mb-4 overflow-hidden">
              <button
                onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-semibold text-gray-800 dark:text-gray-200">{faq.q}</span>
                <span className="text-2xl text-orange-600">{expandedQuestion === idx ? '−' : '+'}</span>
              </button>
              {expandedQuestion === idx && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Can't find the answer you're looking for? Our support team is here to assist you.</p>
          <Link to="/company/contact" className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Contact Support
          </Link>
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

export default HelpCenter;
