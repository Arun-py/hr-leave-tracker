import { format, isWeekend, addDays } from 'date-fns';

// Calculate working days between two dates (excluding weekends)
export const calculateWorkingDays = (startDate, endDate, holidays = []) => {
  let count = 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const holidayDates = holidays.map(h => format(new Date(h.date), 'yyyy-MM-dd'));
  
  let current = start;
  while (current <= end) {
    const currentStr = format(current, 'yyyy-MM-dd');
    
    if (!isWeekend(current) && !holidayDates.includes(currentStr)) {
      count++;
    }
    
    current = addDays(current, 1);
  }
  
  return count;
};

// Format date for display
export const formatDate = (date) => {
  if (!date) return '';
  try {
    return format(new Date(date), 'MMM dd, yyyy');
  } catch (error) {
    return '';
  }
};

// Format date for input fields
export const formatDateForInput = (date) => {
  if (!date) return '';
  try {
    return format(new Date(date), 'yyyy-MM-dd');
  } catch (error) {
    return '';
  }
};

// Format time for display
export const formatTime = (date) => {
  if (!date) return '';
  try {
    return format(new Date(date), 'hh:mm a');
  } catch (error) {
    return '';
  }
};

// Format date and time
export const formatDateTime = (date) => {
  if (!date) return '';
  try {
    return format(new Date(date), 'MMM dd, yyyy hh:mm a');
  } catch (error) {
    return '';
  }
};

// Get current month and year
export const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
};

// Get date range for current month
export const getCurrentMonthRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  
  return { startDate, endDate };
};

// Validate date range
export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start > end) {
    return { valid: false, message: 'End date must be after start date' };
  }
  
  if (start < new Date().setHours(0, 0, 0, 0)) {
    return { valid: false, message: 'Start date cannot be in the past' };
  }
  
  return { valid: true, message: 'Valid date range' };
};

// Get month name
export const getMonthName = (monthNumber) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthNumber - 1] || '';
};

// Get days in month
export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Check if date is today
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return formatDate(date);
};
