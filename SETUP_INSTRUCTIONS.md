# Setup Instructions - Product Feedback System

## ⚠️ PowerShell Execution Policy Issue

Your system has PowerShell script execution disabled. You need to run commands manually in Command Prompt (CMD) instead of PowerShell.

---

## 🚀 Quick Setup (Use Command Prompt)

### Step 1: Open Command Prompt

1. Press `Windows + R`
2. Type `cmd`
3. Press Enter

### Step 2: Navigate to Backend Directory

```cmd
cd C:\Users\HP\.kiro\MobileAppFeedbackSystem\packages\backend
```

### Step 3: Install Dependencies

```cmd
npm install
```

This will install all required packages including:
- better-sqlite3
- express
- bcrypt
- jsonwebtoken
- passport
- And all other dependencies

### Step 4: Initialize Database

```cmd
npm run db:init
```

This will:
- Create the database file
- Create all tables
- Seed 40 products
- Create 10 users
- Add sample reviews

### Step 5: View Database

```cmd
npm run db:view
```

This will display all database contents in a formatted view.

---

## 🔧 Alternative: Fix PowerShell Execution Policy

If you want to use PowerShell, you can change the execution policy:

### Option A: Temporary (Current Session Only)

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Option B: Permanent (Recommended for Development)

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then restart your terminal and try again.

---

## 📋 Complete Setup Checklist

### Backend Setup
```cmd
cd C:\Users\HP\.kiro\MobileAppFeedbackSystem\packages\backend
npm install
npm run db:init
npm run db:view
```

### Web Application Setup
```cmd
cd C:\Users\HP\.kiro\MobileAppFeedbackSystem\packages\web
npm install
```

### Mobile Application Setup
```cmd
cd C:\Users\HP\.kiro\MobileAppFeedbackSystem\packages\mobile
npm install
```

### Shared Package Setup
```cmd
cd C:\Users\HP\.kiro\MobileAppFeedbackSystem\packages\shared
npm install
```

### Root Setup (Optional - for monorepo management)
```cmd
cd C:\Users\HP\.kiro\MobileAppFeedbackSystem
npm install
```

---

## 🎯 What Each Command Does

### `npm install`
- Downloads and installs all dependencies listed in package.json
- Creates node_modules folder
- May take 2-5 minutes depending on internet speed

### `npm run db:init`
- Creates SQLite database file at `packages/backend/database/feedback.db`
- Runs schema.sql to create tables
- Seeds database with:
  - 10 users (1 moderator + 9 regular users)
  - 40 products across 4 categories
  - 8 sample reviews

### `npm run db:view`
- Displays all database contents
- Shows users, products, reviews, and statistics
- Formatted output with emojis and charts

### `npm run db:query`
- Opens interactive query tool
- Allows custom SQL queries
- Menu-driven interface

---

## 📊 Expected Output After Setup

### After `npm install`:
```
added 150 packages, and audited 151 packages in 45s
found 0 vulnerabilities
```

### After `npm run db:init`:
```
🗄️  Initializing database...
📋 Creating tables...
👥 Creating default users...
   ✓ Moderator account created (moderator@example.com / admin123)
   ✓ Test user account created (user@example.com / user123)
   ✓ 8 additional test users created (Total: 10 users)
📦 Seeding products...
   ✓ 40 products seeded successfully (40 products)
⭐ Creating sample reviews...
   ✓ 8 sample reviews created
📊 Updating product statistics...
   ✓ Product statistics updated

📈 Database Summary:
   Users: 10
   Products: 40
   Reviews: 8 (2 pending)

✅ Database initialization complete!
📁 Database location: C:\Users\HP\.kiro\MobileAppFeedbackSystem\packages\backend\database\feedback.db

🔐 Default Credentials:
   Moderator: moderator@example.com / admin123
   Test User: user@example.com / user123
```

### After `npm run db:view`:
```
📊 Product Feedback System - Database Viewer
================================================================================

👥 USERS TABLE
================================================================================
Total Users: 10

ID: 1
  Email: moderator@example.com
  Display Name: System Moderator
  Role: moderator
  ...

📦 PRODUCTS TABLE
================================================================================
Total Products: 40

📁 Category: Electronics (15 products)
  [1] Wireless Bluetooth Headphones
      Description: Premium noise-cancelling headphones...
      Rating: 4.5 ⭐ (2 reviews)
  ...

⭐ REVIEWS TABLE
================================================================================
Total Reviews: 8

✅ Review #1 - APPROVED
  Product: Wireless Bluetooth Headphones
  User: Test User
  Rating: ⭐⭐⭐⭐⭐ (5/5)
  ...
```

---

## 🐛 Troubleshooting

### Issue: "npm is not recognized"

**Solution:** Node.js is not installed or not in PATH
```cmd
# Download and install Node.js from: https://nodejs.org/
# Choose LTS version (18.x or higher)
# Restart Command Prompt after installation
```

### Issue: "Cannot find module 'better-sqlite3'"

**Solution:** Dependencies not installed
```cmd
cd packages\backend
npm install
```

### Issue: "SQLITE_CANTOPEN: unable to open database file"

**Solution:** Database directory doesn't exist
```cmd
# The init script creates it automatically
npm run db:init
```

### Issue: "gyp ERR!" during npm install

**Solution:** Build tools not installed (for better-sqlite3)
```cmd
# Install Windows Build Tools
npm install --global windows-build-tools

# Or install Visual Studio Build Tools manually
# https://visualstudio.microsoft.com/downloads/
```

### Issue: PowerShell execution policy error

**Solution:** Use Command Prompt (CMD) instead
- Press Windows + R
- Type `cmd`
- Run commands there

---

## ✅ Verification Steps

After setup, verify everything works:

### 1. Check Database File Exists
```cmd
dir packages\backend\database\feedback.db
```

### 2. Check Node Modules Installed
```cmd
dir packages\backend\node_modules
```

### 3. Test Database Query
```cmd
cd packages\backend
npm run db:query
# Choose option 5 to view all users
```

### 4. Count Records
```cmd
# In packages/backend directory
sqlite3 database\feedback.db "SELECT COUNT(*) FROM users;"
# Should return: 10

sqlite3 database\feedback.db "SELECT COUNT(*) FROM products;"
# Should return: 40
```

---

## 📚 Next Steps After Setup

1. **Start Backend Server**
   ```cmd
   cd packages\backend
   npm run dev
   ```

2. **Start Web Application** (in new terminal)
   ```cmd
   cd packages\web
   npm run dev
   ```

3. **Access Application**
   - Web: http://localhost:5173
   - API: http://localhost:8888/api

4. **Login with Test Account**
   - Email: user@example.com
   - Password: user123

5. **Or Login as Moderator**
   - Email: moderator@example.com
   - Password: admin123

---

## 🎉 You're All Set!

Once setup is complete, you'll have:
- ✅ 10 user accounts ready to use
- ✅ 40 products to browse
- ✅ 8 sample reviews (6 approved, 2 pending)
- ✅ Full database with all tables
- ✅ Backend API ready to run
- ✅ Web and mobile apps ready to test

---

**Need Help?** Check the other documentation files:
- DATABASE_CONTENTS.md - See all database data
- DATABASE_VIEWER_GUIDE.md - Database viewing tools
- QUICK_TEST_GUIDE.md - Quick testing guide
- GETTING_STARTED.md - Complete setup guide

**Last Updated:** [Current Date]
