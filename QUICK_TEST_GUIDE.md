# Quick Test Execution Guide

This is a quick reference guide for executing tests on the Product Feedback System.

---

## 🚀 Quick Start

### 1. Setup (5 minutes)

```bash
# Initialize database with 40 products and 10 users
cd packages/backend
npm run db:init

# Start backend server
npm run dev

# In another terminal, start web app
cd packages/web
npm run dev
```

### 2. Verify Setup

- [ ] Backend running on http://localhost:8888
- [ ] Web app running on http://localhost:5173
- [ ] Database has 40 products
- [ ] Database has 10 users

---

## 📋 Test Accounts

```
Moderator:
Email: moderator@example.com
Password: admin123

Regular Users (all use password: user123):
- user@example.com
- john.doe@example.com
- jane.smith@example.com
- mike.johnson@example.com
- sarah.williams@example.com
- david.brown@example.com
- emily.davis@example.com
- chris.wilson@example.com
- lisa.anderson@example.com
```

---

## ✅ Critical Tests (Must Pass)

### Test 1: Login (2 min)
1. Go to http://localhost:5173
2. Login with: user@example.com / user123
3. ✅ Should see 40 products

### Test 2: Search (1 min)
1. Search for "laptop"
2. ✅ Should find "Laptop Stand Aluminum"

### Test 3: Submit Review (3 min)
1. Click any product
2. Click "Write a Review"
3. Select 5 stars
4. Enter: "Great product! Highly recommend for everyone who needs quality."
5. Click Submit
6. ✅ Should show success message
7. ✅ Review should be "Pending"

### Test 4: Approve Review (3 min)
1. Logout
2. Login as: moderator@example.com / admin123
3. Click "Moderation"
4. Click "Approve" on a pending review
5. ✅ Review should disappear from pending
6. Go to product page
7. ✅ Review should be visible

### Test 5: Security (2 min)
1. Logout
2. Login as regular user
3. Try to access: http://localhost:5173/moderation
4. ✅ Should be denied/redirected

---

## 🎯 Quick Test Scenarios

### Scenario A: Happy Path (10 min)
1. Register new user
2. Browse products
3. Search for product
4. View product details
5. Submit review
6. Login as moderator
7. Approve review
8. Verify review appears

### Scenario B: Validation (5 min)
1. Try to submit review with < 10 characters
2. Try to submit review without rating
3. Try to submit review with > 1000 characters
4. ✅ All should show validation errors

### Scenario C: Authorization (5 min)
1. Login as regular user
2. Try to access moderation
3. Try to approve a review via API
4. ✅ All should be denied

---

## 🔍 What to Check

### Products Page
- [ ] All 40 products visible
- [ ] Images load
- [ ] Search works
- [ ] Category filter works (15 Electronics, 13 Home & Kitchen, 7 Sports, 5 Books)
- [ ] Product cards show rating and review count

### Product Detail Page
- [ ] Product info displays
- [ ] Reviews are listed
- [ ] "Write a Review" button visible
- [ ] Average rating shown
- [ ] Review count correct

### Review Submission
- [ ] Star rating selector works
- [ ] Character counter updates
- [ ] Validation messages appear
- [ ] Success message on submit
- [ ] Review shows as "Pending"

### Moderation Dashboard
- [ ] Only accessible by moderator
- [ ] Pending reviews listed
- [ ] Approve button works
- [ ] Reject button works
- [ ] Reviews update in real-time

---

## 🐛 Common Issues to Test

### Issue 1: Duplicate Reviews
- Submit review for Product A
- Try to submit another review for Product A
- ✅ Should show error

### Issue 2: Empty Search
- Search for "xyz123nonexistent"
- ✅ Should show "No products found"

### Issue 3: Invalid Login
- Try to login with wrong password
- ✅ Should show error message

### Issue 4: Session Expiration
- Login
- Wait for token to expire
- Try to submit review
- ✅ Should redirect to login

---

## 📊 Performance Checks

### Load Time
- Clear cache
- Load home page
- ✅ Should load in < 3 seconds
- ✅ All 40 products should appear

### Search Speed
- Type in search box
- ✅ Results should filter instantly
- ✅ No lag or delay

### Mobile Performance (if testing mobile)
- Launch app
- ✅ Should launch in < 2 seconds
- Scroll through products
- ✅ Should be smooth (60 FPS)

---

## 🔒 Security Checks

### SQL Injection
- Search for: `' OR '1'='1`
- ✅ Should treat as literal string
- ✅ No database error

### XSS
- Submit review with: `<script>alert('XSS')</script>`
- Approve it
- View on product page
- ✅ Should display as text, not execute

### API Authorization
```bash
# Try to access protected endpoint without token
curl http://localhost:8888/api/moderation/pending
```
- ✅ Should return 401 Unauthorized

---

## 📱 Mobile Testing (if applicable)

### Quick Mobile Tests
1. Install APK
2. Login
3. Browse products
4. Submit review
5. Test offline mode (airplane mode)
6. Pull to refresh

---

## ✨ Test Data Verification

### Verify Database
```bash
# Check product count
sqlite3 packages/backend/database/feedback.db "SELECT COUNT(*) FROM products;"
# Should return: 40

# Check user count
sqlite3 packages/backend/database/feedback.db "SELECT COUNT(*) FROM users;"
# Should return: 10

# Check categories
sqlite3 packages/backend/database/feedback.db "SELECT DISTINCT category FROM products;"
# Should return: Electronics, Home & Kitchen, Sports & Fitness, Books & Media
```

---

## 🎬 Test Execution Order

### Phase 1: Smoke Tests (15 min)
- Login/Logout
- View products
- Search
- Basic navigation

### Phase 2: Functional Tests (30 min)
- Review submission
- Moderation workflow
- Validation
- Error handling

### Phase 3: Security Tests (15 min)
- Authorization
- SQL injection
- XSS
- API security

### Phase 4: Performance Tests (10 min)
- Load time
- Search speed
- Scrolling performance

**Total Time: ~70 minutes**

---

## 📝 Quick Checklist

Before starting:
- [ ] Database initialized
- [ ] Backend running
- [ ] Web app running
- [ ] Test accounts verified

During testing:
- [ ] Record results
- [ ] Take screenshots of issues
- [ ] Note any defects
- [ ] Check all critical tests

After testing:
- [ ] Fill execution sheet
- [ ] Calculate pass rate
- [ ] Document defects
- [ ] Provide recommendation

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check if port is in use
netstat -ano | findstr :8888
# Kill process if needed
```

### Database issues
```bash
# Reinitialize database
rm packages/backend/database/feedback.db
npm run db:init
```

### Web app won't start
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install
```

---

## 📞 Need Help?

- Check TESTING_CHECKLIST.md for detailed procedures
- Check TEST_SCENARIOS.md for complete test cases
- Check USER_GUIDE.md for feature documentation
- Open GitHub issue for bugs

---

**Quick Reference Version:** 1.0  
**Last Updated:** [Current Date]
