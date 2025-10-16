# 🎉 HR Leave Tracker - Complete Application

A comprehensive MERN stack application for managing employee leaves and attendance with role-based access control.

## ✅ COMPLETED FEATURES

### 1. **HR and Admin Pages** ✅
All HR and Admin pages have been created and integrated:

**HR Pages:**
- ✅ HR Dashboard (stats, pending approvals, recent leaves)
- ✅ Leave Requests (approve/reject with filtering)
- ✅ Manage Employees (employee directory with search)
- ✅ Attendance Summary (placeholder for future enhancement)

**Admin Pages:**
- ✅ Admin Dashboard (system-wide statistics)
- ✅ User Management (change user roles, manage accounts)
- ✅ Holiday Management (add/delete company holidays)
- ✅ Leave Policies (placeholder for policy management)

### 2. **Role-Based Dashboard Routing** ✅
Users are now automatically redirected to their role-specific dashboard:
- **Employees** → `/dashboard` (Employee Dashboard)
- **HR** → `/hr/dashboard` (HR Dashboard)
- **Admin** → `/admin/dashboard` (Admin Dashboard)

### 3. **Attendance Page Completed** ✅
The attendance page now includes:
- ✅ Monthly attendance records with navigation
- ✅ Statistics (Present days, Half days, Absent days, Average work hours)
- ✅ Detailed attendance table with check-in/out times
- ✅ Work hours calculation
- ✅ Month-wise filtering

### 4. **Database Populated with Test Data** ✅
Successfully seeded the database with:
- ✅ 40 Employees with random names and departments
- ✅ 726 Attendance records for the past 30 days
- ✅ 126 Leave requests with mixed statuses
- ✅ Admin and HR accounts

### 5. **Image Assets Folder Created** ✅
Created: `frontend/src/assets/images/` for storing images

---

## 🚀 QUICK START

### Backend Server
```powershell
cd backend
npm start
```
Server runs on: **http://localhost:5000**

### Frontend Development Server
```powershell
cd frontend
npm start
```
Frontend runs on: **http://localhost:3000**

---

## 🔐 DEFAULT LOGIN CREDENTIALS

### Admin Account
- **Email:** admin@company.com
- **Password:** admin123

### HR Account
- **Email:** hr@company.com  
- **Password:** admin123

### Employee Accounts (40 employees)
- **Format:** [firstname].[lastname][number]@company.com
- **Password:** password123
- **Example:** rahul.sharma1@company.com / password123

**Sample Employee Logins:**
- priya.patel1@company.com
- amit.singh2@company.com
- sneha.kumar3@company.com
- vikram.reddy4@company.com

---

## 📁 PROJECT STRUCTURE

```
HR_LEAVE_TRACKER/
├── backend/
│   ├── config/              # Database configuration
│   ├── controllers/         # Business logic (auth, leave, HR, admin)
│   ├── middleware/          # Auth & role authorization
│   ├── models/              # MongoDB schemas (User, Leave, Attendance, etc.)
│   ├── routes/              # API endpoints
│   ├── scripts/             # Database seeding script
│   └── server.js            # Express app entry point
│
├── frontend/
│   ├── public/              # Static files
│   └── src/
│       ├── components/      # Reusable components (Navbar, Sidebar, etc.)
│       ├── context/         # React Context (Auth, Theme, Notifications)
│       ├── pages/
│       │   ├── Auth/        # Login, Register
│       │   ├── Employee/    # Employee-specific pages
│       │   ├── HR/          # HR-specific pages
│       │   └── Admin/       # Admin-specific pages
│       ├── services/        # API calls, utilities
│       └── assets/images/   # Images and avatars
│
└── IMAGE_SETUP.md          # Instructions for moving images
```

---

## 🎯 FEATURES BY ROLE

### 👤 Employee Features
- Personal dashboard with leave balance and stats
- Apply for leave (with working days calculation)
- View/cancel own leave requests
- Track monthly attendance with detailed records
- Check-in/Check-out functionality
- Profile management and password change

### 👔 HR Features
- HR-specific dashboard with employee metrics
- Approve/reject leave requests with reason
- View all employees in directory
- Search and filter employees
- Monitor pending leave approvals

### 👨‍💼 Admin Features  
- System-wide dashboard with comprehensive stats
- Manage user roles (promote to HR/Admin)
- Add/delete company holidays
- View user distribution by role
- Monitor system-wide leave and attendance metrics

---

## 🛠️ TECHNOLOGY STACK

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- React Router v6 (with role-based routing)
- Tailwind CSS (with dark mode support)
- Axios for API calls
- Context API for state management

**Database:**
- MongoDB Atlas

---

## 🎨 THEME SUPPORT

The application includes a complete dark/light theme toggle:
- **Light Mode:** Yellow (#F8C300) and Blue (#3B82F6) color scheme
- **Dark Mode:** Custom dark blue palette
- Theme preference saved in localStorage

---

## 📊 DATABASE SEEDING

To reset and repopulate the database with test data:

```powershell
cd backend
node scripts/seedDatabase.js
```

This will:
1. Clear existing employee data
2. Create 40 random employees
3. Generate 30 days of attendance records
4. Create sample leave requests
5. Ensure Admin and HR accounts exist

---

## 🖼️ IMAGE SETUP

Move your avatar image using PowerShell:

```powershell
Move-Item "C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\hr-avatar.png" "C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\frontend\src\assets\images\hr-avatar.png"
```

Then import and use in components:
```javascript
import hrAvatar from '../assets/images/hr-avatar.png';
```

See `IMAGE_SETUP.md` for detailed instructions.

---

## 🔄 API ENDPOINTS

### Auth Routes (`/api/auth`)
- POST `/register` - Register new user
- POST `/login` - User login
- GET `/profile` - Get user profile
- PUT `/profile` - Update profile
- POST `/change-password` - Change password

### Leave Routes (`/api/leaves`)
- POST `/apply` - Apply for leave
- GET `/my-leaves` - Get user's leaves
- GET `/stats` - Get leave statistics
- PUT `/:id/cancel` - Cancel leave request

### Attendance Routes (`/api/attendance`)
- POST `/check-in` - Check in
- POST `/check-out` - Check out
- GET `/my-attendance` - Get attendance records
- GET `/today` - Today's attendance

### HR Routes (`/api/hr`)
- GET `/dashboard` - HR dashboard stats
- GET `/employees` - All employees
- GET `/leave-requests` - Pending leave requests
- PUT `/leave-requests/:id/approve` - Approve leave
- PUT `/leave-requests/:id/reject` - Reject leave

### Admin Routes (`/api/admin`)
- GET `/dashboard` - Admin dashboard stats
- GET `/users` - All users
- PUT `/users/:id/role` - Update user role
- GET `/holidays` - Get holidays
- POST `/holidays` - Create holiday
- DELETE `/holidays/:id` - Delete holiday

---

## ✨ SIDEBAR NAVIGATION

The sidebar dynamically shows menu items based on user role:

**Employee:** Dashboard, Apply Leave, My Leaves, Attendance, Profile

**HR:** All Employee pages + HR Dashboard, Leave Requests, Employees, Attendance Summary

**Admin:** All Employee + HR pages + Admin Dashboard, User Management, Holidays, Leave Policies

---

## 🚧 FUTURE ENHANCEMENTS

- Photo upload functionality in Profile page
- Attendance summary charts for HR
- Leave policy configuration in Admin panel
- Email notifications for leave approvals
- Export reports (CSV/PDF)
- Calendar view for leaves and holidays
- Department-wise analytics

---

## 📝 NOTES

1. Both backend and frontend must be running simultaneously
2. MongoDB Atlas connection is already configured
3. All dependencies are installed
4. Database is populated with realistic test data
5. Dark mode toggle is in the Navbar
6. Role-based routing automatically redirects users to appropriate dashboards

---

## 🎉 APPLICATION IS READY TO USE!

All requested features have been implemented:
- ✅ HR and Admin pages created
- ✅ Role-based dashboard routing
- ✅ Attendance page completed
- ✅ Database populated with 40 employees
- ✅ Image assets folder ready

**Just start both servers and log in with any account to test!**

---

## 💡 TIPS

1. **Testing Roles:** Log in as admin@company.com to see all features
2. **HR Testing:** Log in as hr@company.com to test leave approvals
3. **Employee Testing:** Use any employee account to test employee features
4. **Dark Mode:** Click the moon/sun icon in the navbar to toggle theme
5. **Database Reset:** Run the seeding script anytime to reset test data

---

**Developed with ❤️ using MERN Stack**
