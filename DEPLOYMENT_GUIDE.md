# Complete Deployment Guide

This comprehensive guide covers deploying the Product Feedback System to production, including web application, backend API, and mobile app distribution.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Web Application Deployment](#web-application-deployment)
6. [Mobile App Distribution](#mobile-app-distribution)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- [ ] GitHub account (for repository hosting)
- [ ] Netlify account (for web + API hosting)
- [ ] Google Cloud Platform account (for OAuth, optional)

### Required Software
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Netlify CLI: `npm install -g netlify-cli`
- [ ] Android Studio (for mobile app builds)

### Repository Setup
1. Create a public GitHub repository
2. Push your code to the repository
3. Ensure all sensitive files are in `.gitignore`

---

## Environment Variables

### Backend Environment Variables

Create `.env` file in `packages/backend/`:

```env
# Database
DATABASE_PATH=./database/feedback.db

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-domain.netlify.app/api/auth/google/callback

# CORS
CORS_ORIGIN=https://your-domain.netlify.app

# Environment
NODE_ENV=production
```

### Web Application Environment Variables

Create `.env` file in `packages/web/`:

```env
VITE_API_URL=https://your-domain.netlify.app/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Mobile Application Environment Variables

Update `packages/mobile/src/services/api.ts`:

```typescript
const API_URL = __DEV__ 
  ? 'http://localhost:8888/api'
  : 'https://your-domain.netlify.app/api';
```

---

## Database Setup

### 1. Initialize Database

```bash
cd packages/backend
npm run db:init
```

This will:
- Create SQLite database
- Run schema migrations
- Seed with 30 sample products
- Create default moderator account

### 2. Verify Database

```bash
# Check database file exists
ls -la packages/backend/database/feedback.db

# Optional: Inspect with SQLite
sqlite3 packages/backend/database/feedback.db
.tables
.schema users
.quit
```

### 3. Database Backup Strategy

**For Production:**

Since Netlify Functions have read-only file systems, consider:

**Option A: Use Netlify Blob Storage**
```bash
npm install @netlify/blobs
```

**Option B: Deploy Backend Separately**
- Deploy to Render, Railway, or Heroku
- Use PostgreSQL instead of SQLite
- Update connection strings

**Option C: Read-Only Mode**
- Keep SQLite for reads
- Use external service for writes
- Implement sync mechanism

---

## Backend Deployment

### Option 1: Netlify Functions (Recommended for Demo)

#### Step 1: Configure Netlify

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "packages/web/dist"
  functions = "packages/backend/netlify/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
  external_node_modules = ["better-sqlite3"]
```

#### Step 2: Install Netlify CLI

```bash
npm install -g netlify-cli
netlify login
```

#### Step 3: Link Repository

```bash
netlify init
# Follow prompts to link your GitHub repository
```

#### Step 4: Configure Environment Variables

```bash
# Set environment variables in Netlify
netlify env:set JWT_SECRET "your-secret-key"
netlify env:set JWT_REFRESH_SECRET "your-refresh-secret"
netlify env:set GOOGLE_CLIENT_ID "your-client-id"
netlify env:set GOOGLE_CLIENT_SECRET "your-client-secret"
netlify env:set DATABASE_PATH "./database/feedback.db"
netlify env:set NODE_ENV "production"
```

Or via Netlify Dashboard:
1. Go to Site Settings > Environment Variables
2. Add each variable
3. Save changes

#### Step 5: Deploy

```bash
# Deploy to production
netlify deploy --prod

# Or push to main branch for automatic deployment
git push origin main
```

### Option 2: Separate Backend Deployment (Recommended for Production)

#### Deploy to Render.com

1. **Create New Web Service**
   - Connect GitHub repository
   - Select `packages/backend` as root directory
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

2. **Add Environment Variables**
   - Add all backend environment variables
   - Set `DATABASE_URL` for PostgreSQL

3. **Database Migration**
   - Provision PostgreSQL database
   - Update connection code
   - Run migrations

#### Deploy to Railway.app

1. **Create New Project**
   - Import from GitHub
   - Select backend service

2. **Configure**
   - Add environment variables
   - Provision PostgreSQL
   - Deploy

---

## Web Application Deployment

### Step 1: Build Web App

```bash
cd packages/web
npm run build
```

Verify build output in `packages/web/dist/`

### Step 2: Configure Build Settings

In Netlify Dashboard:
- **Build command:** `npm run build`
- **Publish directory:** `packages/web/dist`
- **Node version:** 18

### Step 3: Deploy

```bash
# Manual deploy
cd packages/web
netlify deploy --prod --dir=dist

# Or automatic via Git
git push origin main
```

### Step 4: Custom Domain (Optional)

1. Go to Netlify Dashboard > Domain Settings
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS (automatic)

---

## Mobile App Distribution

### Step 1: Update API URL

Edit `packages/mobile/src/services/api.ts`:

```typescript
const API_URL = 'https://your-domain.netlify.app/api';
```

### Step 2: Build Release APK

```bash
cd packages/mobile
npm run build:apk
```

Or manually:

```bash
cd packages/mobile/android
./gradlew assembleRelease
```

APK location: `packages/mobile/android/app/build/outputs/apk/release/app-release.apk`

### Step 3: Sign APK (Required for Distribution)

#### Generate Keystore

```bash
cd packages/mobile/android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### Configure Signing

Edit `packages/mobile/android/gradle.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

#### Build Signed APK

```bash
cd packages/mobile/android
./gradlew assembleRelease
```

### Step 4: Test APK

```bash
# Install on connected device
adb install packages/mobile/android/app/build/outputs/apk/release/app-release.apk

# Or transfer to device and install manually
```

### Step 5: Distribute

#### Option A: GitHub Releases

1. Go to GitHub repository
2. Click "Releases" > "Create a new release"
3. Tag version (e.g., `v1.0.0`)
4. Upload APK file
5. Write release notes
6. Publish release

Users can download from:
`https://github.com/your-username/your-repo/releases`

#### Option B: Direct Download

1. Upload APK to your website or cloud storage
2. Share download link
3. Provide installation instructions

#### Option C: Google Play Store

1. Create Google Play Developer account ($25 one-time fee)
2. Build AAB instead of APK:
   ```bash
   cd packages/mobile/android
   ./gradlew bundleRelease
   ```
3. Create app listing
4. Upload AAB
5. Submit for review

---

## Post-Deployment

### 1. Verify Deployment

#### Web Application
- [ ] Visit your Netlify URL
- [ ] Test login/signup
- [ ] Browse products
- [ ] Submit a review
- [ ] Test moderation (as moderator)

#### API Endpoints
```bash
# Health check
curl https://your-domain.netlify.app/api/health

# Get products
curl https://your-domain.netlify.app/api/products

# Test authentication
curl -X POST https://your-domain.netlify.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"user123"}'
```

#### Mobile App
- [ ] Install APK on Android device
- [ ] Test all features
- [ ] Verify API connectivity
- [ ] Test offline mode

### 2. Monitor Deployment

#### Netlify Dashboard
- Check build logs
- Monitor function invocations
- Review error logs
- Check bandwidth usage

#### Set Up Monitoring

```bash
# Install monitoring tools
npm install @sentry/node @sentry/react
```

Configure Sentry or similar service for error tracking.

### 3. Performance Optimization

#### Enable Caching

Add to `netlify.toml`:

```toml
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/api/*"
  [headers.values]
    Cache-Control = "no-cache"
```

#### Optimize Images

```bash
# Install image optimization
npm install sharp
```

#### Enable Compression

Netlify automatically enables Gzip/Brotli compression.

### 4. Security Checklist

- [ ] HTTPS enabled (automatic on Netlify)
- [ ] Environment variables secured
- [ ] JWT secrets are strong and unique
- [ ] CORS configured correctly
- [ ] Rate limiting implemented (optional)
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] Keystore backed up securely

### 5. Backup Strategy

#### Database Backup

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp packages/backend/database/feedback.db backups/feedback_$DATE.db
```

#### Code Backup

- Repository is on GitHub (automatic backup)
- Tag releases: `git tag v1.0.0 && git push --tags`

---

## Troubleshooting

### Build Failures

**Issue:** Build fails on Netlify

**Solutions:**
1. Check Node version matches (18+)
2. Verify all dependencies in `package.json`
3. Check build logs for specific errors
4. Test build locally: `npm run build`

### Database Issues

**Issue:** Database not found or read-only

**Solutions:**
1. Verify `DATABASE_PATH` environment variable
2. Check database file is committed (if using SQLite)
3. Consider migrating to PostgreSQL for production
4. Use Netlify Blob Storage for persistence

### API Errors

**Issue:** 500 errors from API

**Solutions:**
1. Check Netlify Function logs
2. Verify environment variables are set
3. Test API locally: `netlify dev`
4. Check CORS configuration

### Mobile App Issues

**Issue:** App can't connect to API

**Solutions:**
1. Verify API URL in `api.ts`
2. Check HTTPS is used (not HTTP)
3. Test API endpoint in browser
4. Check network permissions in AndroidManifest.xml

### OAuth Issues

**Issue:** Google OAuth not working

**Solutions:**
1. Verify redirect URI in Google Console
2. Check client ID and secret
3. Ensure callback URL matches exactly
4. Test OAuth flow in incognito mode

### Performance Issues

**Issue:** Slow page loads

**Solutions:**
1. Enable caching headers
2. Optimize images
3. Use code splitting
4. Enable CDN (automatic on Netlify)
5. Minimize bundle size

---

## Rollback Procedure

### Web Application

```bash
# Rollback to previous deployment
netlify rollback
```

Or via Dashboard:
1. Go to Deploys
2. Find previous successful deploy
3. Click "Publish deploy"

### Mobile App

1. Remove current release from distribution
2. Re-upload previous APK version
3. Notify users to download previous version

---

## Maintenance

### Regular Tasks

**Weekly:**
- [ ] Check error logs
- [ ] Review moderation queue
- [ ] Monitor API usage

**Monthly:**
- [ ] Update dependencies
- [ ] Review security advisories
- [ ] Backup database
- [ ] Check disk usage

**Quarterly:**
- [ ] Performance audit
- [ ] Security audit
- [ ] User feedback review
- [ ] Feature planning

---

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [React Native Deployment](https://reactnative.dev/docs/signed-apk-android)
- [Google Play Console](https://play.google.com/console)

---

## Support

For deployment issues:
1. Check this guide first
2. Review Netlify documentation
3. Check GitHub Issues
4. Contact support

---

**Deployment Checklist:**

- [ ] Environment variables configured
- [ ] Database initialized
- [ ] Backend deployed and tested
- [ ] Web app deployed and tested
- [ ] Mobile APK built and signed
- [ ] All features tested in production
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Users notified

**Congratulations! Your Product Feedback System is now deployed! 🎉**
