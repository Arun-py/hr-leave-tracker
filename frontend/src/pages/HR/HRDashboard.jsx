import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import DashboardCard from '../../components/DashboardCard';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { formatDate } from '../../services/dateUtils';
import logo from '../../assets/images/logo.png';

const HRDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentLeaves, setRecentLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not HR
  useEffect(() => {
    if (user && user.role !== 'HR') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchHRDashboard();
  }, []);

  const fetchHRDashboard = async () => {
    try {
      const { data } = await api.get('/hr/dashboard');
      setStats(data);
      setRecentLeaves(data.recentLeaves || []);
    } catch (error) {
      console.error('Failed to fetch HR dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (user?.role !== 'HR') return null;

  return (
    <div className="p-6">
      {/* Welcome Section with Logo */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            HR Dashboard 👔
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage employee leaves and attendance
          </p>
        </div>
        <img src={logo} alt="HR Leave Tracker" className="h-16 w-auto" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Employees"
          value={stats?.totalEmployees || 0}
          icon={FiUsers}
          color="blue"
          subtitle={`${stats?.activeEmployees || 0} active`}
        />
        <DashboardCard
          title="Pending Approvals"
          value={stats?.pendingLeaves || 0}
          icon={FiAlertCircle}
          color="yellow"
          subtitle="Require action"
          onClick={() => navigate('/hr/leave-requests')}
        />
        <DashboardCard
          title="Today's Attendance"
          value={stats?.todayAttendance || 0}
          icon={FiClock}
          color="green"
          subtitle="Present today"
        />
        <DashboardCard
          title="Active Employees"
          value={stats?.activeEmployees || 0}
          icon={FiCheckCircle}
          color="purple"
          subtitle="Currently working"
        />
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Leave Requests
          </h2>
          <button
            onClick={() => navigate('/hr/leave-requests')}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
          >
            View All
          </button>
        </div>

        {recentLeaves.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No recent leave requests</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Employee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Leave Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {recentLeaves.slice(0, 10).map((leave) => (
                  <tr key={leave._id} className="hover:bg-gray-50 dark:hover:bg-dark-hover">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {leave.user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {leave.user?.employeeId}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {leave.leaveType}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                      <br />
                      <span className="text-xs">({leave.duration} days)</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          leave.status === 'Approved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : leave.status === 'Rejected'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {leave.status === 'Pending' && (
                        <button
                          onClick={() => navigate(`/hr/leave-requests?id=${leave._id}`)}
                          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;
