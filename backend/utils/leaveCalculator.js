import { calculateWorkingDays } from './dateUtils.js';

// Calculate leave duration
export const calculateLeaveDuration = (startDate, endDate, holidays = []) => {
  return calculateWorkingDays(startDate, endDate, holidays);
};

// Get leave balance key from leave type
export const getLeaveBalanceKey = (leaveType) => {
  const mapping = {
    'Casual Leave': 'casualLeave',
    'Sick Leave': 'sickLeave',
    'Earned Leave': 'earnedLeave',
    'Maternity Leave': 'maternityLeave',
    'Paternity Leave': 'paternityLeave',
    'Compensatory Off': 'compensatoryOff',
    'Restricted Holiday': 'restrictedHolidays',
  };
  
  return mapping[leaveType] || null;
};

// Validate leave balance
export const validateLeaveBalance = (user, leaveType, duration) => {
  const balanceKey = getLeaveBalanceKey(leaveType);
  
  // Leave Without Pay doesn't require balance check
  if (leaveType === 'Leave Without Pay') {
    return { valid: true, message: 'LWP approved' };
  }
  
  if (!balanceKey) {
    return { valid: false, message: 'Invalid leave type' };
  }
  
  const availableBalance = user.leaveBalance[balanceKey] || 0;
  
  if (availableBalance < duration) {
    return {
      valid: false,
      message: `Insufficient balance. Available: ${availableBalance} days, Requested: ${duration} days`,
    };
  }
  
  return { valid: true, message: 'Sufficient balance' };
};

// Deduct leave balance
export const deductLeaveBalance = (user, leaveType, duration) => {
  const balanceKey = getLeaveBalanceKey(leaveType);
  
  if (balanceKey && user.leaveBalance[balanceKey] !== undefined) {
    user.leaveBalance[balanceKey] -= duration;
  }
  
  return user;
};

// Restore leave balance (when leave is cancelled/rejected)
export const restoreLeaveBalance = (user, leaveType, duration) => {
  const balanceKey = getLeaveBalanceKey(leaveType);
  
  if (balanceKey && user.leaveBalance[balanceKey] !== undefined) {
    user.leaveBalance[balanceKey] += duration;
  }
  
  return user;
};
