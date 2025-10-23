import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';
import Holiday from '../models/Holiday.js';
import Notification from '../models/Notification.js';

// MongoDB connection URI
const MONGODB_URI = 'mongodb+srv://Arun_db_user:fxkHhBcrdedLUBZu@cluster0.alzouxa.mongodb.net/hr_leave_tracker?retryWrites=true&w=majority&appName=Cluster0';

// Sample data arrays for generating employees
const departments = ['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations', 'Support', 'Engineering'];
const designations = {
  'IT': ['Software Engineer', 'Senior Developer', 'Team Lead', 'Tech Lead', 'QA Engineer', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer'],
  'HR': ['HR Executive', 'Recruiter', 'HRBP', 'HR Coordinator'],
  'Finance': ['Accountant', 'Finance Executive', 'Financial Analyst', 'Accounts Executive'],
  'Sales': ['Sales Executive', 'Sales Representative', 'Business Development Executive', 'Sales Associate'],
  'Marketing': ['Marketing Executive', 'Content Writer', 'SEO Specialist', 'Digital Marketing Executive', 'Social Media Manager'],
  'Operations': ['Operations Executive', 'Operations Coordinator', 'Process Associate'],
  'Support': ['Support Engineer', 'Customer Support Executive', 'Technical Support Specialist'],
  'Engineering': ['Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Project Engineer']
};

const firstNames = [
  'Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Arjun', 'Pooja', 'Karan', 'Neha',
  'Rohan', 'Divya', 'Akash', 'Kavya', 'Nikhil', 'Ananya', 'Aditya', 'Riya', 'Siddharth', 'Isha',
  'Varun', 'Meera', 'Harsh', 'Tanvi', 'Rajesh', 'Simran', 'Manish', 'Shreya', 'Gaurav', 'Aditi',
  'Kunal', 'Ritika', 'Sanjay', 'Preeti', 'Abhishek', 'Nisha', 'Deepak', 'Swati', 'Vishal', 'Megha'
];

const lastNames = [
  'Sharma', 'Kumar', 'Patel', 'Singh', 'Reddy', 'Nair', 'Mehta', 'Gupta', 'Verma', 'Shah',
  'Joshi', 'Iyer', 'Rao', 'Chopra', 'Desai', 'Malhotra', 'Bhatt', 'Kapoor', 'Menon', 'Agarwal',
  'Bansal', 'Saxena', 'Pandey', 'Mishra', 'Trivedi', 'Thakur', 'Bose', 'Das', 'Chatterjee', 'Ghosh'
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected for seeding...');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Clear all existing data
const clearDatabase = async () => {
  try {
    console.log('\n🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    await Notification.deleteMany({});
    console.log('✅ Database cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
};

// Generate unique email
const usedEmails = new Set();
const generateUniqueEmail = (firstName, lastName, role) => {
  let email;
  let counter = 1;
  
  if (role === 'admin') {
    return 'admin@company.com';
  }
  
  if (role === 'hr') {
    email = `hr${counter}@company.com`;
    while (usedEmails.has(email)) {
      counter++;
      email = `hr${counter}@company.com`;
    }
  } else {
    const baseEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    email = `${baseEmail}@company.com`;
    while (usedEmails.has(email)) {
      counter++;
      email = `${baseEmail}${counter}@company.com`;
    }
  }
  
  usedEmails.add(email);
  return email;
};

// Create users
const createUsers = async () => {
  try {
    const users = [];
    const salt = await bcrypt.genSalt(10);
    
    console.log('\n👤 Creating users...');
    
    // 1. Create 1 Admin
    console.log('Creating 1 Admin...');
    const adminPassword = await bcrypt.hash('admin123', salt);
    const admin = {
      name: 'Admin User',
      email: 'admin@company.com',
      password: adminPassword,
      role: 'Admin',
      department: 'Management',
      designation: 'System Administrator',
      employeeId: 'EMP001',
      joiningDate: new Date('2020-01-01'),
      leaveBalance: {
        sickLeave: 12,
        casualLeave: 12,
        earnedLeave: 18
      },
      phone: '+91 9876543210',
      address: 'Mumbai, Maharashtra'
    };
    users.push(admin);
    
    // 2. Create 2 HR accounts
    console.log('Creating 2 HR accounts...');
    const hrNames = [
      { firstName: 'Priya', lastName: 'Sharma' },
      { firstName: 'Amit', lastName: 'Kumar' }
    ];
    
    for (let i = 0; i < 2; i++) {
      const hrPassword = await bcrypt.hash('hr123', salt);
      const hr = {
        name: `${hrNames[i].firstName} ${hrNames[i].lastName}`,
        email: generateUniqueEmail(hrNames[i].firstName, hrNames[i].lastName, 'hr'),
        password: hrPassword,
        role: 'HR',
        department: 'HR',
        designation: i === 0 ? 'HR Manager' : 'HR Executive',
        employeeId: `EMP00${i + 2}`,
        joiningDate: new Date('2021-01-15'),
        leaveBalance: {
          sickLeave: 12,
          casualLeave: 12,
          earnedLeave: 18
        },
        phone: `+91 ${9800000000 + i}`,
        address: i === 0 ? 'Delhi, India' : 'Bangalore, India'
      };
      users.push(hr);
    }
    
    // 3. Create 40 Employees
    console.log('Creating 40 Employees...');
    for (let i = 0; i < 40; i++) {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const designation = designations[department][Math.floor(Math.random() * designations[department].length)];
      
      const employeePassword = await bcrypt.hash('employee123', salt);
      
      const employee = {
        name: `${firstName} ${lastName}`,
        email: generateUniqueEmail(firstName, lastName, 'employee'),
        password: employeePassword,
        role: 'Employee',
        department: department,
        designation: designation,
        employeeId: `EMP${String(i + 4).padStart(3, '0')}`,
        joiningDate: randomDate(new Date('2020-01-01'), new Date('2024-12-31')),
        leaveBalance: {
          sickLeave: Math.floor(Math.random() * 5) + 8, // 8-12
          casualLeave: Math.floor(Math.random() * 5) + 8, // 8-12
          earnedLeave: Math.floor(Math.random() * 8) + 12 // 12-20
        },
        phone: `+91 ${9800000000 + i + 10}`,
        address: `${departments[Math.floor(Math.random() * departments.length)]}, India`
      };
      users.push(employee);
      
      // Progress indicator
      if ((i + 1) % 10 === 0) {
        console.log(`  Created ${i + 1}/40 employees...`);
      }
    }
    
    // Insert all users
    const createdUsers = await User.insertMany(users);
    console.log(`\n✅ Successfully created ${createdUsers.length} users!`);
    console.log(`   - 1 Admin`);
    console.log(`   - 2 HR`);
    console.log(`   - 40 Employees`);
    
    return createdUsers;
  } catch (error) {
    console.error('❌ Error creating users:', error);
    throw error;
  }
};

// Helper function to generate random date within range
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Print summary
const printSummary = async () => {
  console.log('\n' + '='.repeat(60));
  console.log('📊 DATABASE SEEDING SUMMARY');
  console.log('='.repeat(60));
  
  const adminCount = await User.countDocuments({ role: 'Admin' });
  const hrCount = await User.countDocuments({ role: 'HR' });
  const employeeCount = await User.countDocuments({ role: 'Employee' });
  const totalUsers = await User.countDocuments();
  
  console.log(`\n👥 Total Users: ${totalUsers}`);
  console.log(`   - Admins: ${adminCount}`);
  console.log(`   - HR: ${hrCount}`);
  console.log(`   - Employees: ${employeeCount}`);
  
  console.log('\n🔑 LOGIN CREDENTIALS:');
  console.log('─'.repeat(60));
  
  // Admin
  console.log('\n👑 ADMIN:');
  const admin = await User.findOne({ role: 'Admin' });
  console.log(`   Email: ${admin.email}`);
  console.log(`   Password: admin123`);
  console.log(`   Name: ${admin.name}`);
  
  // HR
  console.log('\n👔 HR ACCOUNTS:');
  const hrs = await User.find({ role: 'HR' });
  hrs.forEach((hr, index) => {
    console.log(`\n   HR ${index + 1}:`);
    console.log(`   Email: ${hr.email}`);
    console.log(`   Password: hr123`);
    console.log(`   Name: ${hr.name}`);
  });
  
  // Sample Employees
  console.log('\n👨‍💼 SAMPLE EMPLOYEES (First 5):');
  const employees = await User.find({ role: 'Employee' }).limit(5);
  employees.forEach((emp, index) => {
    console.log(`\n   Employee ${index + 1}:`);
    console.log(`   Email: ${emp.email}`);
    console.log(`   Password: employee123`);
    console.log(`   Name: ${emp.name}`);
    console.log(`   Department: ${emp.department}`);
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ All employees use password: employee123');
  console.log('='.repeat(60) + '\n');
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('\n🚀 Starting database seeding process...\n');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await clearDatabase();
    
    // Create users
    await createUsers();
    
    // Print summary
    await printSummary();
    
    console.log('✅ Database seeding completed successfully!');
    console.log('🌐 Your app is live at: https://hr-leave-tracker.vercel.app\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
