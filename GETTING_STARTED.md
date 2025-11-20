# Getting Started with Product Feedback System

This guide will help you get the Product Feedback System up and running on your Windows 10 Pro machine.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18.x or higher (`node --version`)
- ✅ npm 9.x or higher (`npm --version`)
- ✅ Git (`git --version`)

## Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd product-feedback-system

# Install all dependencies
npm install
```

This will install dependencies for all packages (web, backend, shared).

### 2. Initialize the Database

```bash
npm run db:init
```

You should see output like:
```
🗄️  Initializing database...
📋 Creating tables...
👥 Creating default users...
   ✓ Moderator account created
   ✓ Test user account created
📦 Seeding products...
   ✓ 30 products seeded successfully
⭐ Creating sample reviews...
   ✓ 8 sample reviews created
📊 Updating product statistics...
✅ Database initialization complete!
```

### 3. Set Up Environment Variables

#### Backend Environment

Create `packages/backend/.env`:
```env
JWT_SECRET=dev-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-change-in-production
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:8888/api/auth/google/callback
DATABASE_PATH=./database/feedback.db
NODE_ENV=development
```

**Note**: Google OAuth is optional for development. Leave empty to skip.

#### Frontend Environment

Create `packages/web/.env`:
```env
VITE_API_URL=http://localhost:8888/api
VITE_GOOGLE_CLIENT_ID=
```

### 4. Start the Development Server

#### Option A: Using Netlify Dev (Recommended)

```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Start the dev server
netlify dev
```

Access the application at: **http://localhost:8888**

#### Option B: Separate Servers

If you prefer to run backend and frontend separately:

**Terminal 1 - Backend:**
```bash
cd packages/backend
npm run dev:server
```
Backend runs on: http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd packages/web
npm run dev
```
Frontend runs on: http://localhost:5173

### 5. Test the Application

1. **Open your browser** to http://localhost:8888 (or http://localhost:5173)

2. **Browse products** - You should see 30 products

3. **Try logging in** with test credentials:
   - Email: `user@example.com`
   - Password: `user123`

4. **Submit a review** on any product

5. **Test moderation** by logging in as moderator:
   - Email: `moderator@example.com`
   - Password: `admin123`
   - Go to "Moderation" in the header
   - Approve or reject pending reviews

## Common Issues and Solutions

### Issue: "Cannot find module 'better-sqlite3'"

**Solution:**
```bash
cd packages/backend
npm install
```

### Issue: "Port 8888 is already in use"

**Solution:**
```bash
# Find and kill the process using port 8888
netstat -ano | findstr :8888
taskkill /PID <process-id> /F
```

### Issue: Database not found

**Solution:**
```bash
# Re-initialize the database
npm run db:init
```

### Issue: CORS errors in browser

**Solution:**
- Ensure backend is running
- Check that `VITE_API_URL` in `packages/web/.env` matches your backend URL
- Clear browser cache and reload

### Issue: Google OAuth not working

**Solution:**
- Google OAuth is optional for development
- To enable it, set up credentials in Google Cloud Console
- Add the Client ID and Secret to your `.env` files

## Development Workflow

### Making Changes

1. **Backend changes**: Edit files in `packages/backend/src/`
   - Server auto-restarts with nodemon (if using dev:server)
   - Netlify dev auto-reloads functions

2. **Frontend changes**: Edit files in `packages/web/src/`
   - Vite hot-reloads automatically
   - Changes appear instantly in browser

3. **Database changes**: 
   - Modify `packages/backend/src/database/schema.sql`
   - Re-run `npm run db:init` (⚠️ This will reset all data)

### Testing Your Changes

1. **Manual testing**: Use the web interface
2. **API testing**: Use tools like Postman or curl
3. **Check logs**: Look at terminal output for errors

### Example API Test

```bash
# Test health endpoint
curl http://localhost:8888/api/health

# Test products endpoint
curl http://localhost:8888/api/products

# Test login
curl -X POST http://localhost:8888/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"user123"}'
```

## Next Steps

Once you have the application running:

1. **Explore the code**:
   - `packages/web/src/pages/` - Page components
   - `packages/backend/src/routes/` - API endpoints
   - `packages/backend/src/database/` - Database layer

2. **Try the features**:
   - Create an account
   - Browse products
   - Submit reviews
   - Test moderation (as moderator)

3. **Make modifications**:
   - Add new products to seed data
   - Customize the UI
   - Add new features

4. **Deploy** (when ready):
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions

## Quick Reference

### Useful Commands

```bash
# Install dependencies
npm install

# Initialize database
npm run db:init

# Start development
netlify dev

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Important Files

- `packages/backend/.env` - Backend configuration
- `packages/web/.env` - Frontend configuration
- `packages/backend/database/feedback.db` - SQLite database
- `netlify.toml` - Netlify deployment config

### Default URLs

- **Web App**: http://localhost:8888 or http://localhost:5173
- **API**: http://localhost:8888/api or http://localhost:3000/api
- **API Health**: http://localhost:8888/api/health

## Getting Help

- Check [README.md](README.md) for overview
- See [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for what's implemented
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Open an issue on GitHub for bugs

## Success Checklist

- [ ] Dependencies installed
- [ ] Database initialized
- [ ] Environment variables configured
- [ ] Development server running
- [ ] Can access web app in browser
- [ ] Can login with test credentials
- [ ] Can browse products
- [ ] Can submit a review
- [ ] Can moderate reviews (as moderator)

If you've checked all these boxes, you're ready to develop! 🎉
