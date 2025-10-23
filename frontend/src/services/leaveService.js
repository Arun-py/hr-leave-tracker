import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Leave Service
const leaveService = {
  // Add a new leave
  addLeave: async (leaveData) => {
    try {
      const response = await api.post('/addLeave', leaveData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all leaves
  getAllLeave: async () => {
    try {
      const response = await api.get('/getAllLeave');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update a leave
  updateLeave: async (id, leaveData) => {
    try {
      const response = await api.put(`/updateLeave/${id}`, leaveData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a leave
  deleteLeave: async (id) => {
    try {
      const response = await api.delete(`/deleteLeave/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default leaveService;
