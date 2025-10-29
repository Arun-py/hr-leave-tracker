import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Company from '../models/Company.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const companies = [
  { name: 'Oracle', domain: 'oracle.com' },
  { name: 'Snapdragon', domain: 'snapdragon.com' },
  { name: 'Accenture', domain: 'accenture.com' },
];

const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];
const designations = ['Junior', 'Senior', 'Lead', 'Manager', 'Director'];

const seedMultiCompany = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});

    console.log('Data cleared!');

    // Create Admin
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@hrtracker.com',
      password: 'Admin@123',
      role: 'Admin',
      company: 'HR Tracker System',
      companyDomain: 'hrtracker.com',
      employeeId: 'ADMIN001',
      department: 'Administration',
      designation: 'System Administrator',
      phone: '+91 9876543210',
    });

    console.log('✓ Admin created: admin@hrtracker.com / Admin@123');

    // Create companies and their employees
    for (const companyData of companies) {
      // Register company
      const company = await Company.create({
        name: companyData.name,
        domain: companyData.domain,
        isActive: true,
        registeredBy: admin._id,
      });

      console.log(`\n✓ Company created: ${company.name} (${company.domain})`);

      // Create HR for this company
      const hr = await User.create({
        name: `${companyData.name} HR`,
        email: `hr@${companyData.domain}`,
        password: 'Hr@123',
        role: 'HR',
        company: companyData.name,
        companyDomain: companyData.domain,
        employeeId: 'HR001',
        department: 'Human Resources',
        designation: 'HR Manager',
        phone: '+91 9876543211',
      });

      console.log(`  ✓ HR created: hr@${companyData.domain} / Hr@123`);

      // Create 15 employees for this company
      for (let i = 1; i <= 15; i++) {
        const empNumber = String(i).padStart(3, '0');
        const dept = departments[i % departments.length];
        const desig = designations[i % designations.length];

        await User.create({
          name: `${companyData.name} Employee ${i}`,
          email: `emp${empNumber}@${companyData.domain}`,
          password: 'Emp@123',
          role: 'Employee',
          company: companyData.name,
          companyDomain: companyData.domain,
          employeeId: `EMP${empNumber}`,
          department: dept,
          designation: desig,
          phone: `+91 98765432${10 + i}`,
          joiningDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          leaveBalance: {
            casualLeave: 8,
            sickLeave: 12,
            earnedLeave: 30,
            maternityLeave: 0,
            paternityLeave: 15,
            compensatoryOff: 0,
            restrictedHolidays: 2,
          },
        });
      }

      console.log(`  ✓ 15 employees created: emp001@${companyData.domain} to emp015@${companyData.domain} / Emp@123`);
    }

    console.log('\n' + '='.repeat(70));
    console.log('DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(70));
    console.log('\nLogin Credentials:\n');
    console.log('ADMIN:');
    console.log('  Email: admin@hrtracker.com');
    console.log('  Password: Admin@123\n');
    
    companies.forEach(comp => {
      console.log(`${comp.name.toUpperCase()}:`);
      console.log(`  HR: hr@${comp.domain} / Hr@123`);
      console.log(`  Employees: emp001@${comp.domain} to emp015@${comp.domain} / Emp@123\n`);
    });

    console.log('='.repeat(70));
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedMultiCompany();
