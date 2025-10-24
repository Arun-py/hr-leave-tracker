import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';
import Holiday from '../models/Holiday.js';
import Notification from '../models/Notification.js';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Simple employee names (single names only)
const employeeNames = [
  'Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram',
  'Anjali', 'Arjun', 'Pooja', 'Karan', 'Neha',
  'Rohan', 'Divya', 'Akash', 'Kavya', 'Nikhil',
  'Ananya', 'Aditya', 'Riya', 'Siddharth', 'Isha',
  'Varun', 'Meera', 'Harsh', 'Tanvi', 'Rajesh',
  'Simran', 'Manish', 'Shreya', 'Gaurav', 'Aditi',
  'Prakash', 'Swati', 'Deepak', 'Nisha', 'Suresh',
  'Megha', 'Vishal', 'Preeti', 'Naveen', 'Lakshmi'
];

const departments = ['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations'];
const designations = {
  'IT': ['Software Engineer', 'Senior Developer', 'Team Lead', 'QA Engineer'],
  'HR': ['HR Executive', 'Recruiter', 'HR Coordinator'],
  'Finance': ['Accountant', 'Financial Analyst', 'Accounts Executive'],
  'Sales': ['Sales Executive', 'Business Development Executive'],
  'Marketing': ['Marketing Executive', 'Content Writer', 'SEO Specialist'],
  'Operations': ['Operations Executive', 'Operations Coordinator']
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('\n🌱 Starting database seeding...\n');

    // Clear all existing data
    await User.deleteMany({});
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    await Holiday.deleteMany({});
    await Notification.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create Admin
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@hrtracker.com',
      password: 'Admin@123',
      role: 'Admin',
      employeeId: 'ADM001',
      department: 'Administration',
      designation: 'System Administrator',
      phone: '9999999999',
      leaveBalance: {
        casualLeave: 12,
        sickLeave: 12,
        earnedLeave: 30,
        maternityLeave: 0,
        paternityLeave: 0,
        compensatoryOff: 0,
        restrictedHolidays: 2,
      },
    });
    console.log('✅ Admin created: admin@hrtracker.com / Admin@123 (ADM001)');

    // Create HR
    const hr = await User.create({
      name: 'HR',
      email: 'hr@hrtracker.com',
      password: 'Hr@123',
      role: 'HR',
      employeeId: 'HRM001',
      department: 'Human Resources',
      designation: 'HR Manager',
      phone: '9999999998',
      leaveBalance: {
        casualLeave: 12,
        sickLeave: 12,
        earnedLeave: 30,
        maternityLeave: 0,
        paternityLeave: 0,
        compensatoryOff: 0,
        restrictedHolidays: 2,
      },
    });
    console.log('✅ HR created: hr@hrtracker.com / Hr@123 (HRM001)');

    // Create 40 employees
    let createdCount = 0;
    for (let i = 0; i < 40; i++) {
      const empId = `EMP${String(i + 1).padStart(3, '0')}`;
      const name = employeeNames[i];
      const email = `${name.toLowerCase()}@company.com`;
      const password = `${empId.toLowerCase()}@123`; // e.g., emp001@123
      
      // Random department and designation
      const department = departments[Math.floor(Math.random() * departments.length)];
      const designationList = designations[department];
      const designation = designationList[Math.floor(Math.random() * designationList.length)];
      
      // Random gender for leave balance
      const gender = Math.random() > 0.5 ? 'M' : 'F';
      
      const leaveBalance = {
        casualLeave: 8,
        sickLeave: 12,
        earnedLeave: 30,
        maternityLeave: gender === 'F' ? 90 : 0,
        paternityLeave: gender === 'M' ? 15 : 0,
        compensatoryOff: 0,
        restrictedHolidays: 2,
      };

      await User.create({
        name,
        email,
        password,
        role: 'Employee',
        employeeId: empId,
        department,
        designation,
        phone: '',
        gender,
        leaveBalance,
      });
      createdCount++;
    }
    console.log(`✅ ${createdCount} employees created (EMP001 - EMP040)`);

    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('📋 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:');
    console.log('  Email: admin@hrtracker.com');
    console.log('  Password: Admin@123');
    console.log('  Employee ID: ADM001');
    console.log('');
    console.log('HR:');
    console.log('  Email: hr@hrtracker.com');
    console.log('  Password: Hr@123');
    console.log('  Employee ID: HRM001');
    console.log('');
    console.log('Employees (40 total):');
    console.log('  Email: [name]@company.com (e.g., rahul@company.com)');
    console.log('  Password: [empid]@123 (e.g., emp001@123, emp002@123, etc.)');
    console.log('  Employee IDs: EMP001 to EMP040');
    console.log('  Departments: IT, HR, Finance, Sales, Marketing, Operations');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
