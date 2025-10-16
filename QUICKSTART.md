# Quick Start Guide - HR Leave Tracker

## 🚀 Your application is now ready!

### ✅ What's been created:

1. **Complete Backend** (Node.js + Express + MongoDB)
   - Authentication system with JWT
   - Leave management APIs
   - Attendance tracking
   - HR and Admin functionalities
   - Role-based access control

2. **Complete Frontend** (React + Tailwind CSS)
   - Modern, responsive UI with dark/light theme
   - Employee dashboard
   - Leave application system
   - Attendance marking
   - Profile management

### 🎯 Current Status:

✅ Backend server: Running on http://localhost:5000
✅ Frontend app: Compiling/Running on http://localhost:3000
✅ MongoDB: Connected to Atlas
✅ All dependencies: Installed

### 📝 How to Use:

1. **Open your browser** and go to: http://localhost:3000

2. **Create an account:**
   - Click "Sign up"
   - Fill in your details (name, email, password, etc.)
   - You'll be registered as an Employee by default
   - You'll be auto-logged in after registration

3. **Explore Features:**
   - **Dashboard**: View your leave balance and recent activities
   - **Apply Leave**: Request time off with automatic working days calculation
   - **My Leaves**: Track all your leave requests
   - **Attendance**: Mark your check-in/check-out
   - **Profile**: Update your information and change password

### 👥 Creating Admin/HR Users:

To test HR and Admin features, you need to manually update user roles in MongoDB:

**Method 1: Using MongoDB Compass or Atlas Web Interface**
1. Go to MongoDB Atlas: https://cloud.mongodb.com/
2. Navigate to your cluster → Browse Collections
3. Find the `users` collection in `hr_leave_tracker` database
4. Edit a user document and change `role` field to "HR" or "Admin"

**Method 2: Using MongoDB Shell**
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "Admin" } }
)
```

### 🎨 Color Theme:

**Light Mode:**
- Primary: Yellow (#F8C300)
- Secondary: Blue (#3B82F6)
- Clean white backgrounds

**Dark Mode:**
- Dark blue backgrounds
- Smooth gradients
- Easy on the eyes

Toggle theme using the sun/moon icon in the navbar!

### 📊 Leave Types Available:

- Casual Leave (CL) - 8 days/year
- Sick Leave (SL) - 12 days/year
- Earned Leave (EL) - 30 days/year
- Maternity Leave - 182/84 days
- Paternity Leave - 15 days
- Compensatory Off - Unlimited
- Leave Without Pay (LWP) - Unlimited
- Restricted Holidays - 2/year

### 🔧 If Something Doesn't Work:

**Backend not running?**
```bash
cd backend
npm start
```

**Frontend not running?**
```bash
cd frontend
npm start
```

**Clear browser cache:**
- Press Ctrl + Shift + Delete
- Clear cookies and cached data

**Port conflicts:**
- Backend uses port 5000
- Frontend uses port 3000
- Make sure these ports are available

### 📱 Test the Complete Flow:

1. **Register** as an employee
2. **Check Dashboard** - See your leave balance
3. **Mark Attendance** - Click check-in button
4. **Apply for Leave** - Select dates and type
5. **View My Leaves** - See your request (Pending status)
6. **Change Role to HR** - Update in MongoDB
7. **Login Again** - You'll see HR Dashboard
8. **Approve/Reject Leaves** - Test HR functionality

### 🌐 URLs:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB Atlas**: https://cloud.mongodb.com/

### 🎉 Features Ready:

✅ User Registration & Login
✅ JWT Authentication
✅ Role-Based Access (Employee/HR/Admin)
✅ Leave Application System
✅ Automatic Working Days Calculation
✅ Leave Balance Tracking
✅ Attendance Check-in/Check-out
✅ HR Leave Approval System
✅ Employee Management (HR)
✅ Holiday Management (Admin)
✅ Dark/Light Theme Toggle
✅ Responsive Design
✅ Profile Management
✅ Password Change
✅ Notifications System

### 📝 Next Steps for Full Functionality:

1. Create some sample holidays (as Admin)
2. Test leave application and approval flow
3. Mark attendance for a few days
4. Explore HR dashboard and reports
5. Test all CRUD operations

### 🔐 Security:

- Passwords are hashed with bcrypt
- JWT tokens for authentication
- Protected routes on both frontend and backend
- Role-based middleware for authorization

### 💡 Tips:

- The app auto-calculates working days (excludes weekends & holidays)
- Leave balance is automatically deducted when leaves are approved
- Check-in/check-out tracks your work hours
- You can cancel pending or approved leaves
- Theme preference is saved in localStorage

### 📞 Need Help?

Check the main README.md for detailed API documentation and project structure.

---

**Congratulations! Your HR Leave Tracker is fully functional! 🎊**

Start by registering an account and exploring the features!
