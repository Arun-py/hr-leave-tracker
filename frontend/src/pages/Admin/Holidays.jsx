import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { formatDate } from '../../services/dateUtils';
import logo from '../../assets/images/logo.png';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
  });

  // Indian Public Holidays 2025
  const indianHolidays = [
    { date: '2025-01-26', name: 'Republic Day', type: 'National' },
    { date: '2025-03-14', name: 'Holi', type: 'Festival' },
    { date: '2025-03-31', name: 'Eid ul-Fitr', type: 'Festival' },
    { date: '2025-04-10', name: 'Mahavir Jayanti', type: 'Festival' },
    { date: '2025-04-14', name: 'Ambedkar Jayanti', type: 'National' },
    { date: '2025-04-18', name: 'Good Friday', type: 'Festival' },
    { date: '2025-05-01', name: 'May Day', type: 'National' },
    { date: '2025-06-07', name: 'Eid ul-Adha', type: 'Festival' },
    { date: '2025-08-15', name: 'Independence Day', type: 'National' },
    { date: '2025-08-27', name: 'Janmashtami', type: 'Festival' },
    { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'National' },
    { date: '2025-10-02', name: 'Dussehra', type: 'Festival' },
    { date: '2025-10-20', name: 'Diwali', type: 'Festival' },
    { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'Festival' },
    { date: '2025-12-25', name: 'Christmas', type: 'Festival' },
  ];

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const { data } = await api.get('/admin/holidays');
      setHolidays(data);
    } catch (error) {
      console.error('Failed to fetch holidays:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/holidays', formData);
      setAlert({ type: 'success', message: 'Holiday added successfully' });
      setShowModal(false);
      setFormData({ name: '', date: '', description: '' });
      fetchHolidays();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to add holiday' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this holiday?')) return;

    try {
      await api.delete(`/admin/holidays/${id}`);
      setAlert({ type: 'success', message: 'Holiday deleted successfully' });
      fetchHolidays();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete holiday' });
    }
  };

  // Calendar helper functions
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isSunday = (date) => {
    return new Date(date).getDay() === 0;
  };

  const isHoliday = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return indianHolidays.some(h => h.date === dateStr) || 
           holidays.some(h => {
             const holidayDate = new Date(h.date);
             const holidayDateStr = new Date(holidayDate.getTime() + holidayDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
             return holidayDateStr === dateStr;
           });
  };

  const getHolidayName = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const indianHol = indianHolidays.find(h => h.date === dateStr);
    if (indianHol) return indianHol.name;
    const customHol = holidays.find(h => {
      const holidayDate = new Date(h.date);
      const holidayDateStr = new Date(holidayDate.getTime() + holidayDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      return holidayDateStr === dateStr;
    });
    return customHol?.name || '';
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];

    // Empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSun = isSunday(date);
      const isHol = isHoliday(date);
      const holidayName = getHolidayName(date);
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`p-2 min-h-[80px] border border-gray-200 dark:border-dark-border rounded ${
            isToday ? 'ring-2 ring-orange-500' : ''
          } ${
            isSun || isHol ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20' : 'bg-white dark:bg-dark-card'
          }`}
        >
          <div className={`text-sm font-semibold mb-1 ${
            isSun || isHol ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
          }`}>
            {day}
          </div>
          {(isSun || isHol) && (
            <div className="text-xs text-red-600 dark:text-red-400 font-medium">
              {isSun && !isHol ? '☀️ Sunday' : `🎉 ${holidayName}`}
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            ← Previous
          </button>
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Next →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-semibold bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-gray-700 dark:text-gray-300">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Holiday Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage company holidays and view Indian public holidays calendar
          </p>
        </div>
        <img src={logo} alt="HR Leave Tracker" className="h-16 w-auto" />
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* View Mode Toggle */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setViewMode('calendar')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'calendar'
              ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg'
              : 'bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300'
          }`}
        >
          📅 Calendar View
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'list'
              ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg'
              : 'bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300'
          }`}
        >
          📋 List View
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="ml-auto px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
        >
          + Add Custom Holiday
        </button>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Indian Holiday Calendar 2025
          </h2>
          {renderCalendar()}
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ☀️ <span className="font-semibold">Sundays</span> are marked as weekly holidays
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🎉 <span className="font-semibold">Public holidays</span> include National & Festival days
              </p>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <>
          {/* Indian Public Holidays */}
          <div className="mb-6 bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Indian Public Holidays 2025
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {indianHolidays.map((holiday, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800"
                >
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {holiday.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(holiday.date)}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full">
                    {holiday.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Holidays */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Custom Company Holidays
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {holidays.map((holiday) => (
                <div
                  key={holiday._id}
                  className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg shadow-md p-6 border border-orange-200 dark:border-orange-800"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                        {holiday.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(holiday.date)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(holiday._id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  {holiday.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {holiday.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            {holidays.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No custom holidays added yet</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Holiday Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-md border border-gray-200 dark:border-dark-border">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add Holiday</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Holiday Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ name: '', date: '', description: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Add Holiday
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holidays;
