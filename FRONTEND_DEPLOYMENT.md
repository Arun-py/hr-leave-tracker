# HR Leave Tracker - Frontend Deployment

## ✅ Backend Already Deployed!

Your backend API is live and working: `{"message":"HR Leave Tracker API is running..."}`

## 🚀 Deploy Frontend to Vercel

### Step 1: Create New Vercel Project for Frontend

1. Go to https://vercel.com/new
2. Import your repository: `Arun-py/hr-leave-tracker` (same repo)
3. Click **Import**

### Step 2: Configure Build Settings

**Framework Preset:** Create React App

**Root Directory:** `frontend` ⚠️ (IMPORTANT - Set this!)

**Build Command:** `npm run build` (auto-detected)

**Output Directory:** `build` (auto-detected)

**Install Command:** `npm install` (auto-detected)

### Step 3: Add Environment Variable

Click **"Environment Variables"** and add:

**Key:** `REACT_APP_API_URL`

**Value:** `https://YOUR-BACKEND-URL.vercel.app/api`

Replace `YOUR-BACKEND-URL` with your actual Vercel backend URL.

Example:
```
REACT_APP_API_URL=https://hr-leave-tracker-api.vercel.app/api
```

### Step 4: Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for build to complete
3. Once deployed, click on the URL to access your app

### Step 5: Test the Application

Login with these credentials:

**Admin:**
- Email: `admin@company.com`
- Password: `admin123`

**HR:**
- Email: `hr@company.com`
- Password: `admin123`

**Employee:**
- Email: `rahul.sharma1@company.com`
- Password: `password123`

## 📝 Configuration Details

### Backend (Already Deployed)
- Returns: `{"message":"HR Leave Tracker API is running..."}`
- All API routes under `/api/*`
- MongoDB connected and working

### Frontend (To Deploy)
- Root Directory: `frontend`
- Framework: React (Create React App)
- API calls configured via `REACT_APP_API_URL`

## 🔧 If Deployment Fails

### Common Issues:

1. **Build Error - Out of Memory:**
   - In Vercel project settings, try adding: `NODE_OPTIONS=--max_old_space_size=4096`

2. **API Connection Failed:**
   - Verify `REACT_APP_API_URL` is correct
   - Check backend CORS allows frontend domain
   - Check Network tab in browser console

3. **Blank Page After Deploy:**
   - Check browser console for errors
   - Verify environment variable is set
   - Check if backend is accessible

## 🎯 Two Projects on Vercel

You should have:
1. **Backend Project** - Returns API response ✅ (Already deployed)
2. **Frontend Project** - React UI (Deploy now)

## 🔗 Update CORS After Frontend Deploy

After frontend deploys, update backend CORS:

1. Note your frontend URL (e.g., `https://hr-tracker-frontend.vercel.app`)
2. Backend `server.js` already includes Vercel domains in CORS
3. No changes needed! (Already configured with `/https:\/\/.+\.vercel\.app/`)

## ✨ Final Result

- **Backend:** https://your-backend.vercel.app
- **Frontend:** https://your-frontend.vercel.app
- **Status:** Both fully deployed and connected!

---

Ready to deploy? Follow the steps above! 🚀
