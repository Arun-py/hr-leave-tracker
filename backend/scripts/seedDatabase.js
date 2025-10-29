import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';

// MongoDB connection URI
const MONGODB_URI = 'mongodb+srv://Arun_db_user:fxkHhBcrdedLUBZu@cluster0.alzouxa.mongodb.net/hr_leave_tracker';

// Sample data arrays
const departments = ['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations', 'Support', 'Engineering'];
const designations = {
  'IT': ['Software Engineer', 'Senior Developer', 'Team Lead', 'Tech Lead', 'QA Engineer'],
  'HR': ['HR Manager', 'Recruiter', 'HR Executive', 'HRBP'],
  'Finance': ['Accountant', 'Finance Manager', 'Financial Analyst', 'Accounts Executive'],
  'Sales': ['Sales Executive', 'Sales Manager', 'Business Development Manager', 'Sales Lead'],
  'Marketing': ['Marketing Manager', 'Content Writer', 'SEO Specialist', 'Digital Marketing Executive'],
  'Operations': ['Operations Manager', 'Operations Executive', 'Operations Coordinator'],
  'Support': ['Support Engineer', 'Support Manager', 'Customer Success Manager'],
  'Engineering': ['Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Project Engineer']
};

const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Arjun', 'Pooja', 'Karan', 'Neha', 
                    'Rohan', 'Divya', 'Akash', 'Kavya', 'Nikhil', 'Ananya', 'Aditya', 'Riya', 'Siddharth', 'Isha',
                    'Varun', 'Meera', 'Harsh', 'Tanvi', 'Rajesh', 'Simran', 'Manish', 'Shreya', 'Gaurav', 'Aditi'];
const lastNames = ['Sharma', 'Kumar', 'Patel', 'Singh', 'Reddy', 'Nair', 'Mehta', 'Gupta', 'Verma', 'Shah',
                   'Joshi', 'Iyer', 'Rao', 'Chopra', 'Desai', 'Malhotra', 'Bhatt', 'Kapoor', 'Menon', 'Agarwal'];

const leaveTypes = ['Sick Leave', 'Casual Leave', 'Earned Leave'];
const leaveStatuses = ['Approved', 'Rejected', 'Pending'];

// Helper function to generate random date within range
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to generate random time
const randomTime = (baseHour, variance = 30) => {
  const minutes = Math.floor(Math.random() * variance);
  const date = new Date();
  date.setHours(baseHour, minutes, 0, 0);
  return date;
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await User.deleteMany({ role: 'Employee' }); // Keep admin and HR accounts
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    console.log('Existing data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// Generate employees
const generateEmployees = async () => {
  const employees = [];
  const hashedPassword = await bcrypt.hash('password123', 10);

  for (let i = 1; i <= 40; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const designation = designations[department][Math.floor(Math.random() * designations[department].length)];
    
    const employee = {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@company.com`,
      password: hashedPassword,
      employeeId: `EMP${String(i).padStart(4, '0')}`,
      department: department,
      designation: designation,
      role: 'Employee',
      company: 'TechCorp Solutions',
      companyDomain: 'company.com',
      isActive: Math.random() > 0.1, // 90% active
      joiningDate: randomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)),
      leaveBalance: {
        casualLeave: Math.floor(Math.random() * 8) + 1, // 1-8 remaining
        sickLeave: Math.floor(Math.random() * 12) + 1, // 1-12 remaining
        earnedLeave: Math.floor(Math.random() * 30) + 1, // 1-30 remaining
        maternityLeave: 182,
        paternityLeave: 15,
        bereavementLeave: 7,
        unpaidLeave: 0
      }
    };

    employees.push(employee);
  }

  try {
    const createdEmployees = await User.insertMany(employees);
    console.log(`${createdEmployees.length} employees created`);
    return createdEmployees;
  } catch (error) {
    console.error('Error creating employees:', error);
    return [];
  }
};

// Generate attendance records for past 30 days
const generateAttendance = async (employees) => {
  const attendanceRecords = [];
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  for (const employee of employees) {
    if (!employee.isActive) continue; // Skip inactive employees

    for (let d = new Date(thirtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) continue;

      // 85% attendance probability
      if (Math.random() > 0.85) continue;

      const checkInTime = randomTime(9, 60); // 9:00-9:59 AM
      checkInTime.setFullYear(currentDate.getFullYear());
      checkInTime.setMonth(currentDate.getMonth());
      checkInTime.setDate(currentDate.getDate());

      const checkOutTime = randomTime(18, 120); // 6:00-7:59 PM
      checkOutTime.setFullYear(currentDate.getFullYear());
      checkOutTime.setMonth(currentDate.getMonth());
      checkOutTime.setDate(currentDate.getDate());

      const workHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);

      attendanceRecords.push({
        user: employee._id,
        date: new Date(currentDate),
        checkIn: checkInTime,
        checkOut: checkOutTime,
        status: workHours >= 8 ? 'Present' : 'Half Day',
        workHours: parseFloat(workHours.toFixed(2))
      });
    }
  }

  try {
    const createdRecords = await Attendance.insertMany(attendanceRecords);
    console.log(`${createdRecords.length} attendance records created`);
  } catch (error) {
    console.error('Error creating attendance records:', error);
  }
};

// Generate leave requests
const generateLeaveRequests = async (employees) => {
  const leaveRequests = [];
  const today = new Date();

  for (const employee of employees) {
    if (!employee.isActive) continue;

    // Each employee gets 2-5 leave requests
    const numLeaves = Math.floor(Math.random() * 4) + 2;

    for (let i = 0; i < numLeaves; i++) {
      const isPastLeave = Math.random() > 0.3; // 70% past leaves, 30% future
      
      let startDate, endDate;
      if (isPastLeave) {
        startDate = randomDate(new Date(today.getFullYear(), 0, 1), today);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1); // 1-5 days
      } else {
        startDate = randomDate(today, new Date(today.getFullYear(), 11, 31));
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1);
      }

      const leaveType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
      const status = isPastLeave 
        ? leaveStatuses[Math.floor(Math.random() * 2)] // Approved or Rejected for past
        : Math.random() > 0.5 ? 'Pending' : 'Approved'; // Mix for future

      const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      leaveRequests.push({
        user: employee._id,
        companyDomain: 'company.com',
        leaveType: leaveType,
        startDate: startDate,
        endDate: endDate,
        duration: totalDays,
        reason: `${leaveType} request for personal reasons`,
        status: status,
        appliedDate: new Date(startDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Applied 0-7 days before
        rejectionReason: status === 'Rejected' ? 'Insufficient leave balance or scheduling conflict' : undefined
      });
    }
  }

  try {
    const createdLeaves = await Leave.insertMany(leaveRequests);
    console.log(`${createdLeaves.length} leave requests created`);
  } catch (error) {
    console.error('Error creating leave requests:', error);
  }
};

// Create HR and Admin users if they don't exist
const createAdminUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create Admin
    const adminExists = await User.findOne({ email: 'admin@company.com' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@company.com',
        password: hashedPassword,
        employeeId: 'ADM0001',
        department: 'Administration',
        designation: 'System Administrator',
        role: 'Admin',
        company: 'TechCorp Solutions',
        companyDomain: 'company.com',
        isActive: true,
        joiningDate: new Date(2020, 0, 1)
      });
      console.log('Admin user created: admin@company.com / admin123');
    }

    // Create HR user
    const hrExists = await User.findOne({ email: 'hr@company.com' });
    if (!hrExists) {
      await User.create({
        name: 'HR Manager',
        email: 'hr@company.com',
        password: hashedPassword,
        employeeId: 'HR0001',
        department: 'Human Resources',
        designation: 'HR Manager',
        role: 'HR',
        company: 'TechCorp Solutions',
        companyDomain: 'company.com',
        isActive: true,
        joiningDate: new Date(2020, 0, 1)
      });
      console.log('HR user created: hr@company.com / admin123');
    }
  } catch (error) {
    console.error('Error creating admin users:', error);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('\n🌱 Starting database seeding...\n');
    
    await clearData();
    await createAdminUsers();
    
    const employees = await generateEmployees();
    await generateAttendance(employees);
    await generateLeaveRequests(employees);
    
    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('Default Credentials:');
    console.log('Admin: admin@company.com / admin123');
    console.log('HR: hr@company.com / admin123');
    console.log('Employees: [firstname].[lastname][number]@company.com / password123');
    console.log('Example: rahul.sharma1@company.com / password123\n');
    
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run the seeding
seedDatabase();
