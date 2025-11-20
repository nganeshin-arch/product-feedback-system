# 🚀 Netlify Deployment Guide - Product Feedback System

This guide will walk you through deploying your Product Feedback System to Netlify in under 15 minutes.

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Netlify account (free tier works fine)
- [ ] Your code pushed to a GitHub repository

## 🎯 Quick Deployment Steps

### Step 1: Prepare Your Repository

1. **Push to GitHub** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Product Feedback System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select your repository

### Step 3: Configure Build Settings

Netlify should auto-detect settings from `netlify.toml`, but verify:

**Build Settings:**
- **Base directory:** (leave empty)
- **Build command:** `npm install && npm run build --workspace=shared && npm run build --workspace=backend && npm run build --workspace=web`
- **Publish directory:** `packages/web/dist`
- **Functions directory:** `packages/backend/dist/netlify/functions`

### Step 4: Set Environment Variables

In Netlify Dashboard → **Site settings** → **Environment variables**, add:

#### Required Variables:

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production-min-32-chars
NODE_ENV=production
DATABASE_PATH=./database/feedback.db
```

#### Optional (for Google OAuth):

```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://YOUR_SITE.netlify.app/api/auth/google/callback
```

**⚠️ Important:** Replace `YOUR_SITE` with your actual Netlify site name.

### Step 5: Deploy!

Click **"Deploy site"**

Netlify will:
1. Clone your repository
2. Install dependencies
3. Build the web app
4. Build the backend functions
5. Deploy everything

This takes 3-5 minutes.

### Step 6: Update API URL in Web App

After deployment, you'll get a URL like: `https://your-site-name.netlify.app`

1. **Create environment file** for web app:

Create `packages/web/.env.production`:
```env
VITE_API_URL=https://your-site-name.netlify.app/api
```

2. **Commit and push:**
```bash
git add packages/web/.env.production
git commit -m "Add production API URL"
git push
```

Netlify will automatically redeploy.

---

## 🧪 Testing Your Deployment

### 1. Test the Web Application

Visit: `https://your-site-name.netlify.app`

**Test Login:**
- Email: `user@example.com`
- Password: `user123`

**Test Moderator:**
- Email: `moderator@example.com`
- Password: `admin123`

### 2. Test API Endpoints

```bash
# Health check
curl https://your-site-name.netlify.app/api/health

# Get products
curl https://your-site-name.netlify.app/api/products

# Test login
curl -X POST https://your-site-name.netlify.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"user123"}'
```

### 3. Test Features

- [ ] Browse products
- [ ] View product details
- [ ] Submit a review (as user)
- [ ] Approve/reject reviews (as moderator)
- [ ] Search and filter products
- [ ] View user profile

---

## ⚙️ Advanced Configuration

### Custom Domain

1. Go to **Domain settings** in Netlify
2. Click **"Add custom domain"**
3. Follow DNS configuration instructions
4. HTTPS is automatic!

### Continuous Deployment

Already enabled! Every push to `main` branch triggers a new deployment.

**To disable:**
1. Go to **Site settings** → **Build & deploy**
2. Click **"Stop auto publishing"**

### Deploy Previews

Netlify automatically creates preview deployments for pull requests.

**To test a branch:**
```bash
git checkout -b feature/new-feature
# Make changes
git push origin feature/new-feature
```

Create a PR on GitHub, and Netlify will deploy a preview.

---

## 🔒 Security Checklist

After deployment:

- [ ] Change default JWT secrets (use strong random strings)
- [ ] Verify HTTPS is enabled (automatic on Netlify)
- [ ] Check CORS settings in backend
- [ ] Review environment variables
- [ ] Test authentication flows
- [ ] Verify API rate limiting (if implemented)

### Generate Strong Secrets

```bash
# Generate JWT secret (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use online generator
# https://www.grc.com/passwords.htm
```

Update in Netlify environment variables.

---

## 📊 Monitoring & Logs

### View Logs

1. Go to **Deploys** tab
2. Click on a deployment
3. View **Deploy log** or **Function log**

### Function Logs

1. Go to **Functions** tab
2. Click on a function
3. View real-time logs

### Analytics

Netlify provides basic analytics:
- Page views
- Bandwidth usage
- Function invocations

For advanced analytics, integrate:
- Google Analytics
- Plausible
- Fathom

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `Command failed with exit code 1`

**Solutions:**
1. Check build logs for specific error
2. Verify Node version (should be 18+)
3. Test build locally: `npm run build`
4. Check all dependencies are in `package.json`

### Functions Not Working

**Error:** `Function not found` or `500 error`

**Solutions:**
1. Verify functions directory in `netlify.toml`
2. Check function logs in Netlify dashboard
3. Ensure environment variables are set
4. Test locally: `netlify dev`

### Database Issues

**Error:** `SQLITE_CANTOPEN` or database not found

**Solutions:**

⚠️ **Important:** Netlify Functions have a read-only filesystem. SQLite databases won't persist between deployments.

**For Demo/Testing:**
- Database is initialized on each cold start
- Data resets periodically
- Good for testing, not production

**For Production:**
- Use external database (PostgreSQL, MySQL)
- Deploy backend separately (Render, Railway, Heroku)
- Use Netlify Blob Storage

### API CORS Errors

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solutions:**
1. Check CORS configuration in `packages/backend/src/app.ts`
2. Verify `CORS_ORIGIN` environment variable
3. Ensure API URL matches in web app

### Environment Variables Not Working

**Solutions:**
1. Verify variables are set in Netlify dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)
4. Don't use quotes around values in Netlify UI

---

## 🔄 Updating Your Deployment

### Deploy New Changes

```bash
# Make changes
git add .
git commit -m "Update feature X"
git push origin main
```

Netlify automatically deploys within 2-3 minutes.

### Rollback to Previous Version

1. Go to **Deploys** tab
2. Find previous successful deployment
3. Click **"Publish deploy"**

Or use CLI:
```bash
netlify rollback
```

### Manual Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## 📱 Mobile App Configuration

After deploying to Netlify, update mobile app API URL:

**Edit:** `packages/mobile/src/services/api.ts`

```typescript
const API_URL = __DEV__ 
  ? 'http://localhost:8888/api'
  : 'https://your-site-name.netlify.app/api';
```

Then rebuild the mobile app:
```bash
cd packages/mobile
npm run build:apk
```

---

## 💰 Pricing & Limits

### Netlify Free Tier Includes:

- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ 125k function invocations/month
- ✅ Unlimited sites
- ✅ HTTPS included
- ✅ Deploy previews
- ✅ Form submissions (100/month)

**This is plenty for:**
- Personal projects
- Demos
- Small applications
- Testing

### When to Upgrade:

- High traffic (>100GB/month)
- Many API calls (>125k/month)
- Need team collaboration
- Want custom domains on multiple sites

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Site is live at Netlify URL
- [ ] Can access homepage
- [ ] Can login with test credentials
- [ ] Can browse products
- [ ] Can submit reviews
- [ ] Moderator features work
- [ ] API endpoints respond
- [ ] HTTPS is enabled
- [ ] No console errors
- [ ] Mobile app connects to API

---

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
- [Netlify CLI Reference](https://cli.netlify.com/)
- [Netlify Community Forum](https://answers.netlify.com/)

---

## 🆘 Getting Help

**If you encounter issues:**

1. Check this troubleshooting guide
2. Review Netlify build/function logs
3. Test locally with `netlify dev`
4. Check [Netlify Status](https://www.netlifystatus.com/)
5. Visit [Netlify Community](https://answers.netlify.com/)

---

## 🎊 Congratulations!

Your Product Feedback System is now live on Netlify!

**Share your deployment:**
- URL: `https://your-site-name.netlify.app`
- Test credentials provided above
- Mobile APK available in releases

**Next Steps:**
1. Share with users
2. Gather feedback
3. Monitor usage
4. Plan new features

---

**Deployed with ❤️ using Netlify**
