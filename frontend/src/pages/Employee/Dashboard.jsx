import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import DashboardCard from '../../components/DashboardCard';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { formatDate } from '../../services/dateUtils';
import logo from '../../assets/images/logo.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentLeaves, setRecentLeaves] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [leaveStats, leaves, attendance] = await Promise.all([
        api.get('/leaves/stats'),
        api.get('/leaves/my-leaves?limit=5'),
        api.get('/attendance/today'),
      ]);

      setStats(leaveStats.data);
      setRecentLeaves(leaves.data);
      setTodayAttendance(attendance.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await api.post('/attendance/checkin');
      fetchDashboardData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to check in');
    }
  };

  const handleCheckOut = async () => {
    try {
      await api.put('/attendance/checkout');
      fetchDashboardData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to check out');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      {/* Welcome Section with Logo */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what's happening with your leaves and attendance
          </p>
        </div>
        <img src={logo} alt="HR Leave Tracker" className="h-16 w-auto" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Leave Requests"
          value={stats?.totalRequests || 0}
          icon={FiCalendar}
          color="blue"
          subtitle="This year"
        />
        <DashboardCard
          title="Pending Requests"
          value={stats?.pending || 0}
          icon={FiClock}
          color="yellow"
          subtitle="Awaiting approval"
          onClick={() => navigate('/my-leaves')}
        />
        <DashboardCard
          title="Approved Leaves"
          value={stats?.approved || 0}
          icon={FiCheckCircle}
          color="green"
          subtitle={`${stats?.totalDaysTaken || 0} days taken`}
        />
        <DashboardCard
          title="Rejected Requests"
          value={stats?.rejected || 0}
          icon={FiXCircle}
          color="red"
          subtitle="This year"
        />
      </div>

      {/* Attendance Section */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-dark-border">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Today's Attendance
        </h2>
        
        {!todayAttendance?.checkedIn ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't checked in yet today
            </p>
            <button
              onClick={handleCheckIn}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Check In Now
            </button>
          </div>
        ) : !todayAttendance?.checkedOut ? (
          <div className="text-center py-8">
            <p className="text-green-600 dark:text-green-400 mb-2 font-medium">
              ✓ Checked In
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Check-in time: {formatDate(todayAttendance.attendance?.checkIn)}
            </p>
            <button
              onClick={handleCheckOut}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Check Out
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-blue-600 dark:text-blue-400 mb-2 font-medium">
              ✓ Attendance Marked
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Work hours: {todayAttendance.attendance?.workHours?.toFixed(2) || 0} hours
            </p>
          </div>
        )}
      </div>

      {/* Leave Balance */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-dark-border">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Leave Balance
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Casual Leave</p>
            <p className="text-2xl font-bold text-yellow-600">{user?.leaveBalance?.casualLeave || 0}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sick Leave</p>
            <p className="text-2xl font-bold text-blue-600">{user?.leaveBalance?.sickLeave || 0}</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Earned Leave</p>
            <p className="text-2xl font-bold text-green-600">{user?.leaveBalance?.earnedLeave || 0}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Comp Off</p>
            <p className="text-2xl font-bold text-purple-600">{user?.leaveBalance?.compensatoryOff || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Leave Requests
          </h2>
          <button
            onClick={() => navigate('/my-leaves')}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
          >
            View All
          </button>
        </div>

        {recentLeaves.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No leave requests yet</p>
            <button
              onClick={() => navigate('/apply-leave')}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg"
            >
              Apply for Leave
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {recentLeaves.map((leave) => (
                  <tr key={leave._id} className="hover:bg-gray-50 dark:hover:bg-dark-hover">
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
                            : leave.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}
                      >
                        {leave.status}
                      </span>
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

export default Dashboard;
