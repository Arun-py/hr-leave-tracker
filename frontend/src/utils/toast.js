import { toast } from 'react-toastify';

export const showToast = {
  success: (message) => {
    toast.success(message, {
      style: {
        background: 'linear-gradient(to right, #10B981, #059669)',
      },
    });
  },
  
  error: (message) => {
    toast.error(message, {
      style: {
        background: 'linear-gradient(to right, #EF4444, #DC2626)',
      },
    });
  },
  
  info: (message) => {
    toast.info(message, {
      style: {
        background: 'linear-gradient(to right, #FACC15, #F59E0B)',
      },
    });
  },
  
  warning: (message) => {
    toast.warning(message, {
      style: {
        background: 'linear-gradient(to right, #F97316, #EA580C)',
      },
    });
  },
  
  leaveApproved: (employeeName) => {
    toast.success(`✅ Leave request from ${employeeName} has been approved!`, {
      style: {
        background: 'linear-gradient(to right, #10B981, #059669)',
      },
    });
  },
  
  leaveRejected: (employeeName) => {
    toast.error(`❌ Leave request from ${employeeName} has been rejected!`, {
      style: {
        background: 'linear-gradient(to right, #EF4444, #DC2626)',
      },
    });
  },
  
  newLeaveRequest: (employeeName) => {
    toast.info(`📋 New leave request from ${employeeName}`, {
      style: {
        background: 'linear-gradient(to right, #FACC15, #F59E0B)',
      },
      autoClose: 5000,
    });
  },
};
