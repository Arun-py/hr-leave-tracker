import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { formatDate } from '../../services/dateUtils';
import { FaClock, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [stats, setStats] = useState({
    totalPresent: 0,
    totalAbsent: 0,
    totalHalfDay: 0,
    averageWorkHours: 0
  });
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchAttendanceRecords();
    // eslint-disable-next-line
  }, [currentMonth, currentYear]);

  const fetchAttendanceRecords = async () => {
    try {
      const { data } = await api.get('/attendance/my-attendance', {
        params: {
          month: currentMonth + 1,
          year: currentYear
        }
      });
      setAttendanceRecords(data);
      calculateStats(data);
    } catch (error) {
      console.error('Failed to fetch attendance records:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (records) => {
    const present = records.filter(r => r.status === 'Present').length;
    const halfDay = records.filter(r => r.status === 'Half Day').length;
    const totalWorkHours = records.reduce((sum, r) => sum + (r.workHours || 0), 0);
    const avgHours = records.length > 0 ? (totalWorkHours / records.length).toFixed(2) : 0;

    // Calculate working days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const workingDays = calculateWorkingDays(currentYear, currentMonth, daysInMonth);
    const absent = workingDays - present - halfDay;

    setStats({
      totalPresent: present,
      totalAbsent: Math.max(0, absent),
      totalHalfDay: halfDay,
      averageWorkHours: avgHours
    });
  };

  const calculateWorkingDays = (year, month, totalDays) => {
    let workingDays = 0;
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
        workingDays++;
      }
    }
    return workingDays;
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getMonthName = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[currentMonth]} ${currentYear}`;
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Attendance</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your attendance and work hours
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Present Days</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {stats.totalPresent}
              </p>
            </div>
            <FaCheckCircle className="text-4xl text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Half Days</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                {stats.totalHalfDay}
              </p>
            </div>
            <FaClock className="text-4xl text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Absent Days</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                {stats.totalAbsent}
              </p>
            </div>
            <FaCalendarAlt className="text-4xl text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Work Hours</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {stats.averageWorkHours}h
              </p>
            </div>
            <FaClock className="text-4xl text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleMonthChange('prev')}
            className="px-4 py-2 bg-gray-200 dark:bg-dark-bg text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-hover transition-colors"
          >
            Previous
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {getMonthName()}
          </h2>
          <button
            onClick={() => handleMonthChange('next')}
            className="px-4 py-2 bg-gray-200 dark:bg-dark-bg text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-hover transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md border border-gray-200 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Work Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {attendanceRecords.map((record) => (
                <tr key={record._id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatTime(record.checkIn)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatTime(record.checkOut)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {record.workHours ? `${record.workHours.toFixed(2)}h` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === 'Present'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : record.status === 'Half Day'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {attendanceRecords.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No attendance records found for this month</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
