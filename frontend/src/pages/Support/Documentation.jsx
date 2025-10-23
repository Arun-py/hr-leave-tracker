import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import background12 from '../../assets/images/background12.jpg';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const sections = {
    overview: {
      title: 'System Overview',
      icon: '🏗️',
      content: [
        { subtitle: 'Architecture', text: 'HR Leave Tracker is built on the MERN stack (MongoDB, Express.js, React, Node.js) with a RESTful API architecture. The frontend is a Single Page Application (SPA) built with React 18 and Tailwind CSS, while the backend uses Express.js with MongoDB Atlas for data persistence.' },
        { subtitle: 'Key Features', text: 'Leave Management: Apply, approve, reject leave requests with email notifications. Attendance Tracking: Daily attendance with analytics and reporting. Employee Management: CRUD operations for employee data. Holiday Calendar: Indian public holidays with custom company holidays. Role-Based Access: Admin, HR, and Employee roles with different permissions.' },
        { subtitle: 'Technology Stack', text: 'Frontend: React 18.2, React Router v6, Tailwind CSS, Chart.js, React-Toastify. Backend: Node.js 18+, Express.js, MongoDB Atlas, JWT Authentication. Tools: VS Code, Git, npm, MongoDB Compass.' }
      ]
    },
    installation: {
      title: 'Installation & Setup',
      icon: '⚙️',
      content: [
        { subtitle: '1. Prerequisites', text: 'Node.js 18+ and npm, MongoDB Atlas account (or local MongoDB), Git for version control.' },
        { subtitle: '2. Clone Repository', text: 'Run: git clone https://github.com/your-org/hr-leave-tracker.git\ncd hr-leave-tracker' },
        { subtitle: '3. Backend Setup', text: 'cd backend\nnpm install\nCreate .env file with: MONGO_URI, JWT_SECRET, PORT, EMAIL_USER, EMAIL_PASS\nnpm start (runs on port 5000)' },
        { subtitle: '4. Frontend Setup', text: 'cd frontend\nnpm install\nCreate .env with: REACT_APP_API_URL=http://localhost:5000\nnpm start (runs on port 3000)' },
        { subtitle: '5. Database Seeding', text: 'Import sample data from /backend/seeds/ folder using MongoDB Compass or mongoimport command.' }
      ]
    },
    userGuide: {
      title: 'User Guide',
      icon: '📖',
      content: [
        { subtitle: 'Employee Workflow', text: '1. Login with credentials\n2. View dashboard with leave balance and pending requests\n3. Navigate to "Apply Leave" to submit new request\n4. Select dates, leave type, and reason\n5. Submit for HR approval\n6. Track request status in "My Leaves"' },
        { subtitle: 'HR Workflow', text: '1. Login to HR dashboard\n2. View all pending leave requests\n3. Click on request to see details\n4. Approve or reject with remarks\n5. View attendance summary and generate reports\n6. Manage employee records' },
        { subtitle: 'Admin Workflow', text: '1. Access admin panel\n2. Manage all users and roles\n3. Configure leave policies and quotas\n4. Declare company holidays\n5. Monitor system health and logs\n6. Export data and reports' }
      ]
    },
    api: {
      title: 'API Overview',
      icon: '🔌',
      content: [
        { subtitle: 'Base URL', text: 'http://localhost:5000/api' },
        { subtitle: 'Authentication', text: 'All API endpoints require JWT token in Authorization header: "Bearer <token>". Token expires in 30 days. Obtain token via POST /api/auth/login.' },
        { subtitle: 'Response Format', text: 'All responses are in JSON format. Success: { success: true, data: {...} }\nError: { success: false, message: "Error description" }' },
        { subtitle: 'Rate Limiting', text: 'API is rate-limited to 100 requests per 15 minutes per IP address. Enterprise plans have higher limits.' },
        { subtitle: 'Endpoint Categories', text: 'Authentication: /api/auth/*\nLeaves: /api/leaves/*\nUsers: /api/users/*\nAttendance: /api/attendance/*\nHolidays: /api/holidays/*\n\nFor detailed endpoint documentation, see API Reference.' }
      ]
    },
    deployment: {
      title: 'Deployment',
      icon: '🚀',
      content: [
        { subtitle: 'Production Build', text: 'Frontend: cd frontend && npm run build (creates optimized /build folder)\nBackend: Set NODE_ENV=production in .env' },
        { subtitle: 'Hosting Options', text: 'Frontend: Vercel, Netlify, AWS S3 + CloudFront\nBackend: Heroku, AWS EC2, DigitalOcean, Railway\nDatabase: MongoDB Atlas (recommended)' },
        { subtitle: 'Environment Variables', text: 'Ensure all production URLs and secrets are configured in hosting platform environment variables. Never commit .env files to Git.' },
        { subtitle: 'SSL Certificate', text: 'Use Let\'s Encrypt for free SSL certificates. Most hosting platforms provide automatic SSL.' },
        { subtitle: 'Monitoring', text: 'Set up error tracking with Sentry or LogRocket. Use PM2 for Node.js process management.' }
      ]
    },
    troubleshooting: {
      title: 'Troubleshooting',
      icon: '🔧',
      content: [
        { subtitle: 'Login Issues', text: 'Check credentials are correct. Verify backend server is running on port 5000. Clear browser cookies and cache. Check MongoDB connection in backend logs.' },
        { subtitle: 'API Errors', text: 'Verify JWT token is valid and not expired. Check API endpoint URLs match backend routes. Ensure CORS is enabled in backend. Check network tab in browser DevTools.' },
        { subtitle: 'Database Connection', text: 'Verify MONGO_URI in .env is correct. Check MongoDB Atlas IP whitelist includes your IP. Test connection with MongoDB Compass.' },
        { subtitle: 'Build Errors', text: 'Delete node_modules and package-lock.json, then run npm install again. Check Node.js version is 18+. Ensure all dependencies are installed.' },
        { subtitle: 'Charts Not Rendering', text: 'Verify chart.js and react-chartjs-2 are installed. Check console for JavaScript errors. Ensure data format matches Chart.js requirements.' }
      ]
    }
  };

  const sectionKeys = Object.keys(sections);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${background12})` }}>
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Documentation</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Complete system documentation and guides</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Documentation</h3>
              <nav className="space-y-2">
                {sectionKeys.map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      activeSection === key
                        ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{sections[key].icon}</span>
                    {sections[key].title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
                <span className="text-4xl">{sections[activeSection].icon}</span>
                {sections[activeSection].title}
              </h2>
              <div className="space-y-6">
                {sections[activeSection].content.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.subtitle}</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Link to="/support/community" className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-3xl mb-2">�</div>
                <h3 className="text-xl font-bold mb-2">Community Forum</h3>
                <p className="text-sm opacity-90">Connect with other users</p>
              </Link>
              <Link to="/support/help" className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-3xl mb-2">❓</div>
                <h3 className="text-xl font-bold mb-2">Help Center</h3>
                <p className="text-sm opacity-90">FAQs and troubleshooting guides</p>
              </Link>
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
    </div>
  );
};

export default Documentation;
