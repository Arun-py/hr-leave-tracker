# CRITICAL: Vercel Environment Variables

## ⚠️ IMPORTANT - Set These in Vercel Dashboard

Go to: https://vercel.com/dashboard
Select: **hr-leave-tracker** project
Navigate: **Settings** → **Environment Variables**

## Required Environment Variables:

### Backend Environment Variables:

Add these for **Production**, **Preview**, and **Development** environments:

```
MONGODB_URI=mongodb+srv://Arun_db_user:fxkHhBcrdedLUBZu@cluster0.alzouxa.mongodb.net/hr_leave_tracker?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=your_jwt_secret_key_change_in_production_2024

JWT_EXPIRE=30d

NODE_ENV=production

PORT=8080
```

## Steps to Add:

1. **Go to Vercel Dashboard**
2. **Select your backend project** (hr-leave-tracker)
3. **Click Settings** → **Environment Variables**
4. **For each variable above:**
   - Click "Add New"
   - Enter Key (e.g., MONGODB_URI)
   - Enter Value
   - Select all environments: ☑️ Production ☑️ Preview ☑️ Development
   - Click Save
5. **After adding all variables:**
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

## Why This is Critical:

Without these environment variables:
- ❌ MongoDB won't connect
- ❌ JWT authentication won't work
- ❌ Server will crash with 500 error

## Verification:

After setting variables and redeploying:
- Check: https://hr-leave-tracker.vercel.app/
- Should return: `{"message":"HR Leave Tracker API is running..."}`
- No 500 errors!
