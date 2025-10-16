# 🚨 TROUBLESHOOTING GUIDE - HR LEAVE TRACKER

## PROBLEM: "This site can't be reached" / ERR_CONNECTION_REFUSED

### ✅ SOLUTION 1: Use the START.bat file

**EASIEST METHOD:**
1. Navigate to: `C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER`
2. Double-click **START.bat**
3. Two command windows will open (Backend and Frontend)
4. Wait 30-60 seconds for both to compile
5. Open **Chrome/Edge/Firefox** (NOT VS Code browser)
6. Go to: **http://localhost:3000**

---

### ✅ SOLUTION 2: Manual Start (If batch file doesn't work)

**Open 2 separate PowerShell/CMD windows:**

**Window 1 - Backend:**
```powershell
cd C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\backend
npm start
```
**Wait until you see:** "Server running in development mode on port 5000"

**Window 2 - Frontend:**
```powershell
cd C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\frontend
npm start
```
**Wait until you see:** "Compiled successfully!"

**Then:**
- Open Chrome/Edge/Firefox
- Go to: http://localhost:3000
- Wait for login page to load

---

### ✅ SOLUTION 3: Check if ports are blocked

```powershell
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

If you see results, ports are in use. Kill the processes:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

Then restart servers.

---

## PROBLEM: No logos/backgrounds/avatars showing

### ✅ SOLUTION: I've enhanced the Login page

The login page now has:
- ✅ **Built-in SVG logo** (no external images needed)
- ✅ **Gradient background** (yellow and blue)
- ✅ **Test credentials displayed** on the page
- ✅ **Modern UI** with shadows and rounded corners

**No images needed!** Everything is CSS/SVG based.

If you want to add custom images later:
1. Place images in: `frontend/src/assets/images/`
2. Import in component: `import logo from '../assets/images/logo.png'`
3. Use in JSX: `<img src={logo} alt="Logo" />`

---

## PROBLEM: Cannot login / Authentication not working

### ✅ SOLUTION: Verify backend is running

**Check backend terminal shows:**
```
Server running in development mode on port 5000
MongoDB Connected: ac-siv5hkk-shard-00-XX.alzouxa.mongodb.net
```

**If not connected to MongoDB:**
- Internet connection issue
- MongoDB Atlas timeout
- Check firewall settings

**Test backend directly:**
Open browser: http://localhost:5000/api/auth/profile
- Should show: "Not authorized, no token" (this is correct!)

---

## PROBLEM: Login page loads but submit does nothing

### ✅ SOLUTION: Check browser console

1. Press **F12** to open DevTools
2. Click **Console** tab
3. Try to login
4. Look for errors

**Common errors:**

**"Network Error" or "ERR_CONNECTION_REFUSED":**
- Backend is not running
- Go to backend terminal and restart: `npm start`

**"404 Not Found":**
- Wrong API URL
- Check `frontend/src/services/api.js` has: `http://localhost:5000/api`

**CORS error:**
- Backend CORS not configured (already fixed in our setup)

---

## PROBLEM: Page is blank after login

### ✅ SOLUTION: Check routing

1. After login, you should be redirected to dashboard
2. Check browser URL - should be one of:
   - `/admin/dashboard` (if logged in as admin)
   - `/hr/dashboard` (if logged in as HR)
   - `/dashboard` (if logged in as employee)

**If stuck on login page:**
- Clear browser cache (Ctrl+Shift+Delete)
- Clear localStorage: F12 → Application → Local Storage → Clear All
- Try again

---

## PROBLEM: "Password found in data breach" warning

### ✅ THIS IS NORMAL AND EXPECTED!

**Why:**
- `admin123` and `password123` are common test passwords
- Google knows these are leaked/common passwords
- This is a **local development environment**, not production

**What to do:**
- ✅ **Ignore the warning** - it's just for testing
- ✅ Click **"Never"** for this site in password manager
- ✅ Don't save passwords in browser for this test app

**NOTE:** If this were a production app, you would use strong passwords. But for local testing, simple passwords are fine.

---

## PROBLEM: VS Code Simple Browser doesn't work

### ✅ SOLUTION: Don't use it!

**VS Code Simple Browser has issues with:**
- React development server
- Hot module replacement
- WebSocket connections
- localStorage/sessionStorage

**Always use regular browser:**
- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ❌ NOT VS Code Simple Browser

---

## WORKING CONFIGURATION CHECKLIST

Before trying to access the app, verify:

- [ ] Backend terminal shows "Server running on port 5000"
- [ ] Backend terminal shows "MongoDB Connected"
- [ ] Frontend terminal shows "Compiled successfully!"
- [ ] Frontend terminal shows "Local: http://localhost:3000"
- [ ] You're using Chrome/Edge/Firefox (NOT VS Code browser)
- [ ] You've waited at least 30 seconds after "Compiled successfully"
- [ ] URL is exactly: http://localhost:3000 (not https, not 127.0.0.1)

---

## TEST CREDENTIALS (visible on login page now)

**Admin:**
- Email: admin@company.com
- Password: admin123

**HR:**
- Email: hr@company.com
- Password: admin123

**Employee:**
- Email: rahul.sharma1@company.com
- Password: password123

---

## QUICK START SUMMARY

1. **Run START.bat** or manually start both servers
2. **Wait 30-60 seconds** for compilation
3. **Open Chrome/Edge/Firefox** (regular browser)
4. **Go to http://localhost:3000**
5. **See test credentials on login page**
6. **Login with any account above**
7. **Ignore password breach warning** (it's a test app)

---

## STILL NOT WORKING?

**Last resort debugging steps:**

1. **Kill everything and restart:**
```powershell
# Kill all node processes
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# Navigate to project
cd C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER

# Start backend (wait for success)
cd backend
npm start

# In NEW terminal, start frontend
cd C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\frontend
npm start
```

2. **Check Windows Firewall:**
- Allow Node.js through firewall
- Allow ports 3000 and 5000

3. **Try network URL:**
- http://10.63.120.133:3000

4. **Reinstall dependencies** (only if nothing else works):
```powershell
cd backend
rm -r node_modules
npm install

cd ../frontend
rm -r node_modules
npm install
```

---

**If you follow this guide, the app WILL work!** 🎉
