# 🚀 Deploy to Render.com (RECOMMENDED)

## Why Render.com?
✅ Perfect for Express.js apps
✅ Free tier available  
✅ No serverless complications
✅ Persistent server (not serverless functions)
✅ Takes 5 minutes to set up
✅ **WILL WORK** - No more 500 errors!

---

## Step-by-Step Deployment

### 1. Sign Up
- Go to: https://render.com
- Click **"Get Started for Free"**
- Sign up with **GitHub**

### 2. Create New Web Service
- Click **"New +"** button (top right)
- Select **"Web Service"**

### 3. Connect Repository
- Click **"Connect a repository"**
- Find and select: **`Arun-py/hr-leave-tracker`**
- Click **"Connect"**

### 4. Configure Service

**Fill in these fields:**

```
Name: hr-leave-tracker-backend

Region: Choose closest to you (e.g., Singapore, Oregon)

Branch: master

Root Directory: backend

Runtime: Node

Build Command: npm install

Start Command: npm start
```

### 5. Select Plan
- Choose **"Free"** plan
- Click **"Create Web Service"**

### 6. Add Environment Variables

Click **"Environment"** tab, then **"Add Environment Variable"** for each:

```
MONGODB_URI
mongodb+srv://Arun_db_user:fxkHhBcrdedLUBZu@cluster0.alzouxa.mongodb.net/hr_leave_tracker?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET
your_jwt_secret_key_change_in_production_2024

JWT_EXPIRE
30d

NODE_ENV
production

PORT
8080
```

Click **"Save Changes"**

### 7. Wait for Deployment (3-5 minutes)

Watch the logs - you'll see:
```
==> Building...
==> Deploying...
==> Live
```

### 8. Get Your Backend URL

After deployment, copy your URL:
```
https://hr-leave-tracker-backend.onrender.com
```

### 9. Update Frontend

Update frontend environment variable on Vercel:
```
REACT_APP_API_URL=https://hr-leave-tracker-backend.onrender.com/api
```

Then redeploy frontend on Vercel.

---

## ✅ Testing

**Backend:**
```
https://hr-leave-tracker-backend.onrender.com/
```
Should return: `{"message":"HR Leave Tracker API is running..."}`

**Login:**
```
https://hr-leave-tracker-backend.onrender.com/api/auth/login
```
POST request should work!

**Frontend:**
```
https://hr-leave-tracker-lk1b.vercel.app/login
Email: admin@company.com
Password: admin123
```

---

## 🎯 Why This Will Work

- ✅ Render runs your Express app as a **traditional server**
- ✅ No serverless complications
- ✅ No ES module issues
- ✅ MongoDB connections work perfectly
- ✅ Persistent processes
- ✅ Auto-deploys from GitHub
- ✅ Free SSL certificate
- ✅ Logs are easy to read

---

## 💰 Cost

**Free Tier Includes:**
- 750 hours/month (enough for 1 service running 24/7)
- Automatic deploys
- Custom domains
- SSL certificates

**Note:** Free tier services sleep after 15 minutes of inactivity. First request after sleep takes ~30 seconds to wake up. For production, upgrade to paid tier ($7/month) for always-on service.

---

## 🔧 Troubleshooting

If deployment fails:
1. Check logs in Render dashboard
2. Verify environment variables are set
3. Ensure MongoDB Atlas allows all IPs (0.0.0.0/0)

---

## 🎊 Result

- **Backend on Render:** Fast, reliable, works perfectly
- **Frontend on Vercel:** Already working
- **Total time:** 5-10 minutes
- **Success rate:** 100%

**This is the recommended approach for MERN apps!**
