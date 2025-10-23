import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const APIReference = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('auth');

  const endpoints = {
    auth: {
      title: 'Authentication',
      icon: '🔐',
      routes: [
        {
          method: 'POST',
          path: '/api/auth/login',
          description: 'Login with email and password to obtain JWT token',
          body: { email: 'user@company.com', password: 'password123' },
          response: { success: true, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', user: { id: '123', name: 'John Doe', role: 'Employee' } }
        },
        {
          method: 'POST',
          path: '/api/auth/register',
          description: 'Register new user (Admin only)',
          body: { name: 'Jane Smith', email: 'jane@company.com', password: 'secure123', role: 'Employee', department: 'Engineering' },
          response: { success: true, message: 'User registered successfully', userId: '124' }
        },
        {
          method: 'GET',
          path: '/api/auth/me',
          description: 'Get current logged-in user details',
          headers: { Authorization: 'Bearer <token>' },
          response: { success: true, user: { id: '123', name: 'John Doe', email: 'john@company.com', role: 'Employee', department: 'Engineering' } }
        }
      ]
    },
    leaves: {
      title: 'Leave Management',
      icon: '🏖️',
      routes: [
        {
          method: 'GET',
          path: '/api/leaves',
          description: 'Get all leave requests (role-based filtering)',
          headers: { Authorization: 'Bearer <token>' },
          response: { success: true, leaves: [{ id: '1', employeeId: '123', type: 'Casual', startDate: '2025-02-01', endDate: '2025-02-03', status: 'Pending', reason: 'Personal work' }] }
        },
        {
          method: 'POST',
          path: '/api/leaves',
          description: 'Apply for leave',
          headers: { Authorization: 'Bearer <token>' },
          body: { type: 'Sick', startDate: '2025-02-10', endDate: '2025-02-11', reason: 'Medical appointment' },
          response: { success: true, message: 'Leave request submitted', leaveId: '2' }
        },
        {
          method: 'PATCH',
          path: '/api/leaves/:id/approve',
          description: 'Approve leave request (HR/Admin only)',
          headers: { Authorization: 'Bearer <token>' },
          body: { remarks: 'Approved as per policy' },
          response: { success: true, message: 'Leave approved successfully' }
        },
        {
          method: 'PATCH',
          path: '/api/leaves/:id/reject',
          description: 'Reject leave request (HR/Admin only)',
          headers: { Authorization: 'Bearer <token>' },
          body: { remarks: 'Insufficient leave balance' },
          response: { success: true, message: 'Leave rejected' }
        },
        {
          method: 'DELETE',
          path: '/api/leaves/:id',
          description: 'Cancel leave request (Employee) or delete (Admin)',
          headers: { Authorization: 'Bearer <token>' },
          response: { success: true, message: 'Leave request cancelled' }
        }
      ]
    },
    users: {
      title: 'User Management',
      icon: '👥',
      routes: [
        {
          method: 'GET',
          path: '/api/users',
          description: 'Get all users (HR/Admin only)',
          headers: { Authorization: 'Bearer <token>' },
          response: { success: true, users: [{ id: '123', name: 'John Doe', email: 'john@company.com', role: 'Employee', department: 'Engineering', leaveBalance: { casual: 12, sick: 7, earned: 15 } }] }
        },
        {
          method: 'GET',
          path: '/api/users/:id',
          description: 'Get user by ID',
          headers: { Authorization: 'Bearer <token>' },
          response: { success: true, user: { id: '123', name: 'John Doe', email: 'john@company.com', phone: '+91 9876543210', department: 'Engineering', role: 'Employee' } }
        },
        {
          method: 'PUT',
          path: '/api/users/:id',
          description: 'Update user details (Admin only)',
          headers: { Authorization: 'Bearer <token>' },
          body: { name: 'John Smith', phone: '+91 9123456789', department: 'Marketing' },
          response: { success: true, message: 'User updated successfully' }
        },
        {
          method: 'DELETE',
          path: '/api/users/:id',
          description: 'Delete user (Admin only)',
          headers: { Authorization: 'Bearer <token>' },
          response: { success: true, message: 'User deleted successfully' }
        }
      ]
    },
    attendance: {
      title: 'Attendance',
      icon: '📊',
      routes: [
        {
          method: 'GET',
          path: '/api/attendance',
          description: 'Get attendance records',
          headers: { Authorization: 'Bearer <token>' },
          query: { startDate: '2025-01-01', endDate: '2025-01-31', employeeId: '123' },
          response: { success: true, attendance: [{ date: '2025-01-15', status: 'Present', checkIn: '09:15 AM', checkOut: '06:30 PM' }] }
        },
        {
          method: 'POST',
          path: '/api/attendance',
          description: 'Mark attendance (Employee)',
          headers: { Authorization: 'Bearer <token>' },
          body: { status: 'Present', checkIn: '09:00 AM' },
          response: { success: true, message: 'Attendance marked' }
        },
        {
          method: 'GET',
          path: '/api/attendance/summary',
          description: 'Get attendance summary with analytics (HR/Admin)',
          headers: { Authorization: 'Bearer <token>' },
          response: { success: true, summary: { totalEmployees: 43, presentToday: 38, absentToday: 5, avgAttendance: 88.4 } }
        }
      ]
    },
    holidays: {
      title: 'Holidays',
      icon: '🗓️',
      routes: [
        {
          method: 'GET',
          path: '/api/holidays',
          description: 'Get all holidays',
          response: { success: true, holidays: [{ id: '1', name: 'Republic Day', date: '2025-01-26', type: 'Public' }, { id: '2', name: 'Company Anniversary', date: '2025-03-15', type: 'Company' }] }
        },
        {
          method: 'POST',
          path: '/api/holidays',
          description: 'Add company holiday (HR/Admin only)',
          headers: { Authorization: 'Bearer <token>' },
          body: { name: 'Founders Day', date: '2025-04-20', type: 'Company' },
          response: { success: true, message: 'Holiday added', holidayId: '3' }
        },
        {
          method: 'DELETE',
          path: '/api/holidays/:id',
          description: 'Delete company holiday (Admin only)',
          headers: { Authorization: 'Bearer <token>' },
          response: { success: true, message: 'Holiday deleted' }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">API Reference</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">RESTful API Documentation</p>
          <div className="mt-4 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-600 p-4 max-w-3xl mx-auto">
            <p className="text-sm text-gray-800 dark:text-gray-200"><strong>Base URL:</strong> http://localhost:5000/api</p>
            <p className="text-sm text-gray-800 dark:text-gray-200"><strong>Authentication:</strong> Bearer token in Authorization header</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Endpoints</h3>
              <nav className="space-y-2">
                {Object.keys(endpoints).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveEndpoint(key)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      activeEndpoint === key
                        ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{endpoints[key].icon}</span>
                    {endpoints[key].title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
              <span className="text-4xl">{endpoints[activeEndpoint].icon}</span>
              {endpoints[activeEndpoint].title}
            </h2>

            {endpoints[activeEndpoint].routes.map((route, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded font-bold text-sm ${
                    route.method === 'GET' ? 'bg-green-100 text-green-700' :
                    route.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                    route.method === 'PUT' || route.method === 'PATCH' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {route.method}
                  </span>
                  <code className="text-gray-800 dark:text-gray-200 font-mono">{route.path}</code>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{route.description}</p>

                {route.headers && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Headers</h4>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                      <code>{JSON.stringify(route.headers, null, 2)}</code>
                    </pre>
                  </div>
                )}

                {route.query && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Query Parameters</h4>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                      <code>{JSON.stringify(route.query, null, 2)}</code>
                    </pre>
                  </div>
                )}

                {route.body && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Request Body</h4>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                      <code>{JSON.stringify(route.body, null, 2)}</code>
                    </pre>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Response</h4>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                    <code>{JSON.stringify(route.response, null, 2)}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Error Handling</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">All errors follow a consistent format:</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto">
            <code>{JSON.stringify({ success: false, message: 'Error description', error: 'Detailed error message' }, null, 2)}</code>
          </pre>
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Common HTTP Status Codes:</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>200 OK:</strong> Request successful</li>
              <li><strong>201 Created:</strong> Resource created successfully</li>
              <li><strong>400 Bad Request:</strong> Invalid request data</li>
              <li><strong>401 Unauthorized:</strong> Missing or invalid authentication token</li>
              <li><strong>403 Forbidden:</strong> Insufficient permissions</li>
              <li><strong>404 Not Found:</strong> Resource not found</li>
              <li><strong>500 Internal Server Error:</strong> Server error</li>
            </ul>
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

export default APIReference;
