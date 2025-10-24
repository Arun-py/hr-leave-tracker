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

// Student data from the provided list
const students = [
  { rollNo: '727723EUEE001', name: 'AABIDEEN A', gender: 'M', email: '727723euee001@skcet.ac.in' },
  { rollNo: '727723EUEE002', name: 'AAKASH S', gender: 'M', email: '727723euee002@skcet.ac.in' },
  { rollNo: '727723EUEE003', name: 'AAKASH SANKAR B', gender: 'M', email: '727723euee003@skcet.ac.in' },
  { rollNo: '727723EUEE004', name: 'ABINAYA K', gender: 'F', email: '727723euee004@skcet.ac.in' },
  { rollNo: '727723EUEE005', name: 'ABISHECK M A', gender: 'M', email: '727723euee005@skcet.ac.in' },
  { rollNo: '727723EUEE006', name: 'ADITYA S M', gender: 'M', email: '727723euee006@skcet.ac.in' },
  { rollNo: '727723EUEE007', name: 'AJITHAN S', gender: 'M', email: '727723euee007@skcet.ac.in' },
  { rollNo: '727723EUEE008', name: 'AKASH R', gender: 'M', email: '727723euee008@skcet.ac.in' },
  { rollNo: '727723EUEE009', name: 'ANKITA N', gender: 'F', email: '727723euee009@skcet.ac.in' },
  { rollNo: '727723EUEE010', name: 'ARUN T', gender: 'M', email: '727723euee010@skcet.ac.in' },
  { rollNo: '727723EUEE011', name: 'ASHOK J', gender: 'M', email: '727723euee011@skcet.ac.in' },
  { rollNo: '727723EUEE012', name: 'ASHWATH P M', gender: 'M', email: '727723euee012@skcet.ac.in' },
  { rollNo: '727723EUEE013', name: 'BHARATHI N J', gender: 'F', email: '727723euee013@skcet.ac.in' },
  { rollNo: '727723EUEE014', name: 'BUVANESH V K', gender: 'M', email: '727723euee014@skcet.ac.in' },
  { rollNo: '727723EUEE015', name: 'CHIRANJEEVI D R', gender: 'M', email: '727723euee015@skcet.ac.in' },
  { rollNo: '727723EUEE016', name: 'DEEPAKRAJ N', gender: 'M', email: '727723euee016@skcet.ac.in' },
  { rollNo: '727723EUEE017', name: 'DEVANDTH V R', gender: 'M', email: '727723euee017@skcet.ac.in' },
  { rollNo: '727723EUEE018', name: 'DEVARAJ P', gender: 'M', email: '727723euee018@skcet.ac.in' },
  { rollNo: '727723EUEE019', name: 'DHANUJA R', gender: 'F', email: '727723euee019@skcet.ac.in' },
  { rollNo: '727723EUEE020', name: 'DHANVANTHRI M R', gender: 'M', email: '727723euee020@skcet.ac.in' },
  { rollNo: '727723EUEE021', name: 'DHARANIDHARAN M', gender: 'M', email: '727723euee021@skcet.ac.in' },
  { rollNo: '727723EUEE022', name: 'DHIVYA R', gender: 'F', email: '727723euee022@skcet.ac.in' },
  { rollNo: '727723EUEE023', name: 'DINESH E', gender: 'M', email: '727723euee023@skcet.ac.in' },
  { rollNo: '727723EUEE025', name: 'DINESH KARTHIKEYAN G M', gender: 'M', email: '727723euee025@skcet.ac.in' },
  { rollNo: '727723EUEE026', name: 'DURGAI MANI S', gender: 'M', email: '727723euee026@skcet.ac.in' },
  { rollNo: '727723EUEE027', name: 'ELAMBHARATHI K', gender: 'M', email: '727723euee027@skcet.ac.in' },
  { rollNo: '727723EUEE028', name: 'ELAVARASAN M', gender: 'M', email: '727723euee028@skcet.ac.in' },
  { rollNo: '727723EUEE029', name: 'FAZILA N', gender: 'F', email: '727723euee029@skcet.ac.in' },
  { rollNo: '727723EUEE030', name: 'GOKUL R', gender: 'M', email: '727723euee030@skcet.ac.in' },
  { rollNo: '727723EUEE031', name: 'GOKUL U', gender: 'M', email: '727723euee031@skcet.ac.in' },
  { rollNo: '727723EUEE032', name: 'GOKULAKRISHNA J', gender: 'M', email: '727723euee032@skcet.ac.in' },
  { rollNo: '727723EUEE033', name: 'GOKULAKRISHNAN N P', gender: 'M', email: '727723euee033@skcet.ac.in' },
  { rollNo: '727723EUEE034', name: 'GOPIKA P', gender: 'F', email: '727723euee034@skcet.ac.in' },
  { rollNo: '727723EUEE035', name: 'GOWSHIGAN R', gender: 'M', email: '727723euee035@skcet.ac.in' },
  { rollNo: '727723EUEE036', name: 'HAIGRIVAAS C S', gender: 'M', email: '727723euee036@skcet.ac.in' },
  { rollNo: '727723EUEE037', name: 'HARI M', gender: 'M', email: '727723euee037@skcet.ac.in' },
  { rollNo: '727723EUEE038', name: 'HARINI T', gender: 'F', email: '727723euee038@skcet.ac.in' },
  { rollNo: '727723EUEE039', name: 'HARINIVAAS G D', gender: 'M', email: '727723euee039@skcet.ac.in' },
  { rollNo: '727723EUEE040', name: 'HARISUDARSAN S', gender: 'M', email: '727723euee040@skcet.ac.in' },
  { rollNo: '727723EUEE041', name: 'HARSHAVARTHAN V', gender: 'M', email: '727723euee041@skcet.ac.in' },
  { rollNo: '727723EUEE042', name: 'JANANI J', gender: 'F', email: '727723euee042@skcet.ac.in' },
  { rollNo: '727723EUEE043', name: 'JENIVAN R', gender: 'M', email: '727723euee043@skcet.ac.in' },
  { rollNo: '727723EUEE044', name: 'JEYA SURIYA J', gender: 'M', email: '727723euee044@skcet.ac.in' },
  { rollNo: '727723EUEE045', name: 'JOSEPH LIBINS J', gender: 'M', email: '727723euee045@skcet.ac.in' },
  { rollNo: '727723EUEE046', name: 'JOSHUA A', gender: 'M', email: '727723euee046@skcet.ac.in' },
  { rollNo: '727723EUEE047', name: 'KAMALESHWARAN R', gender: 'M', email: '727723euee047@skcet.ac.in' },
  { rollNo: '727723EUEE048', name: 'KANIMOZHI M', gender: 'F', email: '727723euee048@skcet.ac.in' },
  { rollNo: '727723EUEE049', name: 'KANISHKA M', gender: 'F', email: '727723euee049@skcet.ac.in' },
  { rollNo: '727723EUEE050', name: 'KAPIL KUMAR K', gender: 'M', email: '727723euee050@skcet.ac.in' },
  { rollNo: '727723EUEE051', name: 'KARTHICK S', gender: 'M', email: '727723euee051@skcet.ac.in' },
  { rollNo: '727723EUEE052', name: 'KARTHIKEYAN T', gender: 'M', email: '727723euee052@skcet.ac.in' },
  { rollNo: '727723EUEE053', name: 'KARTHIKKEYAN K S', gender: 'M', email: '727723euee053@skcet.ac.in' },
  { rollNo: '727723EUEE054', name: 'KAVIN MARAN S', gender: 'M', email: '727723euee054@skcet.ac.in' },
  { rollNo: '727723EUEE055', name: 'KAVIN S', gender: 'M', email: '727723euee055@skcet.ac.in' },
  { rollNo: '727723EUEE056', name: 'KAVINBALAJI S', gender: 'M', email: '727723euee056@skcet.ac.in' },
  { rollNo: '727723EUEE057', name: 'KAVIYASRI E A', gender: 'F', email: '727723euee057@skcet.ac.in' },
  { rollNo: '727723EUEE058', name: 'KEERTHANA S', gender: 'F', email: '727723euee058@skcet.ac.in' },
  { rollNo: '727723EUEE059', name: 'KIRUTHIKA S', gender: 'F', email: '727723euee059@skcet.ac.in' },
  { rollNo: '727723EUEE060', name: 'KISHORE K', gender: 'M', email: '727723euee060@skcet.ac.in' },
  { rollNo: '727723EUEE061', name: 'KISHORE S', gender: 'M', email: '727723euee061@skcet.ac.in' },
  { rollNo: '727723EUEE062', name: 'KOTTISWARAN K S', gender: 'M', email: '727723euee062@skcet.ac.in' },
  { rollNo: '727723EUEE063', name: 'KUSHAADA AJATH T V', gender: 'M', email: '727723euee063@skcet.ac.in' },
  { rollNo: '727723EUEE064', name: 'LAKSHMI RAJAN S', gender: 'M', email: '727723euee064@skcet.ac.in' },
  { rollNo: '727723EUEE065', name: 'LEMASAMEETHA M', gender: 'F', email: '727723euee065@skcet.ac.in' },
  { rollNo: '727723EUEE066', name: 'LOKESHVARAN U', gender: 'M', email: '727723euee066@skcet.ac.in' },
  { rollNo: '727723EUEE067', name: 'MADHAVAN P', gender: 'M', email: '727723euee067@skcet.ac.in' },
  { rollNo: '727723EUEE068', name: 'MAHA LAKSHMI K', gender: 'F', email: '727723euee068@skcet.ac.in' },
  { rollNo: '727723EUEE069', name: 'MITHILESHRAJA V', gender: 'M', email: '727723euee069@skcet.ac.in' },
  { rollNo: '727723EUEE070', name: 'MOHAMED NABIL K S', gender: 'M', email: '727723euee070@skcet.ac.in' },
  { rollNo: '727724EUEE501', name: 'AJAY R', gender: 'M', email: '727724euee501@skcet.ac.in' },
  { rollNo: '727724EUEE502', name: 'AKILAN B', gender: 'M', email: '727724euee502@skcet.ac.in' },
  { rollNo: '727724EUEE504', name: 'ARUN R', gender: 'M', email: '727724euee504@skcet.ac.in' },
  { rollNo: '727724EUEE506', name: 'ESWAR R', gender: 'M', email: '727724euee506@skcet.ac.in' },
  { rollNo: '727724EUEE507', name: 'GOKUL RAMANAN R V', gender: 'M', email: '727724euee507@skcet.ac.in' },
];

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
    console.log('✅ Admin created: admin@hrtracker.com / Admin@123');

    // Create HR
    const hr = await User.create({
      name: 'HR Manager',
      email: 'hr@hrtracker.com',
      password: 'Hr@123',
      role: 'HR',
      employeeId: 'HR001',
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
    console.log('✅ HR created: hr@hrtracker.com / Hr@123');

    // Create all students
    let createdCount = 0;
    for (const student of students) {
      const leaveBalance = {
        casualLeave: 8,
        sickLeave: 12,
        earnedLeave: 30,
        maternityLeave: student.gender === 'F' ? 90 : 0,
        paternityLeave: student.gender === 'M' ? 15 : 0,
        compensatoryOff: 0,
        restrictedHolidays: 2,
      };

      await User.create({
        name: student.name,
        email: student.email,
        password: student.rollNo, // Password is the roll number
        role: 'Employee',
        employeeId: student.rollNo,
        department: 'Electrical and Electronics Engineering',
        designation: 'Student',
        phone: '',
        gender: student.gender,
        leaveBalance,
      });
      createdCount++;
    }
    console.log(`✅ ${createdCount} students created`);

    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('📋 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:');
    console.log('  Email: admin@hrtracker.com');
    console.log('  Password: Admin@123');
    console.log('');
    console.log('HR:');
    console.log('  Email: hr@hrtracker.com');
    console.log('  Password: Hr@123');
    console.log('');
    console.log('Students (73 total):');
    console.log('  Email: [rollno]@skcet.ac.in (e.g., 727723euee001@skcet.ac.in)');
    console.log('  Password: [ROLLNO] (e.g., 727723EUEE001)');
    console.log('  Department: Electrical and Electronics Engineering');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
