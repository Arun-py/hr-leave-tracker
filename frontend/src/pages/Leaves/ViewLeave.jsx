import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import leaveService from '../../services/leaveService';
import { showToast } from '../../utils/toast';

const ViewLeave = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const data = await leaveService.getAllLeave();
      setLeaves(data);
    } catch (error) {
      showToast(error.message || 'Failed to fetch leave records', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        await leaveService.deleteLeave(id);
        showToast('Leave request deleted successfully', 'success');
        fetchLeaves();
      } catch (error) {
        showToast(error.message || 'Failed to delete leave request', 'error');
      }
    }
  };

  const handleUpdate = (leave) => {
    navigate(`/leaves/update/${leave._id}`, { state: { leave } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Requests</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">View and manage all leave applications</p>
          </div>
          <button
            onClick={() => navigate('/leaves/add')}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <FiPlus className="text-xl" />
            Add Leave
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading leave records...</p>
            </div>
          ) : leaves.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No leave records found</p>
              <button
                onClick={() => navigate('/leaves/add')}
                className="mt-4 text-orange-600 hover:text-orange-700 font-semibold"
              >
                Add your first leave request
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Employee Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {leaves.map((leave) => (
                    <tr key={leave._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {leave.employeeName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {formatDate(leave.startDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {formatDate(leave.endDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                          {leave.reason}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(leave)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Edit"
                          >
                            <FiEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(leave._id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        {!loading && leaves.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaves.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {leaves.filter(l => l.status === 'Pending').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {leaves.filter(l => l.status === 'Approved').length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLeave;
