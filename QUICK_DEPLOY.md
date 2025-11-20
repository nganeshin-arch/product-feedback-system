# ⚡ Quick Deploy to Netlify

## 🎯 5-Minute Deploy

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy on Netlify
1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import from Git"**
3. Select your repository
4. Click **"Deploy site"**

### 3. Add Environment Variables
In Netlify Dashboard → **Site settings** → **Environment variables**:

```
JWT_SECRET=<generate-random-32-char-string>
JWT_REFRESH_SECRET=<generate-different-random-32-char-string>
NODE_ENV=production
DATABASE_PATH=./database/feedback.db
```

Generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Update API URL
Edit `packages/web/.env.production`:
```env
VITE_API_URL=https://your-site-name.netlify.app/api
```

Commit and push:
```bash
git add packages/web/.env.production
git commit -m "Update API URL"
git push
```

### 5. Test
Visit: `https://your-site-name.netlify.app`

Login:
- User: `user@example.com` / `user123`
- Moderator: `moderator@example.com` / `admin123`

---

## 📋 Build Settings (Auto-detected from netlify.toml)

- **Build command:** `npm install && npm run build --workspace=shared && npm run build --workspace=backend && npm run build --workspace=web`
- **Publish directory:** `packages/web/dist`
- **Functions directory:** `packages/backend/dist/netlify/functions`

---

## 🔧 Troubleshooting

**Build fails?**
- Check Node version is 18+
- Verify build works locally: `npm run build`

**API errors?**
- Check environment variables are set
- Verify API URL in `.env.production`

**Database resets?**
- Expected on Netlify (read-only filesystem)
- Use external DB for production

---

## 📚 Full Guides

- **Step-by-step:** `deploy-to-netlify.md`
- **Detailed:** `NETLIFY_DEPLOYMENT.md`
- **Checklist:** `DEPLOYMENT_CHECKLIST.md`
- **All options:** `DEPLOYMENT_GUIDE.md`

---

**Done! Your app is live! 🎉**
