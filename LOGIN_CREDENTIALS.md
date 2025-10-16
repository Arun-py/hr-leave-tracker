# 🔐 LOGIN CREDENTIALS - HR LEAVE TRACKER

## ⚠️ SECURITY NOTE
These are TEST CREDENTIALS for development only. The passwords are intentionally simple for testing purposes. 
**Chrome/Google Password Manager Warning:** You may see a "password found in data breach" warning - this is expected for common test passwords like "admin123" and "password123". These are NOT production passwords.

## ⚡ QUICK LOGIN REFERENCE

### 👨‍💼 ADMIN ACCOUNT
**Email:** admin@company.com  
**Password:** admin123  
**Access:** Full system access, user management, holidays, policies

---

### 👔 HR ACCOUNT
**Email:** hr@company.com  
**Password:** admin123  
**Access:** HR dashboard, approve/reject leaves, employee management

---

### 👤 EMPLOYEE ACCOUNTS (40 TOTAL)

**Password for ALL employees:** password123

#### Sample Employee Logins:
1. **Email:** rahul.sharma1@company.com | **Password:** password123
2. **Email:** priya.patel2@company.com | **Password:** password123
3. **Email:** amit.singh3@company.com | **Password:** password123
4. **Email:** sneha.kumar4@company.com | **Password:** password123
5. **Email:** vikram.reddy5@company.com | **Password:** password123
6. **Email:** anjali.nair6@company.com | **Password:** password123
7. **Email:** arjun.mehta7@company.com | **Password:** password123
8. **Email:** pooja.gupta8@company.com | **Password:** password123
9. **Email:** karan.verma9@company.com | **Password:** password123
10. **Email:** neha.shah10@company.com | **Password:** password123

---

## 🌐 APPLICATION URLS

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Network Access:** http://10.63.120.133:3000

⚠️ **IMPORTANT BROWSER INSTRUCTIONS:**
- **DO NOT** use VS Code Simple Browser - it has compatibility issues
- **USE** your regular browser: Chrome, Edge, or Firefox
- **Steps to Access:**
  1. Both servers must be running (check terminals show "compiled successfully" and "MongoDB Connected")
  2. Open **http://localhost:3000** in Chrome/Edge/Firefox
  3. Wait 10-20 seconds for initial load
  4. Login page should appear
  5. If you see "connection refused", wait 30 seconds and refresh

---

## 🎯 WHAT EACH ROLE CAN DO

### ADMIN (admin@company.com)
✅ View system-wide statistics  
✅ Change user roles (promote to HR/Admin)  
✅ Add/delete company holidays  
✅ Manage leave policies  
✅ Access all HR features  
✅ Access all Employee features  

### HR (hr@company.com)
✅ View HR dashboard with employee metrics  
✅ Approve/reject leave requests  
✅ View employee directory  
✅ Search and filter employees  
✅ Monitor attendance summary  
✅ Access all Employee features  

### EMPLOYEE (any employee account)
✅ Personal dashboard with leave balance  
✅ Apply for leave  
✅ View/cancel own leave requests  
✅ Track monthly attendance  
✅ Check-in/Check-out  
✅ Update profile & change password  

---

## 📊 TEST DATA IN DATABASE

- **Total Employees:** 40
- **Attendance Records:** 726 (past 30 days)
- **Leave Requests:** 126 (mixed statuses)
- **Departments:** IT, HR, Finance, Sales, Marketing, Operations, Support, Engineering

---

## 💡 QUICK START

1. **Start Backend:** `cd backend && npx nodemon server.js`
2. **Start Frontend:** `cd frontend && npm start`
3. **Open Browser:** http://localhost:3000
4. **Login:** Use any credentials above

---

## ⚠️ IMPORTANT NOTES

- All employee passwords are the same: **password123**
- Admin and HR passwords are the same: **admin123**
- Email format for employees: **[firstname].[lastname][number]@company.com**
- Database is already populated with realistic test data
- Both servers must be running simultaneously

---

**Ready to test! Open http://localhost:3000 in your browser** 🚀
