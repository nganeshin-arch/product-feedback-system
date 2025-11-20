# Test Scenarios - Product Feedback System

This document contains detailed test scenarios and test cases for comprehensive testing of the Product Feedback System.

---

## Table of Contents

1. [Test Environment Setup](#test-environment-setup)
2. [Test Data](#test-data)
3. [Test Scenarios](#test-scenarios)
4. [Detailed Test Cases](#detailed-test-cases)
5. [Execution Instructions](#execution-instructions)

---

## Test Environment Setup

### Prerequisites

Before executing tests, ensure:

- [ ] Database initialized: `npm run db:init`
- [ ] Backend server running: `npm run dev` (or deployed)
- [ ] Web application accessible
- [ ] Mobile app installed (for mobile tests)
- [ ] Test accounts available

### Test Accounts

```
Moderator Account:
Email: moderator@example.com
Password: admin123

Regular User Accounts:
1. user@example.com / user123
2. john.doe@example.com / user123
3. jane.smith@example.com / user123
4. mike.johnson@example.com / user123
5. sarah.williams@example.com / user123
6. david.brown@example.com / user123
7. emily.davis@example.com / user123
8. chris.wilson@example.com / user123
9. lisa.anderson@example.com / user123
```

### Test Data

- **Products:** 40 products across 4 categories
- **Users:** 10 users (1 moderator + 9 regular users)
- **Sample Reviews:** 8 pre-seeded reviews

---

## Test Scenarios

### Scenario 1: User Registration and Authentication
**Objective:** Verify user can create account and login successfully

### Scenario 2: Product Browsing and Search
**Objective:** Verify users can browse, search, and filter products

### Scenario 3: Review Submission Workflow
**Objective:** Verify complete review submission process

### Scenario 4: Moderation Workflow
**Objective:** Verify moderator can manage reviews

### Scenario 5: Cross-Platform Synchronization
**Objective:** Verify data syncs between web and mobile

### Scenario 6: Error Handling and Validation
**Objective:** Verify system handles errors gracefully

### Scenario 7: Security and Authorization
**Objective:** Verify security measures are working

### Scenario 8: Performance and Scalability
**Objective:** Verify system performs well with 40 products

---

## Detailed Test Cases

---

## SCENARIO 1: User Registration and Authentication

### TC-001: New User Registration (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- Web application is accessible
- User is not logged in

**Test Steps:**
1. Navigate to web application URL
2. Click "Sign Up" button
3. Enter the following details:
   - Display Name: "Test User New"
   - Email: "testuser.new@example.com"
   - Password: "test123456"
4. Click "Sign Up" button

**Expected Results:**
- ✅ Form validates all fields
- ✅ Account is created successfully
- ✅ User is automatically logged in
- ✅ Redirected to home page
- ✅ User name appears in header
- ✅ Success message displayed

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

**Notes:** _[Any observations]_

---

### TC-002: User Login with Valid Credentials (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- User account exists (user@example.com)
- User is not logged in

**Test Steps:**
1. Navigate to web application
2. Click "Login" button
3. Enter email: "user@example.com"
4. Enter password: "user123"
5. Click "Login" button

**Expected Results:**
- ✅ Login successful
- ✅ Redirected to home page
- ✅ User name "Test User" displayed in header
- ✅ Products are visible

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-003: Login with Invalid Credentials (Web)

**Priority:** High  
**Type:** Negative  
**Platform:** Web

**Preconditions:**
- User is not logged in

**Test Steps:**
1. Navigate to login page
2. Enter email: "user@example.com"
3. Enter password: "wrongpassword"
4. Click "Login" button

**Expected Results:**
- ✅ Login fails
- ✅ Error message displayed: "Invalid credentials" or similar
- ✅ User remains on login page
- ✅ No redirect occurs

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-004: User Logout (Web)

**Priority:** Medium  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- User is logged in

**Test Steps:**
1. Click "Logout" button in header
2. Observe behavior

**Expected Results:**
- ✅ User is logged out
- ✅ Redirected to login page
- ✅ Cannot access protected routes
- ✅ Session cleared

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-005: Mobile App Login

**Priority:** High  
**Type:** Functional  
**Platform:** Mobile

**Preconditions:**
- Mobile app installed
- User account exists

**Test Steps:**
1. Open mobile app
2. Enter email: "john.doe@example.com"
3. Enter password: "user123"
4. Tap "Login" button

**Expected Results:**
- ✅ Login successful
- ✅ Navigate to home screen
- ✅ Products load
- ✅ User name displayed

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

## SCENARIO 2: Product Browsing and Search

### TC-006: View All Products (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- User is logged in
- Database has 40 products

**Test Steps:**
1. Navigate to home page
2. Observe product list
3. Scroll through all products

**Expected Results:**
- ✅ All 40 products are displayed
- ✅ Products show: image, name, description, category, rating
- ✅ Products are in grid layout
- ✅ Scrolling is smooth
- ✅ Images load correctly

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-007: Search Products by Name (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- User is on home page
- Products are loaded

**Test Steps:**
1. Click on search bar
2. Type "laptop"
3. Observe results

**Expected Results:**
- ✅ Results filter in real-time
- ✅ "Laptop Stand Aluminum" appears
- ✅ Other products are hidden
- ✅ Search is case-insensitive

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-008: Search Products - No Results (Web)

**Priority:** Medium  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- User is on home page

**Test Steps:**
1. Enter search term: "xyz123nonexistent"
2. Observe results

**Expected Results:**
- ✅ No products displayed
- ✅ "No products found" message shown
- ✅ No errors occur

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-009: Filter Products by Category (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- User is on home page

**Test Steps:**
1. Click category filter dropdown
2. Select "Electronics"
3. Observe results
4. Count displayed products

**Expected Results:**
- ✅ Only Electronics products shown
- ✅ 15 products displayed
- ✅ Other categories hidden
- ✅ Filter can be cleared

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-010: View Product Details (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- User is on home page

**Test Steps:**
1. Click on "Wireless Bluetooth Headphones" product card
2. Observe product detail page

**Expected Results:**
- ✅ Navigate to product detail page
- ✅ Product name displayed
- ✅ Product description shown
- ✅ Product image visible
- ✅ Average rating displayed
- ✅ Review count shown
- ✅ Approved reviews listed
- ✅ "Write a Review" button visible

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-011: Mobile Product List with Pull-to-Refresh

**Priority:** Medium  
**Type:** Functional  
**Platform:** Mobile

**Preconditions:**
- User logged in on mobile app

**Test Steps:**
1. View product list
2. Pull down to refresh
3. Observe behavior

**Expected Results:**
- ✅ Refresh indicator appears
- ✅ Products reload
- ✅ List updates
- ✅ No errors occur

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

## SCENARIO 3: Review Submission Workflow

### TC-012: Submit Valid Review (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- User logged in as "mike.johnson@example.com"
- User has not reviewed "Smart Watch Pro" yet

**Test Steps:**
1. Navigate to "Smart Watch Pro" product detail
2. Click "Write a Review" button
3. Select 5 stars
4. Enter review text: "Excellent smartwatch! The fitness tracking features are amazing and battery life exceeds expectations. Highly recommend for active users."
5. Click "Submit Review"

**Expected Results:**
- ✅ Review form validates
- ✅ Character counter updates
- ✅ Review submits successfully
- ✅ Success message displayed
- ✅ Review status is "Pending"
- ✅ Redirect to product page

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-013: Submit Review - Text Too Short (Web)

**Priority:** High  
**Type:** Negative  
**Platform:** Web

**Preconditions:**
- User on review submission form

**Test Steps:**
1. Select 4 stars
2. Enter review text: "Good" (4 characters)
3. Attempt to submit

**Expected Results:**
- ✅ Validation error displayed
- ✅ Error message: "Review must be at least 10 characters"
- ✅ Submit button disabled or form doesn't submit
- ✅ Review not saved

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-014: Submit Review - Text Too Long (Web)

**Priority:** Medium  
**Type:** Negative  
**Platform:** Web

**Preconditions:**
- User on review submission form

**Test Steps:**
1. Select 3 stars
2. Enter review text with 1001 characters
3. Attempt to submit

**Expected Results:**
- ✅ Validation error displayed
- ✅ Error message: "Review must be 1000 characters or less"
- ✅ Character counter shows exceeded limit
- ✅ Submit button disabled
- ✅ Review not saved

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-015: Submit Review - No Rating Selected (Web)

**Priority:** High  
**Type:** Negative  
**Platform:** Web

**Preconditions:**
- User on review submission form

**Test Steps:**
1. Do NOT select any stars
2. Enter valid review text (50 characters)
3. Attempt to submit

**Expected Results:**
- ✅ Validation error displayed
- ✅ Error message: "Please select a rating"
- ✅ Form doesn't submit
- ✅ Review not saved

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-016: Submit Duplicate Review (Web)

**Priority:** Medium  
**Type:** Negative  
**Platform:** Web

**Preconditions:**
- User has already reviewed a product

**Test Steps:**
1. Navigate to product user already reviewed
2. Attempt to submit another review

**Expected Results:**
- ✅ Error message displayed
- ✅ Message: "You have already reviewed this product"
- ✅ Review not saved
- ✅ User informed of restriction

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-017: Submit Review on Mobile

**Priority:** High  
**Type:** Functional  
**Platform:** Mobile

**Preconditions:**
- User logged in on mobile
- User hasn't reviewed selected product

**Test Steps:**
1. Open product details
2. Tap "Write a Review"
3. Tap stars to select 4-star rating
4. Enter review text (50+ characters)
5. Tap "Submit"

**Expected Results:**
- ✅ Review submits successfully
- ✅ Success alert displayed
- ✅ Navigate back to product detail
- ✅ Review status is "Pending"

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

## SCENARIO 4: Moderation Workflow

### TC-018: Access Moderation Dashboard (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- Logged in as moderator@example.com

**Test Steps:**
1. Click "Moderation" link in header
2. Observe moderation dashboard

**Expected Results:**
- ✅ Moderation dashboard loads
- ✅ Pending reviews are listed
- ✅ Each review shows: product name, user, rating, text, date
- ✅ Action buttons visible (Approve/Reject)

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-019: Approve Pending Review (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- Logged in as moderator
- At least one pending review exists

**Test Steps:**
1. Navigate to moderation dashboard
2. Find a pending review
3. Click "Approve" button
4. Confirm action
5. Navigate to the product page

**Expected Results:**
- ✅ Review is approved
- ✅ Success message displayed
- ✅ Review removed from pending list
- ✅ Review appears on product page
- ✅ Product rating updates
- ✅ Moderation action logged

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-020: Reject Pending Review with Reason (Web)

**Priority:** High  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- Logged in as moderator
- Pending review exists

**Test Steps:**
1. Navigate to moderation dashboard
2. Find a pending review
3. Click "Reject" button
4. Enter reason: "Review contains inappropriate content"
5. Confirm rejection

**Expected Results:**
- ✅ Review is rejected
- ✅ Success message displayed
- ✅ Review removed from pending list
- ✅ Review does NOT appear on product page
- ✅ Rejection reason saved
- ✅ Moderation action logged

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-021: Remove Approved Review (Web)

**Priority:** Medium  
**Type:** Functional  
**Platform:** Web

**Preconditions:**
- Logged in as moderator
- Approved review exists on a product

**Test Steps:**
1. Navigate to product with approved review
2. Find the review
3. Click "Remove" button (moderator only)
4. Confirm removal

**Expected Results:**
- ✅ Review is removed
- ✅ Success message displayed
- ✅ Review disappears from product page
- ✅ Product rating recalculates
- ✅ Moderation action logged

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-022: Regular User Cannot Access Moderation (Web)

**Priority:** High  
**Type:** Security  
**Platform:** Web

**Preconditions:**
- Logged in as regular user (not moderator)

**Test Steps:**
1. Attempt to navigate to /moderation URL directly
2. Observe behavior

**Expected Results:**
- ✅ Access denied
- ✅ 403 Forbidden error or redirect
- ✅ Error message displayed
- ✅ User cannot see moderation dashboard

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-023: Moderation on Mobile

**Priority:** High  
**Type:** Functional  
**Platform:** Mobile

**Preconditions:**
- Logged in as moderator on mobile

**Test Steps:**
1. Tap "Moderation" button
2. View pending reviews
3. Tap a review
4. Tap "Approve"
5. Confirm action

**Expected Results:**
- ✅ Moderation screen loads
- ✅ Pending reviews visible
- ✅ Review details shown
- ✅ Approve action works
- ✅ Success alert displayed

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

## SCENARIO 5: Cross-Platform Synchronization

### TC-024: Review Submission Syncs Web to Mobile

**Priority:** High  
**Type:** Integration  
**Platform:** Both

**Preconditions:**
- User logged in on both web and mobile
- Same user account

**Test Steps:**
1. On WEB: Submit a review for "Air Fryer XL"
2. On MOBILE: Navigate to "Air Fryer XL" product
3. Pull to refresh
4. Check for the review

**Expected Results:**
- ✅ Review submitted on web
- ✅ Review appears as "Pending" on mobile
- ✅ Data syncs correctly
- ✅ Review details match

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-025: Moderation Action Syncs Across Platforms

**Priority:** High  
**Type:** Integration  
**Platform:** Both

**Preconditions:**
- Moderator logged in on web
- Regular user logged in on mobile
- Pending review exists

**Test Steps:**
1. On WEB (moderator): Approve a pending review
2. On MOBILE (user): Navigate to that product
3. Refresh the product page
4. Check if review is visible

**Expected Results:**
- ✅ Review approved on web
- ✅ Review appears on mobile product page
- ✅ Rating updates on mobile
- ✅ Data syncs correctly

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

## SCENARIO 6: Error Handling and Validation

### TC-026: Network Error Handling (Web)

**Priority:** Medium  
**Type:** Negative  
**Platform:** Web

**Test Steps:**
1. Disconnect internet
2. Attempt to load products
3. Observe error handling

**Expected Results:**
- ✅ Error message displayed
- ✅ User-friendly message shown
- ✅ Retry option available
- ✅ No application crash

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-027: Invalid Product ID (Web)

**Priority:** Low  
**Type:** Negative  
**Platform:** Web

**Test Steps:**
1. Navigate to URL: /products/99999
2. Observe behavior

**Expected Results:**
- ✅ 404 error or "Product not found" message
- ✅ User can navigate back
- ✅ No application crash

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-028: Session Expiration Handling (Web)

**Priority:** Medium  
**Type:** Functional  
**Platform:** Web

**Test Steps:**
1. Login to application
2. Wait for token to expire (or manually expire)
3. Attempt to submit a review

**Expected Results:**
- ✅ Session expired message shown
- ✅ Redirect to login page
- ✅ After re-login, can continue
- ✅ No data loss

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-029: Offline Mode (Mobile)

**Priority:** Medium  
**Type:** Functional  
**Platform:** Mobile

**Test Steps:**
1. Load products while online
2. Enable airplane mode
3. Navigate through app
4. Attempt to view cached products

**Expected Results:**
- ✅ Cached products visible
- ✅ Offline indicator shown
- ✅ Cannot submit new reviews
- ✅ Graceful error messages

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

## SCENARIO 7: Security and Authorization

### TC-030: SQL Injection Prevention

**Priority:** Critical  
**Type:** Security  
**Platform:** Web

**Test Steps:**
1. In search box, enter: `' OR '1'='1`
2. Observe results

**Expected Results:**
- ✅ No SQL injection occurs
- ✅ Search treats input as literal string
- ✅ No database error
- ✅ No unauthorized data access

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-031: XSS Prevention in Reviews

**Priority:** Critical  
**Type:** Security  
**Platform:** Web

**Test Steps:**
1. Submit review with text: `<script>alert('XSS')</script>`
2. Approve review (as moderator)
3. View review on product page

**Expected Results:**
- ✅ Script does not execute
- ✅ Text is escaped/sanitized
- ✅ Displays as plain text
- ✅ No XSS vulnerability

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-032: Unauthorized API Access

**Priority:** Critical  
**Type:** Security  
**Platform:** API

**Test Steps:**
1. Use API client (Postman/curl)
2. Attempt to access: GET /api/moderation/pending
3. Do NOT include authentication token

**Expected Results:**
- ✅ Request denied
- ✅ 401 Unauthorized response
- ✅ No data returned
- ✅ Error message provided

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

## SCENARIO 8: Performance and Scalability

### TC-033: Load Time with 40 Products (Web)

**Priority:** Medium  
**Type:** Performance  
**Platform:** Web

**Test Steps:**
1. Clear browser cache
2. Navigate to home page
3. Measure load time

**Expected Results:**
- ✅ Page loads in < 3 seconds
- ✅ All 40 products visible
- ✅ Images load progressively
- ✅ No performance issues

**Actual Results:** _[To be filled during execution]_

**Load Time:** _[Record time]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-034: Search Performance with Large Dataset

**Priority:** Medium  
**Type:** Performance  
**Platform:** Web

**Test Steps:**
1. Enter search term: "smart"
2. Measure response time
3. Observe filtering speed

**Expected Results:**
- ✅ Results filter in real-time
- ✅ No lag or delay
- ✅ Smooth user experience
- ✅ Response < 500ms

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-035: Mobile App Performance

**Priority:** Medium  
**Type:** Performance  
**Platform:** Mobile

**Test Steps:**
1. Launch mobile app
2. Measure launch time
3. Scroll through product list
4. Observe performance

**Expected Results:**
- ✅ App launches in < 2 seconds
- ✅ Smooth scrolling (60 FPS)
- ✅ No lag or stuttering
- ✅ Images load efficiently

**Actual Results:** _[To be filled during execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

## Execution Instructions

### How to Execute Tests

1. **Prepare Environment**
   ```bash
   # Initialize database
   cd packages/backend
   npm run db:init
   
   # Start backend
   npm run dev
   
   # Start web app (in another terminal)
   cd packages/web
   npm run dev
   ```

2. **Execute Tests Systematically**
   - Follow test cases in order
   - Record actual results
   - Mark Pass/Fail status
   - Note any defects

3. **Document Results**
   - Fill in "Actual Results" section
   - Mark status (Pass/Fail)
   - Add notes for failures
   - Take screenshots if needed

4. **Report Defects**
   - Create GitHub issues for failures
   - Include test case number
   - Provide reproduction steps
   - Attach screenshots/logs

### Test Execution Checklist

- [ ] All test accounts verified
- [ ] Database initialized with 40 products
- [ ] Backend server running
- [ ] Web application accessible
- [ ] Mobile app installed (if testing mobile)
- [ ] Test execution sheet prepared
- [ ] Screen recording tool ready (optional)

### Test Completion Criteria

- [ ] All high-priority tests executed
- [ ] 90%+ pass rate achieved
- [ ] All critical defects resolved
- [ ] Test results documented
- [ ] Defects logged in issue tracker

---

## Test Summary Template

```
Test Execution Summary
======================
Date: [Date]
Tester: [Name]
Environment: [Dev/Staging/Prod]

Total Test Cases: 35
Executed: __
Passed: __
Failed: __
Blocked: __
Pass Rate: __%

Critical Issues: __
High Priority Issues: __
Medium Priority Issues: __
Low Priority Issues: __

Overall Status: ⬜ Ready for Release / ⬜ Not Ready

Notes:
[Add any observations]
```

---

**Document Version:** 1.0  
**Last Updated:** [Current Date]  
**Total Test Cases:** 35  
**Estimated Execution Time:** 4-6 hours
