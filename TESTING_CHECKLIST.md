# End-to-End Testing Checklist

This document provides a comprehensive testing checklist for the Product Feedback System across all platforms (Web and Mobile).

## Test Environment Setup

### Prerequisites
- [ ] Backend server running (local or deployed)
- [ ] Database initialized with seed data
- [ ] Web application deployed or running locally
- [ ] Mobile app installed on Android device
- [ ] Test accounts available (user and moderator)

### Test Accounts
- **Regular User:** user@example.com / user123
- **Moderator:** moderator@example.com / admin123
- **Test User 2:** john.doe@example.com / user123
- **Test User 3:** jane.smith@example.com / user123

---

## 1. Authentication Testing

### Web Application

#### Sign Up
- [ ] Navigate to signup page
- [ ] Enter valid display name, email, and password
- [ ] Submit form
- [ ] Verify successful account creation
- [ ] Verify automatic login after signup
- [ ] Verify redirect to home page

#### Sign Up - Validation
- [ ] Try signup with empty fields - should show error
- [ ] Try signup with invalid email format - should show error
- [ ] Try signup with password < 6 characters - should show error
- [ ] Try signup with existing email - should show error

#### Login
- [ ] Navigate to login page
- [ ] Enter valid credentials
- [ ] Submit form
- [ ] Verify successful login
- [ ] Verify redirect to home page
- [ ] Verify user name displayed in header

#### Login - Validation
- [ ] Try login with empty fields - should show error
- [ ] Try login with invalid credentials - should show error
- [ ] Try login with non-existent email - should show error

#### Logout
- [ ] Click logout button
- [ ] Verify redirect to login page
- [ ] Verify cannot access protected routes
- [ ] Try accessing /products directly - should redirect to login

### Mobile Application

#### Sign Up
- [ ] Open app
- [ ] Tap "Sign Up"
- [ ] Enter valid display name, email, and password
- [ ] Tap "Sign Up" button
- [ ] Verify successful account creation
- [ ] Verify automatic login after signup
- [ ] Verify navigation to home screen

#### Sign Up - Validation
- [ ] Try signup with empty fields - should show alert
- [ ] Try signup with invalid email - should show alert
- [ ] Try signup with short password - should show alert
- [ ] Try signup with existing email - should show alert

#### Login
- [ ] Open app
- [ ] Enter valid credentials
- [ ] Tap "Login" button
- [ ] Verify successful login
- [ ] Verify navigation to home screen
- [ ] Verify user name displayed

#### Login - Validation
- [ ] Try login with empty fields - should show alert
- [ ] Try login with invalid credentials - should show alert

#### Logout
- [ ] Tap logout button
- [ ] Verify navigation to login screen
- [ ] Verify app requires login again

---

## 2. Product Browsing Testing

### Web Application

#### Product List
- [ ] Navigate to home page
- [ ] Verify all products load (should see ~30 products)
- [ ] Verify product cards show: image, name, description, category, rating
- [ ] Verify average rating displays correctly
- [ ] Verify review count displays correctly
- [ ] Scroll through entire list - all products should load

#### Search Functionality
- [ ] Enter search term in search bar
- [ ] Verify products filter in real-time
- [ ] Try searching for "headphones" - should show matching products
- [ ] Try searching for "xyz123" - should show "no products found"
- [ ] Clear search - all products should reappear

#### Category Filter
- [ ] Select "Electronics" category
- [ ] Verify only electronics products show
- [ ] Select "Home & Kitchen" category
- [ ] Verify only home & kitchen products show
- [ ] Select "All Categories"
- [ ] Verify all products show again

#### Product Detail
- [ ] Click on a product card
- [ ] Verify navigation to product detail page
- [ ] Verify product information displays correctly
- [ ] Verify product image loads
- [ ] Verify average rating and review count
- [ ] Verify approved reviews list displays
- [ ] Verify reviews sorted by date (newest first)

### Mobile Application

#### Product List
- [ ] Open app and login
- [ ] Verify products load on home screen
- [ ] Verify product cards display correctly
- [ ] Scroll through list - should be smooth
- [ ] Pull down to refresh
- [ ] Verify products reload

#### Search Functionality
- [ ] Tap search bar
- [ ] Enter search term
- [ ] Verify products filter
- [ ] Clear search
- [ ] Verify all products return

#### Product Detail
- [ ] Tap on a product
- [ ] Verify navigation to detail screen
- [ ] Verify all product info displays
- [ ] Verify reviews list displays
- [ ] Scroll through reviews
- [ ] Tap back button - should return to home

---

## 3. Review Submission Testing

### Web Application

#### Submit Review - Success
- [ ] Login as regular user
- [ ] Navigate to product detail page
- [ ] Click "Write a Review" button
- [ ] Select 5-star rating
- [ ] Enter review text (50 characters)
- [ ] Click "Submit Review"
- [ ] Verify success message displays
- [ ] Verify review shows as "Pending"

#### Submit Review - Validation
- [ ] Try submitting without rating - should show error
- [ ] Try submitting with < 10 characters - should show error
- [ ] Try submitting with > 1000 characters - should show error
- [ ] Verify character counter updates in real-time
- [ ] Verify submit button disabled until valid

#### Multiple Reviews
- [ ] Submit review for Product A
- [ ] Try submitting another review for Product A
- [ ] Should show error (one review per product per user)
- [ ] Submit review for Product B
- [ ] Should succeed

### Mobile Application

#### Submit Review - Success
- [ ] Login as regular user
- [ ] Open product detail
- [ ] Tap "Write a Review"
- [ ] Select star rating by tapping stars
- [ ] Enter review text
- [ ] Tap "Submit"
- [ ] Verify success alert
- [ ] Verify navigation back to product detail

#### Submit Review - Validation
- [ ] Try submitting without rating - should show alert
- [ ] Try submitting with short text - should show alert
- [ ] Verify character counter displays
- [ ] Verify submit button behavior

---

## 4. Moderation Testing

### Web Application

#### Access Moderation Dashboard
- [ ] Login as moderator account
- [ ] Verify "Moderation" link appears in header
- [ ] Click "Moderation" link
- [ ] Verify navigation to moderation dashboard
- [ ] Verify pending reviews list displays

#### Approve Review
- [ ] Select a pending review
- [ ] Click "Approve" button
- [ ] Verify confirmation message
- [ ] Verify review removed from pending list
- [ ] Navigate to product page
- [ ] Verify review now appears in approved reviews
- [ ] Verify product average rating updated

#### Reject Review
- [ ] Select a pending review
- [ ] Click "Reject" button
- [ ] Optionally enter rejection reason
- [ ] Confirm rejection
- [ ] Verify review removed from pending list
- [ ] Verify review does not appear on product page

#### Remove Review
- [ ] Navigate to product with approved reviews
- [ ] Click "Remove" on a review (moderator only)
- [ ] Confirm removal
- [ ] Verify review removed from product page
- [ ] Verify product rating recalculated

#### Moderation History
- [ ] View moderation history
- [ ] Verify all actions logged
- [ ] Verify timestamps correct
- [ ] Verify moderator name shown

### Mobile Application

#### Access Moderation
- [ ] Login as moderator
- [ ] Verify "Moderation" button appears
- [ ] Tap "Moderation" button
- [ ] Verify navigation to moderation screen
- [ ] Verify pending reviews list

#### Approve Review
- [ ] Tap on a pending review
- [ ] Tap "Approve" button
- [ ] Verify success alert
- [ ] Verify review removed from list
- [ ] Navigate to product
- [ ] Verify review appears

#### Reject Review
- [ ] Tap on a pending review
- [ ] Tap "Reject" button
- [ ] Verify success alert
- [ ] Verify review removed from list

---

## 5. Cross-Platform Data Synchronization

### Web to Mobile
- [ ] Login on web application
- [ ] Submit a review
- [ ] Open mobile app (same account)
- [ ] Verify review appears as pending
- [ ] Approve review on web (as moderator)
- [ ] Refresh mobile app
- [ ] Verify review now approved

### Mobile to Web
- [ ] Login on mobile app
- [ ] Submit a review
- [ ] Open web application (same account)
- [ ] Verify review appears as pending
- [ ] Approve review on mobile (as moderator)
- [ ] Refresh web app
- [ ] Verify review now approved

### Real-time Updates
- [ ] Open web app in two browsers
- [ ] Login as user in Browser 1
- [ ] Login as moderator in Browser 2
- [ ] Submit review in Browser 1
- [ ] Refresh moderation dashboard in Browser 2
- [ ] Verify new review appears
- [ ] Approve review in Browser 2
- [ ] Refresh product page in Browser 1
- [ ] Verify review now approved

---

## 6. Error Handling Testing

### Network Errors

#### Web Application
- [ ] Disconnect internet
- [ ] Try to login - should show error message
- [ ] Try to load products - should show error
- [ ] Try to submit review - should show error
- [ ] Reconnect internet
- [ ] Retry action - should succeed

#### Mobile Application
- [ ] Enable airplane mode
- [ ] Try to login - should show alert
- [ ] Try to load products - should show error
- [ ] Verify cached products still visible
- [ ] Disable airplane mode
- [ ] Pull to refresh - should reload data

### Invalid Data

#### Web Application
- [ ] Try accessing /products/99999 (non-existent product)
- [ ] Should show 404 or error message
- [ ] Try accessing /reviews/99999
- [ ] Should handle gracefully

#### Mobile Application
- [ ] Try navigating to non-existent product
- [ ] Should show error message
- [ ] Should allow navigation back

### Session Expiration
- [ ] Login to web app
- [ ] Wait for token to expire (or manually expire)
- [ ] Try to submit review
- [ ] Should redirect to login
- [ ] Login again
- [ ] Should be able to continue

---

## 7. Responsive Design Testing (Web Only)

### Desktop (1920x1080)
- [ ] Open web app in full screen
- [ ] Verify layout looks good
- [ ] Verify product grid shows multiple columns
- [ ] Verify all elements properly spaced
- [ ] Verify images load correctly

### Laptop (1366x768)
- [ ] Resize browser window
- [ ] Verify layout adjusts
- [ ] Verify product grid responsive
- [ ] Verify navigation accessible

### Tablet (768x1024)
- [ ] Resize to tablet dimensions
- [ ] Verify layout stacks appropriately
- [ ] Verify touch targets large enough
- [ ] Verify forms usable

### Mobile (375x667)
- [ ] Resize to mobile dimensions
- [ ] Verify single column layout
- [ ] Verify hamburger menu (if applicable)
- [ ] Verify forms fit on screen
- [ ] Verify buttons accessible

---

## 8. Browser Compatibility Testing (Web Only)

### Chrome
- [ ] Test all core functionality
- [ ] Verify styling correct
- [ ] Verify no console errors

### Firefox
- [ ] Test all core functionality
- [ ] Verify styling correct
- [ ] Verify no console errors

### Edge
- [ ] Test all core functionality
- [ ] Verify styling correct
- [ ] Verify no console errors

### Safari (if available)
- [ ] Test all core functionality
- [ ] Verify styling correct
- [ ] Verify no console errors

---

## 9. Performance Testing

### Web Application
- [ ] Measure page load time (should be < 3 seconds)
- [ ] Check product list load time
- [ ] Verify images lazy load
- [ ] Check for memory leaks (open DevTools)
- [ ] Verify smooth scrolling

### Mobile Application
- [ ] Measure app launch time (should be < 2 seconds)
- [ ] Check product list scroll performance
- [ ] Verify images load efficiently
- [ ] Check app memory usage
- [ ] Test on low-end device if possible

---

## 10. Security Testing

### Authentication
- [ ] Verify passwords not visible in network requests
- [ ] Verify JWT tokens used for authentication
- [ ] Verify tokens stored securely
- [ ] Verify logout clears tokens
- [ ] Verify expired tokens handled

### Authorization
- [ ] Try accessing moderation as regular user
- [ ] Should be denied (403 error)
- [ ] Try accessing other user's reviews
- [ ] Should be restricted
- [ ] Verify role-based access control works

### Input Validation
- [ ] Try SQL injection in search: `' OR '1'='1`
- [ ] Should be sanitized
- [ ] Try XSS in review: `<script>alert('xss')</script>`
- [ ] Should be escaped
- [ ] Try very long input strings
- [ ] Should be truncated or rejected

---

## 11. Offline Functionality (Mobile Only)

### Cached Data
- [ ] Load products while online
- [ ] Enable airplane mode
- [ ] Verify products still visible
- [ ] Verify product details accessible
- [ ] Verify reviews visible

### Offline Indicator
- [ ] Enable airplane mode
- [ ] Verify offline indicator shows
- [ ] Disable airplane mode
- [ ] Verify indicator disappears

### Sync on Reconnect
- [ ] Go offline
- [ ] Try to submit review (should queue or fail)
- [ ] Go back online
- [ ] Verify data syncs

---

## 12. Edge Cases

### Empty States
- [ ] View product with no reviews
- [ ] Should show "No reviews yet" message
- [ ] Search for non-existent product
- [ ] Should show "No products found"
- [ ] View moderation with no pending reviews
- [ ] Should show "No pending reviews"

### Boundary Values
- [ ] Submit review with exactly 10 characters
- [ ] Should succeed
- [ ] Submit review with exactly 1000 characters
- [ ] Should succeed
- [ ] Submit review with 9 characters
- [ ] Should fail
- [ ] Submit review with 1001 characters
- [ ] Should fail

### Concurrent Actions
- [ ] Open product in two tabs
- [ ] Submit review in Tab 1
- [ ] Refresh Tab 2
- [ ] Verify review appears
- [ ] Approve review in Tab 2
- [ ] Refresh Tab 1
- [ ] Verify review approved

---

## Test Results Summary

### Web Application
- Total Tests: ___
- Passed: ___
- Failed: ___
- Blocked: ___

### Mobile Application
- Total Tests: ___
- Passed: ___
- Failed: ___
- Blocked: ___

### Critical Issues Found
1. 
2. 
3. 

### Minor Issues Found
1. 
2. 
3. 

### Recommendations
1. 
2. 
3. 

---

## Sign-off

- [ ] All critical functionality tested
- [ ] All critical bugs fixed
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Ready for production

**Tested By:** _______________
**Date:** _______________
**Version:** _______________
