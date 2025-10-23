import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Alert from '../../components/Alert';
import { formatDateForInput, calculateWorkingDays, validateDateRange } from '../../services/dateUtils';
import { showToast } from '../../utils/toast';

const ApplyLeave = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });
  
  const [holidays, setHolidays] = useState([]);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchHolidays();
  }, []);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const days = calculateWorkingDays(formData.startDate, formData.endDate, holidays);
      setDuration(days);
    } else {
      setDuration(0);
    }
  }, [formData.startDate, formData.endDate, holidays]);

  const fetchHolidays = async () => {
    try {
      const { data } = await api.get('/admin/holidays');
      setHolidays(data);
    } catch (error) {
      console.error('Failed to fetch holidays:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate dates
    const validation = validateDateRange(formData.startDate, formData.endDate);
    if (!validation.valid) {
      setError(validation.message);
      showToast.error(validation.message);
      return;
    }

    if (duration === 0) {
      const msg = 'No working days in the selected period';
      setError(msg);
      showToast.warning(msg);
      return;
    }

    setLoading(true);

    try {
      await api.post('/leaves', formData);
      const successMsg = 'Leave application submitted successfully!';
      setSuccess(successMsg);
      showToast.success(successMsg);
      
      setTimeout(() => {
        navigate('/my-leaves');
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to apply for leave';
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const leaveTypes = [
    'Casual Leave',
    'Sick Leave',
    'Earned Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Compensatory Off',
    'Leave Without Pay',
    'Restricted Holiday',
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Apply for Leave</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fill in the details to request a leave
        </p>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Leave Type *
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className="block w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {leaveTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={formatDateForInput(new Date())}
                required
                className="block w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || formatDateForInput(new Date())}
                required
                className="block w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Duration Display */}
          {duration > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Duration: {duration} working day{duration !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason *
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="4"
              className="block w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Please provide a reason for your leave..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || duration === 0}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Submitting...' : 'Submit Leave Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
