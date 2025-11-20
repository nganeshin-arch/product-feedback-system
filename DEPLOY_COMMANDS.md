# 🎯 Netlify Deployment Commands

Copy and paste these commands to deploy your Product Feedback System to Netlify.

---

## 📦 Prerequisites

Make sure you have:
- Node.js 18+ installed
- Git installed
- GitHub account
- Netlify account

---

## 🚀 Deployment Commands

### Step 1: Push to GitHub

```bash
# Initialize Git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Product Feedback System"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 2: Generate Secrets

```bash
# Generate JWT secret
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Generate refresh secret
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

**Copy these values!** You'll need them for Netlify environment variables.

---

### Step 3: Deploy on Netlify

**Via Web Interface:**

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select your repository
5. Click "Deploy site"

**Or via CLI:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

---

### Step 4: Set Environment Variables

**Via Netlify Dashboard:**

1. Go to Site settings → Environment variables
2. Add these variables:

```
JWT_SECRET=<paste-generated-value>
JWT_REFRESH_SECRET=<paste-generated-value>
NODE_ENV=production
DATABASE_PATH=./database/feedback.db
```

**Or via CLI:**

```bash
# Set JWT secret (replace with your generated value)
netlify env:set JWT_SECRET "your-generated-jwt-secret-here"

# Set refresh secret (replace with your generated value)
netlify env:set JWT_REFRESH_SECRET "your-generated-refresh-secret-here"

# Set environment
netlify env:set NODE_ENV "production"

# Set database path
netlify env:set DATABASE_PATH "./database/feedback.db"
```

---

### Step 5: Update API URL

```bash
# Get your Netlify site URL
netlify status

# Edit the production environment file
# Replace YOUR_SITE_NAME with your actual Netlify site name
echo "VITE_API_URL=https://YOUR_SITE_NAME.netlify.app/api" > packages/web/.env.production

# Commit and push
git add packages/web/.env.production
git commit -m "Update production API URL"
git push
```

---

### Step 6: Verify Deployment

```bash
# Open your site
netlify open:site

# View logs
netlify logs

# Check functions
netlify functions:list
```

---

## 🧪 Test Commands

### Test API Endpoints

```bash
# Replace YOUR_SITE_NAME with your actual site name
SITE_URL="https://YOUR_SITE_NAME.netlify.app"

# Test health endpoint
curl $SITE_URL/api/health

# Test products endpoint
curl $SITE_URL/api/products

# Test login
curl -X POST $SITE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"user123"}'
```

---

## 🔧 Maintenance Commands

### View Site Status

```bash
# Check site status
netlify status

# View recent deploys
netlify deploy:list

# View site info
netlify sites:list
```

### View Logs

```bash
# View function logs
netlify logs

# View build logs
netlify logs:build

# Stream live logs
netlify logs --live
```

### Redeploy

```bash
# Trigger new deployment
netlify deploy --prod

# Or just push to GitHub
git push
```

### Rollback

```bash
# List previous deploys
netlify deploy:list

# Rollback to previous
netlify rollback
```

---

## 🎨 Optional: Customize Site Name

```bash
# Change site name
netlify sites:update --name my-feedback-app

# Your new URL will be:
# https://my-feedback-app.netlify.app
```

---

## 📱 Update Mobile App

```bash
# After deployment, update mobile app API URL
# Edit packages/mobile/src/services/api.ts
# Change the production URL to your Netlify URL

# Then rebuild mobile app
cd packages/mobile
npm run build:apk
```

---

## 🔍 Debug Commands

### Test Build Locally

```bash
# Test full build
npm install
npm run build --workspace=shared
npm run build --workspace=backend
npm run build --workspace=web

# Check build output
ls -la packages/web/dist
ls -la packages/backend/dist
```

### Test Functions Locally

```bash
# Start Netlify dev server
netlify dev

# Your site will be at:
# http://localhost:8888
```

### Check Environment Variables

```bash
# List all environment variables
netlify env:list

# Get specific variable
netlify env:get JWT_SECRET
```

---

## 🆘 Troubleshooting Commands

### Build Fails

```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Function Errors

```bash
# View function logs
netlify logs --function api

# Test function locally
netlify functions:invoke api
```

### Environment Issues

```bash
# Verify environment variables
netlify env:list

# Re-set if needed
netlify env:set JWT_SECRET "new-value"
```

---

## 📊 Monitoring Commands

### Check Usage

```bash
# View bandwidth usage
netlify api getBandwidthUsage

# View build minutes
netlify api getAccountBuildStatus
```

### Analytics

```bash
# View site analytics (requires Pro plan)
netlify analytics
```

---

## 🔐 Security Commands

### Generate New Secrets

```bash
# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate new refresh secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Update in Netlify
netlify env:set JWT_SECRET "new-secret"
netlify env:set JWT_REFRESH_SECRET "new-refresh-secret"
```

---

## 📦 Backup Commands

### Backup Configuration

```bash
# Export environment variables
netlify env:list > env-backup.txt

# Backup site configuration
netlify api getSite > site-config.json
```

### Backup Database (if using external DB)

```bash
# For SQLite (local only)
cp packages/backend/database/feedback.db backups/feedback-$(date +%Y%m%d).db
```

---

## 🎉 Quick Reference

### Most Used Commands

```bash
# Deploy
git push                    # Auto-deploy via GitHub
netlify deploy --prod       # Manual deploy

# Monitor
netlify status              # Site status
netlify logs                # View logs
netlify open:site           # Open in browser

# Manage
netlify env:list            # List env vars
netlify env:set KEY "value" # Set env var
netlify rollback            # Rollback deploy

# Debug
netlify dev                 # Test locally
netlify logs --live         # Live logs
```

---

## 📚 Help Commands

```bash
# General help
netlify help

# Command-specific help
netlify deploy --help
netlify env --help
netlify functions --help

# Version
netlify --version
```

---

## ✅ Deployment Checklist

Run these commands in order:

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Generate secrets
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# 3. Deploy (via web or CLI)
netlify deploy --prod

# 4. Set environment variables (via web or CLI)
netlify env:set JWT_SECRET "your-secret"
netlify env:set JWT_REFRESH_SECRET "your-refresh-secret"
netlify env:set NODE_ENV "production"
netlify env:set DATABASE_PATH "./database/feedback.db"

# 5. Update API URL and redeploy
echo "VITE_API_URL=https://YOUR_SITE.netlify.app/api" > packages/web/.env.production
git add packages/web/.env.production
git commit -m "Update API URL"
git push

# 6. Verify
netlify open:site
```

---

**All commands ready! Start deploying! 🚀**

For detailed explanations, see:
- `QUICK_DEPLOY.md` - Quick start guide
- `deploy-to-netlify.md` - Step-by-step guide
- `NETLIFY_DEPLOYMENT.md` - Comprehensive guide
