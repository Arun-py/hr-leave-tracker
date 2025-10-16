// Calculate working days between two dates excluding weekends
export const calculateWorkingDays = (startDate, endDate, holidays = []) => {
  let count = 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Reset time part for accurate date comparison
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  const holidayDates = holidays.map(h => {
    const d = new Date(h.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  });

  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    const currentTime = current.getTime();
    
    // Check if it's not a weekend (0 = Sunday, 6 = Saturday)
    // and not a holiday
    if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidayDates.includes(currentTime)) {
      count++;
    }
    
    current.setDate(current.getDate() + 1);
  }
  
  return count;
};

// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get start and end of month
export const getMonthRange = (year, month) => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59);
  return { startDate, endDate };
};

// Check if date is a weekend
export const isWeekend = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
};

// Get date range for filters
export const getDateRange = (period) => {
  const today = new Date();
  let startDate, endDate;

  switch (period) {
    case 'today':
      startDate = new Date(today.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
      break;
    case 'week':
      const weekStart = today.getDate() - today.getDay();
      startDate = new Date(today.setDate(weekStart));
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(today.setDate(weekStart + 6));
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'month':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
      break;
    case 'year':
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
      break;
    default:
      startDate = new Date(today.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
  }

  return { startDate, endDate };
};
