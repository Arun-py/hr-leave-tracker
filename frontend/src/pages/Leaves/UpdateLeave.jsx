import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import leaveService from '../../services/leaveService';
import { showToast } from '../../utils/toast';

const UpdateLeave = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    employeeName: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Pending',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get leave data from location state
    if (location.state?.leave) {
      const leave = location.state.leave;
      setFormData({
        employeeName: leave.employeeName || '',
        startDate: leave.startDate?.split('T')[0] || leave.startDate || '',
        endDate: leave.endDate?.split('T')[0] || leave.endDate || '',
        reason: leave.reason || '',
        status: leave.status || 'Pending',
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.employeeName || !formData.startDate || !formData.endDate || !formData.reason) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    // Validate dates
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    if (start > end) {
      showToast('End date must be after start date', 'error');
      return;
    }

    try {
      setLoading(true);
      await leaveService.updateLeave(id, formData);
      showToast('Leave request updated successfully!', 'success');
      
      // Navigate to view leaves
      setTimeout(() => {
        navigate('/leaves/view');
      }, 1500);
    } catch (error) {
      showToast(error.message || 'Failed to update leave request', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Update Leave Request</h1>
            <p className="text-white/90 text-sm mt-1">Modify leave application details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Employee Name */}
            <div>
              <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter employee name"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Reason */}
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter reason for leave"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Leave'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/leaves/view')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLeave;
