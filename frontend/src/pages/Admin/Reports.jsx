import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';
import { FiDownload, FiFilter, FiCalendar, FiUsers, FiClock } from 'react-icons/fi';

const Reports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({
    leaveReports: [],
    attendanceReports: [],
    userStats: null
  });
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
    reportType: 'leave'
  });

  useEffect(() => {
    if (user && user.role !== 'Admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/dashboard');
      setReportData({
        leaveReports: [],
        attendanceReports: [],
        userStats: data
      });
    } catch (error) {
      console.error('Failed to fetch report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    alert(`Exporting report as ${format}...`);
  };

  if (user?.role !== 'Admin') return null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Generate and download comprehensive reports
          </p>
        </div>
        <img src={logo} alt="HR Leave Tracker" className="h-16 w-auto" />
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter className="text-orange-600" size={20} />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Filters
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Report Type
            </label>
            <select
              value={filters.reportType}
              onChange={(e) => setFilters({ ...filters, reportType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-dark-bg dark:text-gray-200"
            >
              <option value="leave">Leave Reports</option>
              <option value="attendance">Attendance Reports</option>
              <option value="user">User Statistics</option>
              <option value="department">Department Analysis</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-dark-bg dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-dark-bg dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Department
            </label>
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-dark-bg dark:text-gray-200"
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Customer Support">Customer Support</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={fetchReportData}
            className="px-6 py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
          >
            Generate Report
          </button>
          <button
            onClick={() => setFilters({ startDate: '', endDate: '', department: '', reportType: 'leave' })}
            className="px-6 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                {reportData.userStats?.totalUsers || 0}
              </p>
            </div>
            <FiUsers className="text-yellow-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Leaves</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {reportData.userStats?.totalLeaveRequests || 0}
              </p>
            </div>
            <FiCalendar className="text-orange-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Requests</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {reportData.userStats?.pendingLeaveRequests || 0}
              </p>
            </div>
            <FiClock className="text-amber-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Attendance Records</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {reportData.userStats?.totalAttendanceRecords || 0}
              </p>
            </div>
            <FiUsers className="text-yellow-600" size={40} />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-2 mb-4">
          <FiDownload className="text-orange-600" size={20} />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Export Reports
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <FiDownload size={20} />
            <span className="font-medium">Export as PDF</span>
          </button>

          <button
            onClick={() => handleExport('Excel')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <FiDownload size={20} />
            <span className="font-medium">Export as Excel</span>
          </button>

          <button
            onClick={() => handleExport('CSV')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <FiDownload size={20} />
            <span className="font-medium">Export as CSV</span>
          </button>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">💡 Tip:</span> Use the filters above to customize your report before exporting. 
            You can generate reports for specific date ranges, departments, or report types.
          </p>
        </div>
      </div>

      {/* Report Preview */}
      <div className="mt-6 bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Report Preview
        </h2>
        
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <FiCalendar size={48} className="mx-auto mb-4 opacity-50" />
          <p>Select filters and click "Generate Report" to view the data</p>
          <p className="text-sm mt-2">Reports include leave summaries, attendance analytics, and user statistics</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
