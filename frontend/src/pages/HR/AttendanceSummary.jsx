import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceSummary = () => {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState(null);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateArrivals: 0,
    avgAttendance: 0,
  });

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      // Fetch dashboard data for stats
      const { data } = await api.get('/hr/dashboard');
      
      // Mock attendance data for charts (replace with real API when available)
      setStats({
        totalEmployees: data.totalEmployees || 43,
        presentToday: 38,
        absentToday: 5,
        lateArrivals: 3,
        avgAttendance: 88,
      });

      setAttendanceData({
        dailyAttendance: [38, 40, 39, 41, 38, 42, 40],
        monthlyTrends: [85, 87, 86, 88, 89, 88, 90, 87, 88, 89, 88, 90],
        departmentWise: {
          labels: ['Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Support'],
          data: [92, 85, 88, 95, 87, 90],
        },
        leaveTypes: {
          labels: ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Work From Home', 'Others'],
          data: [35, 28, 15, 18, 4],
        },
      });
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  // Chart configurations
  const dailyAttendanceChart = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Daily Attendance',
        data: attendanceData?.dailyAttendance || [],
        backgroundColor: 'rgba(251, 146, 60, 0.8)',
        borderColor: 'rgb(251, 146, 60)',
        borderWidth: 2,
      },
    ],
  };

  const monthlyTrendsChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Attendance %',
        data: attendanceData?.monthlyTrends || [],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const departmentChart = {
    labels: attendanceData?.departmentWise.labels || [],
    datasets: [
      {
        label: 'Attendance %',
        data: attendanceData?.departmentWise.data || [],
        backgroundColor: [
          'rgba(250, 204, 21, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(234, 88, 12, 0.8)',
          'rgba(194, 65, 12, 0.8)',
          'rgba(154, 52, 18, 0.8)',
        ],
        borderColor: [
          'rgb(250, 204, 21)',
          'rgb(245, 158, 11)',
          'rgb(249, 115, 22)',
          'rgb(234, 88, 12)',
          'rgb(194, 65, 12)',
          'rgb(154, 52, 18)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const leaveTypesChart = {
    labels: attendanceData?.leaveTypes.labels || [],
    datasets: [
      {
        data: attendanceData?.leaveTypes.data || [],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(245, 158, 11)',
          'rgb(249, 115, 22)',
          'rgb(239, 68, 68)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Attendance Summary & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Comprehensive attendance tracking and reporting
          </p>
        </div>
        <img src={logo} alt="HR Leave Tracker" className="h-16 w-auto" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Employees</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                {stats.totalEmployees}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl">
                👥
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Present Today</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {stats.presentToday}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl">
              ✅
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Absent Today</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {stats.absentToday}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl">
              ❌
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Attendance</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {stats.avgAttendance}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Attendance Chart */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Weekly Attendance Pattern
          </h2>
          <div className="h-64">
            <Bar data={dailyAttendanceChart} options={chartOptions} />
          </div>
        </div>

        {/* Leave Types Distribution */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Leave Types Distribution
          </h2>
          <div className="h-64">
            <Pie data={leaveTypesChart} options={chartOptions} />
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Monthly Attendance Trends
          </h2>
          <div className="h-64">
            <Line data={monthlyTrendsChart} options={chartOptions} />
          </div>
        </div>

        {/* Department-wise Attendance */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Department-wise Attendance
          </h2>
          <div className="h-64">
            <Bar data={departmentChart} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-lg p-6 border border-gray-200 dark:border-dark-border">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-3">
          📈 Insights & Recommendations
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Overall attendance is healthy at {stats.avgAttendance}%</li>
          <li>• Engineering department shows highest attendance rate (92%)</li>
          <li>• {stats.lateArrivals} employees arrived late today - consider attendance policy review</li>
          <li>• Peak leave requests occur during festival seasons - plan staffing accordingly</li>
        </ul>
      </div>
    </div>
  );
};

export default AttendanceSummary;
