# 🚀 Deploy to Netlify - Step by Step

Follow these exact steps to deploy your Product Feedback System to Netlify.

## ⏱️ Time Required: 10-15 minutes

---

## Step 1: Prepare Your Code (2 minutes)

### 1.1 Initialize Git (if not done)

```bash
git init
git add .
git commit -m "Initial commit - Product Feedback System"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (name it `product-feedback-system`)
3. **Don't** initialize with README (you already have one)
4. Click "Create repository"

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/product-feedback-system.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 2: Create Netlify Account (2 minutes)

1. Go to [Netlify](https://app.netlify.com/signup)
2. Click **"Sign up with GitHub"**
3. Authorize Netlify to access your GitHub account
4. Complete your profile

---

## Step 3: Deploy to Netlify (3 minutes)

### 3.1 Create New Site

1. Click **"Add new site"** button
2. Select **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select your `product-feedback-system` repository

### 3.2 Configure Build Settings

Netlify should auto-detect from `netlify.toml`, but verify:

**Site settings:**
- **Branch to deploy:** `main`
- **Base directory:** (leave empty)
- **Build command:** `npm install && npm run build --workspace=shared && npm run build --workspace=backend && npm run build --workspace=web`
- **Publish directory:** `packages/web/dist`
- **Functions directory:** `packages/backend/dist/netlify/functions`

Click **"Deploy site"**

### 3.3 Wait for Build

- Build takes 3-5 minutes
- Watch the build log for any errors
- You'll see: "Site is live" when done

### 3.4 Note Your Site URL

Your site will be at: `https://random-name-12345.netlify.app`

You can change this later in Site settings.

---

## Step 4: Configure Environment Variables (3 minutes)

### 4.1 Generate Secrets

Open a terminal and run:

```bash
# Generate JWT secret
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Generate refresh secret
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

Copy these values!

### 4.2 Add to Netlify

1. In Netlify Dashboard, go to **Site settings**
2. Click **"Environment variables"** in left sidebar
3. Click **"Add a variable"**

Add these variables one by one:

| Key | Value | Example |
|-----|-------|---------|
| `JWT_SECRET` | (paste generated value) | `a1b2c3d4e5f6...` |
| `JWT_REFRESH_SECRET` | (paste generated value) | `f6e5d4c3b2a1...` |
| `NODE_ENV` | `production` | `production` |
| `DATABASE_PATH` | `./database/feedback.db` | `./database/feedback.db` |

**Optional (for Google OAuth):**

| Key | Value |
|-----|-------|
| `GOOGLE_CLIENT_ID` | Your Google Client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google Client Secret |
| `GOOGLE_CALLBACK_URL` | `https://YOUR_SITE.netlify.app/api/auth/google/callback` |

### 4.3 Trigger Redeploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete

---

## Step 5: Update Web App API URL (2 minutes)

### 5.1 Edit Production Environment File

Open `packages/web/.env.production` and update:

```env
VITE_API_URL=https://YOUR_ACTUAL_SITE_NAME.netlify.app/api
```

Replace `YOUR_ACTUAL_SITE_NAME` with your real Netlify site name.

### 5.2 Commit and Push

```bash
git add packages/web/.env.production
git commit -m "Update production API URL"
git push
```

Netlify will automatically redeploy (takes 2-3 minutes).

---

## Step 6: Test Your Deployment (3 minutes)

### 6.1 Open Your Site

Visit: `https://your-site-name.netlify.app`

### 6.2 Test Login

**Regular User:**
- Email: `user@example.com`
- Password: `user123`

**Moderator:**
- Email: `moderator@example.com`
- Password: `admin123`

### 6.3 Test Features

- [ ] Browse products (should see 40 products)
- [ ] View product details
- [ ] Submit a review (as user)
- [ ] Approve review (as moderator)
- [ ] Search/filter products

### 6.4 Test API

Open browser console and run:

```javascript
// Test API health
fetch('https://your-site-name.netlify.app/api/health')
  .then(r => r.json())
  .then(console.log);

// Test products endpoint
fetch('https://your-site-name.netlify.app/api/products')
  .then(r => r.json())
  .then(console.log);
```

---

## ✅ Success Checklist

Your deployment is successful if:

- [ ] Site loads without errors
- [ ] Can login with test credentials
- [ ] Products display correctly
- [ ] Can submit and moderate reviews
- [ ] API endpoints respond
- [ ] No console errors
- [ ] HTTPS is enabled (automatic)

---

## 🎨 Optional: Customize Site Name

1. Go to **Site settings**
2. Click **"Change site name"**
3. Enter your preferred name (e.g., `my-feedback-app`)
4. Your new URL: `https://my-feedback-app.netlify.app`

---

## 📱 Update Mobile App (Optional)

If you want to use the mobile app with production API:

### Update API URL

Edit `packages/mobile/src/services/api.ts`:

```typescript
const API_URL = __DEV__ 
  ? 'http://localhost:8888/api'
  : 'https://your-site-name.netlify.app/api';
```

### Rebuild APK

```bash
cd packages/mobile
npm run build:apk
```

---

## 🔧 Troubleshooting

### Build Fails

**Check build logs:**
1. Go to **Deploys** tab
2. Click failed deployment
3. Read error message

**Common fixes:**
- Ensure Node version is 18+
- Check all dependencies are in `package.json`
- Verify build works locally: `npm run build`

### API Returns 500 Errors

**Check function logs:**
1. Go to **Functions** tab
2. Click on `api` function
3. View logs

**Common fixes:**
- Verify environment variables are set
- Check JWT secrets are configured
- Ensure DATABASE_PATH is correct

### Site Loads But No Data

**Possible causes:**
- API URL not updated in web app
- CORS issues
- Database not initialized

**Fix:**
1. Check browser console for errors
2. Verify API URL in `.env.production`
3. Check Network tab for failed requests

### Database Resets

⚠️ **This is expected on Netlify!**

Netlify Functions have read-only filesystems. SQLite database resets on:
- Cold starts (after inactivity)
- New deployments
- Function restarts

**For persistent data:**
- Use external database (PostgreSQL)
- Deploy backend separately (Render, Railway)
- Use Netlify Blob Storage

---

## 📊 Monitor Your Site

### Netlify Analytics

1. Go to **Analytics** tab
2. View:
   - Page views
   - Bandwidth usage
   - Function invocations
   - Top pages

### Function Logs

1. Go to **Functions** tab
2. Click on function
3. View real-time logs

### Set Up Alerts

1. Go to **Site settings** → **Notifications**
2. Add email for:
   - Deploy failed
   - Deploy succeeded
   - Form submissions

---

## 🚀 Next Steps

### Share Your App

Your app is live at: `https://your-site-name.netlify.app`

**Test credentials:**
- User: user@example.com / user123
- Moderator: moderator@example.com / admin123

### Continuous Deployment

Already enabled! Every push to `main` triggers deployment.

### Custom Domain (Optional)

1. Purchase domain (Namecheap, Google Domains, etc.)
2. In Netlify: **Domain settings** → **Add custom domain**
3. Configure DNS records
4. HTTPS is automatic!

### Improve Performance

- Enable caching headers
- Optimize images
- Use lazy loading
- Monitor Core Web Vitals

---

## 📚 Resources

- **Your Site:** `https://your-site-name.netlify.app`
- **Netlify Dashboard:** `https://app.netlify.com/sites/your-site-name`
- **Netlify Docs:** https://docs.netlify.com/
- **Support:** https://answers.netlify.com/

---

## 🎉 Congratulations!

Your Product Feedback System is now live on the internet!

**What you've accomplished:**
✅ Deployed full-stack application
✅ Backend API running on Netlify Functions
✅ Frontend hosted on Netlify CDN
✅ HTTPS enabled automatically
✅ Continuous deployment configured
✅ Environment variables secured

**Share your success:**
- Tweet your deployment
- Share with friends
- Add to your portfolio
- Get user feedback

---

**Need help?** Check:
- NETLIFY_DEPLOYMENT.md (detailed guide)
- DEPLOYMENT_CHECKLIST.md (comprehensive checklist)
- DEPLOYMENT_GUIDE.md (full deployment options)

**Happy deploying! 🚀**
