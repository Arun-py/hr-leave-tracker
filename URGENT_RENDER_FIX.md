# 🚨 URGENT: Render Deployment Fix

## ⚠️ Why Your Deployment is Failing

Your Render deployment **build succeeded** but the app **cannot start** because:

### Missing Environment Variables ❌

The code expects `MONGODB_URI` but it's **NOT SET** in your Render Dashboard.

---

## 🔧 IMMEDIATE FIX (Takes 2 Minutes)

### Step 1: Go to Render Dashboard
Visit: https://dashboard.render.com/web/srv-d3st49fdiees73cr8jrg

### Step 2: Click "Environment" (Left Sidebar)

### Step 3: Add These Variables

Click **"Add Environment Variable"** and add:

#### Variable 1: MONGODB_URI (REQUIRED!)
```
Key: MONGODB_URI
Value: mongodb+srv://Arun_db_user:fxkHhBcrdedLUBZu@cluster0.alzouxa.mongodb.net/hr_leave_tracker
```

#### Variable 2: JWT_SECRET (REQUIRED!)
```
Key: JWT_SECRET
Value: (Generate one using the command below, or use any long random string)
```

**Generate JWT_SECRET:**
Run this in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output and paste as the value.

#### Variable 3: JWT_EXPIRE (Optional - has default)
```
Key: JWT_EXPIRE
Value: 30d
```

### Step 4: Save and Redeploy

1. Click **"Save Changes"**
2. Go to **"Manual Deploy"** tab
3. Click **"Deploy latest commit"**
4. Wait for deployment to complete (1-2 minutes)

---

## ✅ Verify Success

After redeployment, check these:

### 1. Check Logs
Look for these messages:
```
MongoDB Connected: cluster0.alzouxa.mongodb.net
Server running in production mode on 0.0.0.0:8080
```

### 2. Test Endpoints

**Root Endpoint:**
```
https://hr-leave-tracker.onrender.com/
```

**API Info:**
```
https://hr-leave-tracker.onrender.com/api
```

**Health Check:**
```
https://hr-leave-tracker.onrender.com/api/auth/health
```

All should return JSON responses without errors.

---

## 📋 Current Status

✅ **Build:** Successful
✅ **Code:** Fixed and pushed to GitHub (commit 18faada)
❌ **Runtime:** Failing - Environment variables not set
⏳ **Waiting for:** You to add MONGODB_URI and JWT_SECRET in Render Dashboard

---

## 🎯 What I Fixed

1. **render.yaml** - Changed `MONGO_URI` to `MONGODB_URI` (matches code)
2. **render.yaml** - Added default values for JWT_EXPIRE, PORT, HOST
3. **.env.example** - Created comprehensive environment variable documentation
4. **Code** - All working, just needs environment variables set

---

## 🚀 After Setting Variables

Your deployment will:
1. ✅ Connect to MongoDB Atlas
2. ✅ Start the Express server
3. ✅ Serve API at https://hr-leave-tracker.onrender.com
4. ✅ Be ready for testing with seeded data

---

## 📞 If Still Having Issues

### Check MongoDB Atlas Whitelist:
1. Go to MongoDB Atlas
2. Network Access → IP Whitelist
3. Make sure **0.0.0.0/0** is allowed
4. Save and try again

### Check Render Logs:
Look for specific error messages in the Render logs and let me know.

---

## ⏰ Timeline

- **Now:** Environment variables not set
- **In 2 minutes:** After you add variables and redeploy
- **Result:** Fully working deployment! 🎉

**DO THIS NOW → Go to Render Dashboard and add MONGODB_URI and JWT_SECRET!**
