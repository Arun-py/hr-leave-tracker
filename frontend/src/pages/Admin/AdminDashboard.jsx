import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/Loader';
import DashboardCard from '../../components/DashboardCard';
import useAuth from '../../hooks/useAuth';
import { FaUsers, FaUserShield, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'Admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get('/admin/dashboard');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch admin dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (user?.role !== 'Admin') return null;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            System overview and administration
          </p>
        </div>
        <img src={logo} alt="HR Leave Tracker" className="h-16 w-auto" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={FaUsers}
          color="blue"
        />
        <DashboardCard
          title="HR Staff"
          value={stats?.hrCount || 0}
          icon={FaUserShield}
          color="purple"
        />
        <DashboardCard
          title="Holidays"
          value={stats?.totalHolidays || 0}
          icon={FaCalendarAlt}
          color="green"
        />
        <DashboardCard
          title="Active Employees"
          value={stats?.activeEmployees || 0}
          icon={FaChartLine}
          color="yellow"
        />
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            User Distribution
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Employees</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                {stats?.employeeCount || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">HR Staff</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {stats?.hrCount || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Admins</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {stats?.adminCount || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Leave Statistics
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Total Requests</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {stats?.totalLeaveRequests || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Pending Approval</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {stats?.pendingLeaveRequests || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Approved This Month</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {stats?.approvedThisMonth || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="mt-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
          System Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-lg shadow hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Attendance Records</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              {stats?.totalAttendanceRecords || 0}
            </p>
          </div>
          <div className="text-center p-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-lg shadow hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Check-ins</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {stats?.todayCheckIns || 0}
            </p>
          </div>
          <div className="text-center p-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-lg shadow hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Upcoming Holidays</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {stats?.upcomingHolidays || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
