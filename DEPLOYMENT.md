# Deployment Guide

## Netlify Deployment

### Prerequisites
- GitHub account
- Netlify account
- Google Cloud Console account (for OAuth)

### Step 1: Prepare the Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Set Up Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:8888/api/auth/google/callback` (development)
   - `https://your-site.netlify.app/api/auth/google/callback` (production)
7. Copy Client ID and Client Secret

### Step 3: Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm install && npm run build --workspace=shared && npm run build --workspace=backend && npm run build --workspace=web`
   - **Publish directory**: `packages/web/dist`
   - **Functions directory**: `packages/backend/dist/netlify/functions`

### Step 4: Configure Environment Variables

In Netlify dashboard, go to Site settings → Environment variables and add:

**Backend Variables:**
- `JWT_SECRET`: Generate a random string (e.g., `openssl rand -base64 32`)
- `JWT_REFRESH_SECRET`: Generate another random string
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
- `GOOGLE_CALLBACK_URL`: `https://your-site.netlify.app/api/auth/google/callback`
- `DATABASE_PATH`: `./database/feedback.db`
- `NODE_ENV`: `production`
- `FRONTEND_URL`: `https://your-site.netlify.app`

**Frontend Variables:**
- `VITE_API_URL`: `https://your-site.netlify.app/api`
- `VITE_GOOGLE_CLIENT_ID`: Same as backend GOOGLE_CLIENT_ID

### Step 5: Initialize Database

**Important**: Netlify Functions have read-only file systems. For production, you have two options:

#### Option A: Use Netlify Blobs (Recommended for small apps)
- Modify database code to use Netlify Blobs
- Store database file in Netlify Blobs storage

#### Option B: Deploy Backend Separately (Recommended for production)
1. Deploy backend to a service with persistent storage:
   - [Render](https://render.com)
   - [Railway](https://railway.app)
   - [Fly.io](https://fly.io)

2. Update `VITE_API_URL` to point to your backend URL

3. Keep web app on Netlify

### Step 6: Deploy

1. Trigger deployment by pushing to main branch
2. Wait for build to complete
3. Visit your site URL

### Step 7: Initialize Database (First Time)

If using separate backend:
```bash
# SSH into your backend server
npm run db:init
```

If using Netlify Functions:
- Database will be initialized on first function call
- Note: Data will be lost on redeployment

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Create `packages/backend/.env`:
```
JWT_SECRET=dev-secret-key
JWT_REFRESH_SECRET=dev-refresh-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8888/api/auth/google/callback
DATABASE_PATH=./database/feedback.db
NODE_ENV=development
```

Create `packages/web/.env`:
```
VITE_API_URL=http://localhost:8888/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 3. Initialize Database
```bash
npm run db:init
```

### 4. Run Development Servers

**Option A: Using Netlify Dev (Recommended)**
```bash
netlify dev
```
Access at: http://localhost:8888

**Option B: Separate Servers**
```bash
# Terminal 1: Backend
cd packages/backend
npm run dev:server

# Terminal 2: Frontend
cd packages/web
npm run dev
```

## Troubleshooting

### Database Issues on Netlify
- Netlify Functions have read-only file systems
- Consider deploying backend separately for production
- Use environment variables to switch between local and production databases

### OAuth Redirect Issues
- Ensure redirect URIs match exactly in Google Cloud Console
- Check that GOOGLE_CALLBACK_URL environment variable is correct
- Verify FRONTEND_URL is set correctly

### Build Failures
- Check Node version (should be 18+)
- Verify all dependencies are installed
- Check build logs for specific errors

### API Connection Issues
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Ensure environment variables are set in Netlify

## Default Credentials

After database initialization:
- **Moderator**: moderator@example.com / admin123
- **Test User**: user@example.com / user123

## Production Checklist

- [ ] Change JWT secrets to strong random values
- [ ] Set up Google OAuth credentials
- [ ] Configure all environment variables
- [ ] Test authentication flow
- [ ] Test review submission and moderation
- [ ] Verify database persistence strategy
- [ ] Set up monitoring/logging
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS (automatic on Netlify)
- [ ] Test on multiple devices/browsers
