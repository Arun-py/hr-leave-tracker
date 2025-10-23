# HR Leave Tracker - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### Prerequisites
- GitHub account with the repository pushed
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas database (already configured)

### Step 1: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your repository: `Arun-py/hr-leave-tracker`
5. Click **"Import"**

### Step 2: Configure Project Settings

**Framework Preset:** Other (or leave as detected)

**Root Directory:** `./` (leave default)

**Build Settings:**
- Build Command: `cd frontend && npm install && npm run build`
- Output Directory: `frontend/build`
- Install Command: `npm install`

### Step 3: Environment Variables

Click **"Environment Variables"** and add the following:

#### Backend Variables:
```
PORT=8080
MONGODB_URI=mongodb+srv://Arun_db_user:fxkHhBcrdedLUBZu@cluster0.alzouxa.mongodb.net/hr_leave_tracker?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_in_production_2024
JWT_EXPIRE=30d
NODE_ENV=production
```

#### Frontend Variables (if needed):
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

### Step 4: Deploy Backend Separately (Recommended)

For better performance, deploy backend and frontend as separate services:

#### Option A: Deploy Both Together
- Deploy as monorepo (current setup)
- Vercel will handle both frontend and backend

#### Option B: Deploy Separately (Recommended)

**Backend Deployment:**
1. Create new Vercel project
2. Set Root Directory to `backend`
3. Add backend environment variables
4. Deploy

**Frontend Deployment:**
1. Create separate Vercel project
2. Set Root Directory to `frontend`
3. Update `REACT_APP_API_URL` to point to backend URL
4. Deploy

### Step 5: Configure CORS

Update `backend/server.js` CORS configuration to include your Vercel URLs:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-frontend-app.vercel.app',
    'https://your-custom-domain.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};
```

### Step 6: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Once deployed, you'll get your live URLs

### Step 7: Test Deployment

1. Open your deployed frontend URL
2. Test login with credentials:
   - Admin: `admin@company.com` / `admin123`
   - HR: `hr@company.com` / `admin123`
   - Employee: `rahul.sharma1@company.com` / `password123`

## 📝 Post-Deployment

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Monitoring
- Check Vercel Dashboard for logs
- Monitor MongoDB Atlas for database connections
- Set up error tracking (optional: Sentry, LogRocket)

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### API Connection Issues
- Verify CORS settings
- Check environment variables
- Ensure MongoDB IP whitelist includes `0.0.0.0/0` for Vercel

### Database Connection Failed
- Verify MongoDB connection string
- Check MongoDB Atlas network access
- Ensure database user credentials are correct

## 🎯 Alternative: Deploy Backend on Railway/Render

If Vercel has issues with the backend, consider:

**Railway.app:**
1. Connect GitHub repo
2. Deploy backend folder
3. Add environment variables
4. Get deployment URL

**Render.com:**
1. New Web Service
2. Connect repository
3. Root directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`

## 📦 What's Deployed

✅ Backend API (Node.js + Express)
✅ Frontend (React SPA)
✅ MongoDB Database (Atlas)
✅ JWT Authentication
✅ All Features & Routes

## 🔗 Repository

GitHub: https://github.com/Arun-py/hr-leave-tracker

---

**Need Help?** Check Vercel docs: https://vercel.com/docs
