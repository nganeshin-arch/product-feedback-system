# 📋 Netlify Deployment Checklist

Use this checklist to ensure a smooth deployment to Netlify.

## Pre-Deployment

### Code Preparation
- [ ] All code committed to Git
- [ ] No sensitive data in code (passwords, API keys, etc.)
- [ ] `.gitignore` includes `node_modules`, `.env`, `dist`, `build`
- [ ] All tests passing locally
- [ ] Build works locally: `npm run build`

### Repository Setup
- [ ] Code pushed to GitHub
- [ ] Repository is public or Netlify has access
- [ ] Main branch is up to date
- [ ] No merge conflicts

### Configuration Files
- [ ] `netlify.toml` exists in root
- [ ] `package.json` has correct build scripts
- [ ] `packages/web/.env.production` created
- [ ] All workspace packages have `package.json`

## Netlify Setup

### Account & Site
- [ ] Netlify account created
- [ ] GitHub connected to Netlify
- [ ] New site created from repository
- [ ] Site name chosen (or using auto-generated)

### Build Configuration
- [ ] Build command: `npm install && npm run build --workspace=shared && npm run build --workspace=backend && npm run build --workspace=web`
- [ ] Publish directory: `packages/web/dist`
- [ ] Functions directory: `packages/backend/dist/netlify/functions`
- [ ] Node version: 18

### Environment Variables

#### Required (Set in Netlify Dashboard)
- [ ] `JWT_SECRET` - Strong random string (32+ chars)
- [ ] `JWT_REFRESH_SECRET` - Different strong random string (32+ chars)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `DATABASE_PATH` - Set to `./database/feedback.db`

#### Optional (for Google OAuth)
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `GOOGLE_CALLBACK_URL` - `https://YOUR_SITE.netlify.app/api/auth/google/callback`

## Deployment

### Initial Deploy
- [ ] Click "Deploy site" in Netlify
- [ ] Wait for build to complete (3-5 minutes)
- [ ] Check build logs for errors
- [ ] Note your site URL

### Post-Deploy Configuration
- [ ] Update `packages/web/.env.production` with actual Netlify URL
- [ ] Commit and push changes
- [ ] Wait for automatic redeploy
- [ ] Verify new deployment

## Testing

### Web Application
- [ ] Site loads at Netlify URL
- [ ] No console errors in browser
- [ ] Homepage displays correctly
- [ ] Can navigate between pages
- [ ] Images and assets load

### Authentication
- [ ] Can access login page
- [ ] Can login with test user: `user@example.com` / `user123`
- [ ] Can login with moderator: `moderator@example.com` / `admin123`
- [ ] JWT tokens are issued
- [ ] Can logout successfully
- [ ] Protected routes work

### Core Features
- [ ] Products list displays (40 products)
- [ ] Can view product details
- [ ] Can filter/search products
- [ ] Can submit a review (as user)
- [ ] Reviews appear in moderation queue
- [ ] Can approve/reject reviews (as moderator)
- [ ] Product ratings update correctly

### API Endpoints
- [ ] `/api/health` returns 200
- [ ] `/api/products` returns product list
- [ ] `/api/auth/login` accepts credentials
- [ ] `/api/reviews` CRUD operations work
- [ ] `/api/moderation` endpoints work (moderator only)

### Mobile App Integration
- [ ] Update API URL in `packages/mobile/src/services/api.ts`
- [ ] Rebuild mobile app
- [ ] Test mobile app connects to production API
- [ ] All mobile features work with production backend

## Security

### Secrets & Keys
- [ ] JWT secrets are strong and unique
- [ ] No secrets in code or Git history
- [ ] Environment variables properly set
- [ ] `.env` files in `.gitignore`

### HTTPS & CORS
- [ ] HTTPS enabled (automatic on Netlify)
- [ ] CORS configured correctly
- [ ] API accepts requests from web app domain
- [ ] No mixed content warnings

### Access Control
- [ ] Authentication required for protected routes
- [ ] Moderator-only routes properly protected
- [ ] User can only edit own reviews
- [ ] SQL injection prevention verified

## Performance

### Optimization
- [ ] Build size is reasonable (<5MB)
- [ ] Images optimized
- [ ] Code splitting enabled
- [ ] Lazy loading implemented where appropriate

### Caching
- [ ] Static assets cached
- [ ] API responses have appropriate cache headers
- [ ] CDN enabled (automatic on Netlify)

### Monitoring
- [ ] Check Netlify Analytics
- [ ] Review function invocation counts
- [ ] Monitor bandwidth usage
- [ ] Set up error tracking (optional: Sentry)

## Documentation

### Update Docs
- [ ] README.md includes deployment URL
- [ ] DEPLOYMENT_GUIDE.md reviewed
- [ ] API documentation updated
- [ ] User guide includes production URL

### Credentials
- [ ] Document test user credentials
- [ ] Document moderator credentials
- [ ] Share with team/users

## Maintenance

### Backup
- [ ] Database backup strategy in place
- [ ] Code backed up on GitHub
- [ ] Environment variables documented securely

### Monitoring Plan
- [ ] Weekly: Check error logs
- [ ] Weekly: Review moderation queue
- [ ] Monthly: Update dependencies
- [ ] Monthly: Security audit

### Rollback Plan
- [ ] Know how to rollback in Netlify
- [ ] Previous deployments accessible
- [ ] Can redeploy from specific commit

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured
- [ ] Custom domain added in Netlify
- [ ] HTTPS certificate issued

### CI/CD
- [ ] GitHub Actions configured (optional)
- [ ] Automated tests run on PR
- [ ] Deploy previews enabled
- [ ] Branch deploys configured

### Analytics
- [ ] Google Analytics added (optional)
- [ ] User tracking configured
- [ ] Conversion goals set

### SEO
- [ ] Meta tags added
- [ ] Open Graph tags configured
- [ ] Sitemap generated
- [ ] robots.txt configured

## Final Verification

### Functionality
- [ ] All features work in production
- [ ] No broken links
- [ ] Forms submit correctly
- [ ] Error handling works
- [ ] Loading states display

### User Experience
- [ ] Site is responsive on mobile
- [ ] Site is responsive on tablet
- [ ] Site is responsive on desktop
- [ ] Accessibility tested
- [ ] Performance is acceptable

### Communication
- [ ] Deployment URL shared with stakeholders
- [ ] User documentation provided
- [ ] Support contact information available
- [ ] Feedback mechanism in place

## Success Criteria

✅ **Deployment is successful when:**

1. Site is accessible at Netlify URL
2. All core features work correctly
3. Authentication flows complete
4. API endpoints respond properly
5. No critical errors in logs
6. Mobile app connects successfully
7. Security measures in place
8. Documentation updated
9. Team/users notified
10. Monitoring active

---

## Quick Reference

### Netlify Dashboard URLs
- **Site Overview:** `https://app.netlify.com/sites/YOUR_SITE`
- **Deploys:** `https://app.netlify.com/sites/YOUR_SITE/deploys`
- **Functions:** `https://app.netlify.com/sites/YOUR_SITE/functions`
- **Environment:** `https://app.netlify.com/sites/YOUR_SITE/settings/env`

### Test Credentials
- **User:** user@example.com / user123
- **Moderator:** moderator@example.com / admin123

### Important Commands
```bash
# Deploy manually
netlify deploy --prod

# View logs
netlify logs

# Rollback
netlify rollback

# Test locally
netlify dev
```

---

**Date Deployed:** _______________

**Deployed By:** _______________

**Site URL:** _______________

**Notes:** _______________

---

✨ **Congratulations on your deployment!** ✨
