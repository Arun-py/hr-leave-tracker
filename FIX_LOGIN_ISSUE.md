# 🚨 URGENT: Fix Login Issue

## Problem
Frontend is trying to connect to `http://localhost:8080/api` instead of your deployed backend.

## Solution: Add Environment Variable in Vercel

### Step 1: Go to Frontend Project Settings
1. Go to https://vercel.com/dashboard
2. Select your **frontend project** (hr-leave-tracker)
3. Click **Settings** tab
4. Click **Environment Variables** in sidebar

### Step 2: Add Backend API URL
Add this environment variable:

**Key:** `REACT_APP_API_URL`

**Value:** `https://hr-leave-tracker.vercel.app/api`

*(Replace with your actual backend Vercel URL if different)*

**Environment:** Select **All** (Production, Preview, and Development)

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Wait for redeployment to complete (2-3 minutes)

### Step 4: Test Login
Go to your app and try logging in with:
- Email: `admin@company.com`
- Password: `admin123`

---

## Alternative: If You Have Separate Frontend & Backend Projects

If your frontend and backend are deployed as separate Vercel projects:

**Backend URL:** `https://your-backend-name.vercel.app`
**Frontend URL:** `https://your-frontend-name.vercel.app`

Then use:
`REACT_APP_API_URL=https://your-backend-name.vercel.app/api`

---

## Quick Check

Visit your backend directly:
- `https://hr-leave-tracker.vercel.app/` 
  Should return: `{"message":"HR Leave Tracker API is running..."}`

- `https://hr-leave-tracker.vercel.app/api/auth/login`
  Should be available (will give error without credentials, but shouldn't be 404)

---

## After Setting Environment Variable

Your login should work! The frontend will call:
`https://hr-leave-tracker.vercel.app/api/auth/login`

Instead of:
`http://localhost:8080/api/auth/login` ❌
