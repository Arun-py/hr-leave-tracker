import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const departments = ['Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Customer Support'];
const designations = ['Associate', 'Senior Associate', 'Team Lead', 'Manager', 'Senior Manager'];

const firstNames = [
  'Amit', 'Priya', 'Rohan', 'Sneha', 'Vikram', 'Anjali', 'Karan', 'Pooja',
  'Arjun', 'Kavya', 'Nikhil', 'Divya', 'Ravi', 'Meera', 'Sanjay', 'Neha',
  'Aditya', 'Shreya', 'Manoj', 'Ritika', 'Suresh', 'Tanvi', 'Harish', 'Ishita',
  'Prakash', 'Swati', 'Rajesh', 'Nisha', 'Deepak', 'Priyanka', 'Vivek', 'Sakshi',
  'Mohit', 'Aarti', 'Gaurav', 'Simran', 'Ramesh', 'Megha', 'Naveen', 'Ritu'
];

const lastNames = [
  'Kumar', 'Singh', 'Patel', 'Verma', 'Sharma', 'Reddy', 'Nair', 'Iyer',
  'Gupta', 'Mehta', 'Shah', 'Joshi', 'Rao', 'Pillai', 'Krishnan', 'Desai',
  'Agarwal', 'Pandey', 'Mishra', 'Chopra', 'Malhotra', 'Kapoor', 'Bhat', 'Menon',
  'Kulkarni', 'Bhatt', 'Doshi', 'Sinha', 'Jain', 'Choudhary', 'Saxena', 'Bansal',
  'Arora', 'Bajaj', 'Chawla', 'Gill', 'Khanna', 'Sethi', 'Thakur', 'Varma'
];

const generateEmail = (firstName, lastName, index) => {
  // Start from 200 to avoid conflicts
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 200}@company.com`;
};

const generatePhone = () => {
  return `98${Math.floor(10000000 + Math.random() * 90000000)}`;
};

const newEmployees = [];

for (let i = 0; i < 40; i++) {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  
  newEmployees.push({
    name: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName, i + 100),
    password: 'password123',
    role: 'Employee',
    phone: generatePhone(),
    department: departments[Math.floor(Math.random() * departments.length)],
    designation: designations[Math.floor(Math.random() * designations.length)],
    joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    status: 'Active'
  });
}

const seedNewEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');

    // Hash passwords
    for (let employee of newEmployees) {
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(employee.password, salt);
    }

    // Insert new employees
    await User.insertMany(newEmployees);
    console.log(`✅ Successfully added ${newEmployees.length} new employees!`);
    
    console.log('\nSample credentials:');
    console.log('Email:', newEmployees[0].email);
    console.log('Password: password123');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding employees:', error);
    process.exit(1);
  }
};

seedNewEmployees();
