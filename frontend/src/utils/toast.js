import { toast } from 'react-toastify';

// Enhanced toast configurations with custom animations and icons
const toastConfig = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: {
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  }
};

export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...toastConfig,
      icon: "✨",
      style: {
        ...toastConfig.style,
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
      progressStyle: {
        background: 'rgba(255, 255, 255, 0.4)',
      }
    });
  },
  
  error: (message) => {
    toast.error(message, {
      ...toastConfig,
      icon: "🚫",
      style: {
        ...toastConfig.style,
        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      },
      progressStyle: {
        background: 'rgba(255, 255, 255, 0.4)',
      }
    });
  },
  
  info: (message) => {
    toast.info(message, {
      ...toastConfig,
      icon: "ℹ️",
      style: {
        ...toastConfig.style,
        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
      progressStyle: {
        background: 'rgba(255, 255, 255, 0.4)',
      }
    });
  },
  
  warning: (message) => {
    toast.warning(message, {
      ...toastConfig,
      icon: "⚠️",
      style: {
        ...toastConfig.style,
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      },
      progressStyle: {
        background: 'rgba(255, 255, 255, 0.4)',
      }
    });
  },
  
  leaveApproved: (employeeName) => {
    toast.success(`✅ Leave request from ${employeeName} has been approved!`, {
      ...toastConfig,
      icon: "🎉",
      autoClose: 5000,
      style: {
        ...toastConfig.style,
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
      progressStyle: {
        background: 'rgba(255, 255, 255, 0.4)',
      }
    });
  },
  
  leaveRejected: (employeeName) => {
    toast.error(`❌ Leave request from ${employeeName} has been rejected!`, {
      ...toastConfig,
      icon: "😔",
      autoClose: 5000,
      style: {
        ...toastConfig.style,
        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      },
      progressStyle: {
        background: 'rgba(255, 255, 255, 0.4)',
      }
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
