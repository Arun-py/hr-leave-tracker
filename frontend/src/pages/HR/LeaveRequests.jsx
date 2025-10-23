import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { formatDate } from '../../services/dateUtils';
import { showToast } from '../../utils/toast';

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Pending');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);

  useEffect(() => {
    fetchLeaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const url = `/hr/leave-requests?status=${filter}`;
      const { data } = await api.get(url);
      setLeaves(data);
    } catch (error) {
      console.error('Failed to fetch leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const leave = leaves.find(l => l._id === id);
      await api.put(`/hr/leave-requests/${id}/approve`);
      showToast.leaveApproved(leave?.user?.name || 'Employee');
      setMessage({ type: 'success', text: 'Leave request approved successfully!' });
      fetchLeaves();
    } catch (error) {
      showToast.error(error.response?.data?.message || 'Failed to approve leave');
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to approve leave' });
    }
  };

  const handleReject = async (id) => {
    if (!rejectionReason.trim()) {
      showToast.warning('Please provide a rejection reason');
      return;
    }

    try {
      const leave = leaves.find(l => l._id === id);
      await api.put(`/hr/leave-requests/${id}/reject`, { rejectionReason });
      showToast.leaveRejected(leave?.user?.name || 'Employee');
      setMessage({ type: 'success', text: 'Leave request rejected!' });
      setShowRejectModal(null);
      setRejectionReason('');
      fetchLeaves();
    } catch (error) {
      showToast.error(error.response?.data?.message || 'Failed to reject leave');
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to reject leave' });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Requests</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Review and manage employee leave requests
        </p>
      </div>

      {message.text && (
        <Alert
          type={message.type}
          message={message.text}
          onClose={() => setMessage({ type: '', text: '' })}
        />
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['Pending', 'Approved', 'Rejected', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Leaves Table */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md border border-gray-200 dark:border-dark-border overflow-hidden">
        {leaves.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No {filter.toLowerCase()} leave requests found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Leave Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {leaves.map((leave) => (
                  <tr key={leave._id} className="hover:bg-gray-50 dark:hover:bg-dark-hover">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {leave.user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {leave.user?.employeeId} • {leave.user?.department}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {leave.leaveType}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {leave.duration} day{leave.duration !== 1 ? 's' : ''}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {leave.reason}
                      </p>
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
                      {leave.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(leave._id)}
                            className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setShowRejectModal(leave._id)}
                            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Reject Leave Request
            </h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              rows="4"
              className="block w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(showRejectModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
