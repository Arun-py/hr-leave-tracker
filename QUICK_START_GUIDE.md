# ✅ HR LEAVE TRACKER - SERVERS ARE RUNNING!

## 🟢 CURRENT SERVER STATUS

✅ **Backend Server:** RUNNING on port 5000  
✅ **Frontend Server:** RUNNING on port 3000  
✅ **Database:** Connected to MongoDB Atlas  
✅ **Test Data:** 40 employees loaded

---

## 🌐 HOW TO ACCESS THE APPLICATION

### ⚠️ CRITICAL: DO NOT USE VS CODE SIMPLE BROWSER!

**Use your regular browser instead:**
1. Open **Chrome**, **Edge**, or **Firefox**
2. Go to: **http://localhost:3000**
3. Wait 10-20 seconds for initial load
4. Login page should appear

**Alternative URL if localhost doesn't work:**
- http://10.63.120.133:3000

---

## 🔐 LOGIN CREDENTIALS

### Admin Account
- **Email:** admin@company.com
- **Password:** admin123

### HR Account
- **Email:** hr@company.com
- **Password:** admin123

### Employee Accounts (pick any)
- **Email:** rahul.sharma1@company.com
- **Email:** priya.patel2@company.com
- **Email:** amit.singh3@company.com
- **Password (for all employees):** password123

---

## ⚠️ PASSWORD SECURITY WARNING

**You may see this warning from Google Password Manager:**
> "Password found in a data breach"

**This is NORMAL and EXPECTED!** These are intentionally simple test passwords for development:
- `admin123` - Common test password
- `password123` - Common test password

**These are NOT production passwords.** They are only for local testing.

You can:
- ✅ Ignore the warning (it's just a test environment)
- ✅ Tell Chrome "Never" for this site
- ✅ Don't save the password in password manager

---

## 🚨 TROUBLESHOOTING

### Problem: "This site can't be reached" or "ERR_CONNECTION_REFUSED"

**Solution:**
1. Wait 30-60 seconds (React takes time to compile)
2. Check both terminal windows:
   - Backend should show: "Server running in development mode on port 5000"
   - Frontend should show: "Compiled successfully!"
3. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
4. Try the network URL: http://10.63.120.133:3000

### Problem: Page loads but is blank

**Solution:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Make sure backend is running (check terminal)
4. Clear browser cache and refresh

### Problem: Servers stopped working

**Solution - Restart Servers:**

**Option 1: Manual (Recommended)**
```powershell
# Terminal 1 - Backend
cd c:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\backend
npm start

# Terminal 2 - Frontend (in a separate terminal)
cd c:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\frontend
npm start
```

**Option 2: PowerShell Script**
```powershell
cd c:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER
.\START_SERVERS.ps1
```

---

## 📊 WHAT TO TEST

### 1. Login as Admin (admin@company.com / admin123)
- ✅ See Admin Dashboard with 40 employees
- ✅ Go to User Management → Change someone's role
- ✅ Go to Holidays → Add a holiday
- ✅ Check system statistics

### 2. Login as HR (hr@company.com / admin123)
- ✅ See HR Dashboard
- ✅ Go to Leave Requests → Approve/Reject leaves
- ✅ Go to Employees → Search for employees
- ✅ View pending approvals (there are 126 leave requests in DB)

### 3. Login as Employee (rahul.sharma1@company.com / password123)
- ✅ See personal dashboard
- ✅ Go to Attendance → View monthly records (past 30 days)
- ✅ Go to Apply Leave → Submit a leave request
- ✅ Go to My Leaves → View your leave history
- ✅ Check leave balance

---

## 🎯 QUICK REFERENCE

| What | URL | Command |
|------|-----|---------|
| Frontend | http://localhost:3000 | `cd frontend && npm start` |
| Backend | http://localhost:5000 | `cd backend && npm start` |
| Seed Database | N/A | `cd backend && node scripts/seedDatabase.js` |

---

## 📁 IMPORTANT FILES

- `LOGIN_CREDENTIALS.md` - All login details
- `SETUP_COMPLETE.md` - Full project documentation
- `START_SERVERS.ps1` - Quick server startup script
- `IMAGE_SETUP.md` - Instructions for adding images

---

## 💡 TIPS

1. **Keep both terminal windows open** while using the app
2. **Use Chrome/Edge/Firefox** - NOT VS Code Simple Browser
3. **Wait for compilation** - React apps take 10-20 seconds to load initially
4. **Ignore password breach warnings** - These are test credentials only
5. **Both servers must run together** - Backend provides APIs for Frontend

---

## 🎉 YOU'RE ALL SET!

Both servers are running. Open **http://localhost:3000** in Chrome/Edge/Firefox and start testing!

**Need help?** Check SETUP_COMPLETE.md for full documentation.
