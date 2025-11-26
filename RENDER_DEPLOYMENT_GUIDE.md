# 🚀 Backend Deployment Guide - Render

This guide will help you deploy your backend API to Render in about 15 minutes.

## Prerequisites

- GitHub account (you already have this ✅)
- Your code pushed to GitHub (already done ✅)
- Email address for Render account

---

## Step 1: Create Render Account (2 minutes)

1. Go to https://render.com
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (easiest option)
4. Authorize Render to access your GitHub account
5. Complete your profile

---

## Step 2: Create New Web Service (3 minutes)

1. From your Render Dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - If not connected, click **"Connect account"** and authorize
   - Find and select: `product-feedback-system` repository
   - Click **"Connect"**

---

## Step 3: Configure Service Settings (5 minutes)

Fill in the following settings:

### Basic Settings
- **Name**: `product-feedback-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., Oregon, Frankfurt, Singapore)
- **Branch**: `main`
- **Root Directory**: `packages/backend`

### Build & Deploy Settings
- **Runtime**: `Node`
- **Build Command**: 
  ```
  npm install && node scripts/init-db.js && npm run build
  ```
- **Start Command**:
  ```
  node dist/index.js
  ```

### Instance Type
- Select **"Free"** (perfect for testing)

---

## Step 4: Add Environment Variables (3 minutes)

Scroll down to **"Environment Variables"** section and add these:

Click **"Add Environment Variable"** for each:

1. **JWT_SECRET**
   - Value: Generate a random string (see below)

2. **JWT_REFRESH_SECRET**
   - Value: Generate another random string (see below)

3. **NODE_ENV**
   - Value: `production`

4. **PORT**
   - Value: `10000`

5. **DATABASE_PATH**
   - Value: `/opt/render/project/src/database/feedback.db`

### How to Generate Secrets

Open a new terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run it twice to get two different secrets for JWT_SECRET and JWT_REFRESH_SECRET.

---

## Step 5: Deploy! (2 minutes)

1. Scroll to the bottom
2. Click **"Create Web Service"**
3. Wait for deployment (usually 2-5 minutes)
4. Watch the logs - you'll see:
   - Installing dependencies
   - Initializing database
   - Building TypeScript
   - Starting server

---

## Step 6: Get Your Backend URL

Once deployed successfully:

1. You'll see **"Your service is live 🎉"**
2. Copy your backend URL (looks like: `https://product-feedback-backend.onrender.com`)
3. **Save this URL** - you'll need it for the next step

---

## Step 7: Update Frontend Configuration (5 minutes)

Now we need to tell your Netlify frontend where the backend is:

### Option A: Update via Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **"Add a variable"**
5. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (your Render URL from Step 6)
6. Click **"Save"**
7. Go to **Deploys** tab
8. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Option B: Update via Code (Alternative)

I can help you update the code and push changes if you prefer this method.

---

## Step 8: Test Your Application! 🎉

1. Go to your Netlify URL
2. Try logging in with:
   - **Email**: `user@example.com`
   - **Password**: `user123`
3. Or moderator account:
   - **Email**: `moderator@example.com`
   - **Password**: `admin123`

---

## Troubleshooting

### If Backend Deploy Fails

**Check the logs** in Render dashboard:
- Look for error messages
- Common issues:
  - Build command failed → Check if all dependencies are in package.json
  - Database initialization failed → Check init-db.js script
  - Port binding issues → Make sure PORT env variable is set

### If Frontend Can't Connect to Backend

1. **Check CORS**: Make sure backend allows your Netlify domain
2. **Check URL**: Verify VITE_API_URL is correct (no trailing slash)
3. **Check Backend Status**: Visit your Render URL directly - should see a response

### Backend Goes to Sleep (Free Tier)

Render free tier sleeps after 15 minutes of inactivity:
- First request after sleep takes ~30 seconds
- Upgrade to paid tier ($7/month) for always-on service

---

## What's Next?

Once everything is working:

1. **Custom Domain** (Optional)
   - Add your own domain in Render settings
   - Update Netlify environment variable

2. **Monitoring**
   - Check Render dashboard for logs
   - Monitor performance and errors

3. **Database Backups**
   - Render free tier doesn't persist disk storage
   - Consider upgrading or using external database for production

---

## Need Help?

If you encounter issues:
1. Check Render logs for error messages
2. Verify all environment variables are set correctly
3. Make sure your GitHub repository is up to date
4. Check that the build and start commands are correct

---

## Summary

✅ Backend deployed to Render
✅ Database initialized with sample data  
✅ Environment variables configured
✅ Frontend connected to backend
✅ Application fully functional!

**Your application is now live and working!** 🎉
