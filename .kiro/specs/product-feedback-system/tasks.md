# Implementation Plan

- [x] 1. Set up project structure and initialize repositories



  - Create monorepo structure with separate folders for web, mobile, and backend
  - Initialize React web app with Vite and TypeScript
  - Initialize React Native mobile app with TypeScript
  - Set up shared types package for common interfaces
  - Configure ESLint and Prettier for code consistency
  - Create .gitignore files for each project
  - Initialize public GitHub repository with README
  - _Requirements: 7.1, 7.2, 7.3, 10.1, 10.3_




- [x] 2. Set up SQLite database and data access layer


  - [x] 2.1 Create database schema and initialization script


    - Write SQL schema for users, products, reviews, and moderation_history tables
    - Create indexes for optimized queries



    - Write database initialization script (db:init command)
    - Seed database with ~30 sample products
    - Create hardcoded moderator account with hashed password
    - _Requirements: 9.1, 9.2, 4.3_
  


  - [x] 2.2 Implement database access layer with better-sqlite3
    - Install better-sqlite3 package for Node.js
    - Create Database class with connection management
    - Implement user CRUD operations (create, read by email/id)
    - Implement product operations (getAll, getById, search, updateStats)
    - Implement review operations (create, getByProduct, updateStatus, getPending)
    - Implement moderation history logging
    - Use prepared statements for SQL injection prevention
    - _Requirements: 1.1, 2.1, 3.2, 9.3_
  
  - [x]* 2.3 Write unit tests for database operations





    - Test user creation and retrieval
    - Test product queries and search functionality
    - Test review CRUD operations
    - Test moderation history logging
    - Use in-memory SQLite database for testing



    - _Requirements: 1.2, 2.2, 3.1_


- [x] 3. Implement backend API with Express and Netlify Functions



  - [x] 3.1 Set up Express server and Netlify Functions structure

    - Create Express app with CORS middleware

    - Configure Netlify Functions wrapper for Express
    - Set up environment variable loading
    - Create error handling middleware
    - Implement request logging middleware
    - _Requirements: 5.1, 8.1, 10.4_

  
  - [x] 3.2 Implement JWT authentication system

    - Install jsonwebtoken and bcrypt packages
    - Create JWT token generation (access + refresh tokens)
    - Implement token verification middleware
    - Create password hashing utilities with bcrypt
    - Implement token refresh endpoint
    - _Requirements: 4.1, 4.3, 4.4_
  
  - [x] 3.3 Implement Google OAuth with Passport.js


    - Install passport and passport-google-oauth20
    - Configure Google OAuth strategy
    - Create OAuth callback handler
    - Implement user creation/login for OAuth users
    - Generate JWT tokens after successful OAuth
    - _Requirements: 4.1, 4.2_
  
  - [x] 3.4 Create authentication endpoints



    - POST /api/auth/signup - Email/password registration
    - POST /api/auth/login - Email/password login
    - GET /api/auth/google - Initiate Google OAuth flow
    - GET /api/auth/google/callback - Handle OAuth callback
    - POST /api/auth/refresh - Refresh access token
    - POST /api/auth/logout - Invalidate tokens
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 3.5 Create product endpoints



    - GET /api/products - Get all products with pagination
    - GET /api/products/:id - Get product by ID
    - GET /api/products/search?q=query - Search products
    - Implement response caching headers
    - _Requirements: 2.1, 9.2, 9.4, 9.5_
  
  - [x] 3.6 Create review endpoints



    - GET /api/products/:id/reviews - Get approved reviews for product
    - POST /api/reviews - Submit new review (authenticated)
    - Validate review text length (10-1000 chars) and rating (1-5)
    - Set review status to 'pending' on creation
    - Update product average rating after review approval
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4_
  
  - [x] 3.7 Create moderation endpoints



    - GET /api/moderation/pending - Get pending reviews (moderator only)
    - PUT /api/moderation/:id/approve - Approve review (moderator only)
    - PUT /api/moderation/:id/reject - Reject review (moderator only)
    - DELETE /api/reviews/:id - Remove review (moderator only)
    - Implement role-based access control middleware
    - Log all moderation actions to moderation_history table
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  

  - [ ]* 3.8 Write integration tests for API endpoints
    - Test authentication flows (signup, login, OAuth)
    - Test product retrieval and search
    - Test review submission and approval workflow
    - Test moderation endpoints with role checks
    - Test error handling and validation
    - _Requirements: 1.5, 2.5, 3.5, 4.5_

- [x] 4. Build React web application

  - [x] 4.1 Set up React project structure and routing


    - Configure Vite with TypeScript and Tailwind CSS
    - Set up React Router with routes for all pages
    - Create layout components (Header, Footer, Navigation)
    - Implement responsive design breakpoints
    - _Requirements: 5.2, 5.3, 10.1_
  
  - [x] 4.2 Implement authentication UI and state management



    - Create login page with email/password and Google OAuth button
    - Create signup page with form validation
    - Implement AuthContext for global auth state
    - Store JWT tokens in localStorage
    - Implement automatic token refresh
    - Create protected route wrapper component
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 4.3 Create product list and search interface


    - Build product grid with responsive layout
    - Implement search bar with debounced input
    - Create category filter dropdown
    - Display product cards with image, name, and average rating
    - Implement loading states and error handling
    - Add pagination or infinite scroll
    - _Requirements: 2.1, 2.2, 2.3, 9.2, 9.4, 9.5_
  
  - [x] 4.4 Create product detail page


    - Display product information and images
    - Show average rating and total review count
    - List approved reviews sorted by date (newest first)
    - Implement "Write a Review" button for authenticated users
    - Handle empty state when no reviews exist
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 4.5 Build review submission form

    - Create star rating selector component (1-5 stars)
    - Build text area with character counter (10-1000 chars)
    - Implement real-time validation with error messages
    - Show success confirmation after submission
    - Redirect to product page after successful submission
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 4.6 Create moderation dashboard for moderators



    - Build pending reviews list with product context
    - Implement approve/reject action buttons
    - Create review detail modal with full information
    - Add optional reason field for rejection
    - Show moderation history table
    - Implement real-time refresh or polling for updates
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 4.7 Implement API integration with Axios and React Query


    - Set up Axios instance with base URL and interceptors
    - Add JWT token to Authorization header automatically
    - Implement React Query for data fetching and caching
    - Handle 401 errors with automatic token refresh
    - Create custom hooks for API calls (useProducts, useReviews, etc.)
    - _Requirements: 1.5, 2.1, 5.4_
  
  - [x] 4.8 Add error handling and loading states


    - Create error boundary component
    - Implement toast notifications for success/error messages
    - Add loading spinners for async operations
    - Handle network errors with retry mechanism
    - Display user-friendly error messages
    - _Requirements: 1.5, 4.5, 5.4_

  
  - [ ]* 4.9 Write component tests with React Testing Library
    - Test authentication flows (login, signup, logout)
    - Test product list rendering and filtering
    - Test review submission form validation
    - Test moderation dashboard actions
    - Test error handling and loading states
    - _Requirements: 5.5_


- [ ] 5. Build React Native mobile application
  - [x] 5.1 Set up React Native project structure


    - Initialize React Native project with TypeScript
    - Configure React Navigation for screen routing
    - Set up AsyncStorage for local data persistence
    - Configure Android build settings for Windows 10 Pro
    - _Requirements: 6.1, 6.2, 10.5_
  
  - [x] 5.2 Implement authentication screens

    - Create login screen with email/password inputs
    - Create signup screen with validation
    - Implement Google OAuth button (using react-native-google-signin)
    - Store JWT tokens in AsyncStorage
    - Implement automatic token refresh
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 5.3 Create product list and detail screens

    - Build product list with FlatList component
    - Implement search and filter functionality
    - Create product detail screen with reviews
    - Add pull-to-refresh for data updates
    - Implement offline caching with AsyncStorage
    - _Requirements: 2.1, 2.2, 2.3, 6.2, 6.5_
  
  - [x] 5.4 Build review submission screen

    - Create star rating component for mobile
    - Build text input with character counter
    - Implement form validation
    - Show success message after submission
    - Navigate back to product detail after submission
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 5.5 Create moderation screens for moderators

    - Build pending reviews list screen
    - Implement approve/reject actions
    - Create review detail modal
    - Add moderation history screen
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 5.6 Implement API integration and offline support


    - Set up Axios with base URL and token interceptors
    - Implement data caching with AsyncStorage
    - Add offline detection and indicator
    - Enable offline viewing of cached products and reviews
    - Sync pending actions when back online
    - _Requirements: 6.2, 6.3, 6.4, 6.5_
  

  - [x] 5.7 Style mobile app with native components

    - Implement consistent design system matching web app
    - Use React Native Paper or similar UI library
    - Ensure proper spacing and touch targets
    - Add loading indicators and error states
    - Test on Android emulator and physical device

    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ]* 5.8 Write mobile app tests with Jest and React Native Testing Library
    - Test authentication flows
    - Test product list and detail screens
    - Test review submission
    - Test offline functionality
    - _Requirements: 6.1_


- [ ] 6. Configure deployment and CI/CD
  - [x] 6.1 Set up Netlify deployment for web app


    - Create netlify.toml configuration file
    - Configure build command and publish directory
    - Set up Netlify Functions for API endpoints
    - Configure environment variables in Netlify dashboard
    - Set up redirects for SPA routing and API proxy
    - _Requirements: 5.1, 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [x] 6.2 Configure GitHub repository and CI/CD


    - Push code to public GitHub repository
    - Write comprehensive README with setup instructions
    - Add LICENSE file
    - Configure branch protection for main branch
    - Connect GitHub to Netlify for automatic deployments
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.2_
  

  - [x] 6.3 Prepare Android app for distribution



    - Configure Android build settings in build.gradle
    - Generate signed APK using Android Studio
    - Test APK on physical Android device
    - Create GitHub Release with APK download
    - Write installation instructions for Android users
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 6.4 Handle database persistence for production


    - Document SQLite limitations with Netlify Functions
    - Implement database backup strategy
    - Consider alternative: Deploy backend to Render/Railway with persistent storage
    - Update API URL configuration for production

    - Test production deployment end-to-end
    - _Requirements: 8.1, 8.2, 8.5_
  
  - [x]* 6.5 Write deployment documentation

    - Document Netlify deployment process
    - Document environment variable configuration
    - Document Android APK build process
    - Create troubleshooting guide
    - Document database initialization and seeding
    - _Requirements: 7.2, 10.3_

- [x] 7. Final integration and testing


  - [x] 7.1 Perform end-to-end testing on all platforms

    - Test complete user journey on web browser
    - Test complete user journey on Android app
    - Verify authentication works across platforms
    - Test moderation workflow from submission to approval
    - Verify data synchronization between web and mobile
    - _Requirements: 1.5, 2.5, 3.5, 4.5, 5.4, 5.5, 6.3_
  

  - [x] 7.2 Test on Windows 10 Pro development environment

    - Verify all npm commands work on Windows
    - Test Android Studio build process on Windows
    - Verify Netlify CLI works on Windows
    - Test database initialization on Windows
    - Document any Windows-specific setup steps
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  

  - [ ] 7.3 Verify cross-browser compatibility
    - Test web app on Chrome, Firefox, Edge, and Safari
    - Verify responsive design on various screen sizes
    - Test on mobile browsers (Chrome Mobile, Safari Mobile)
    - Fix any browser-specific issues
    - _Requirements: 5.2, 5.3, 5.5_


  
  - [ ] 7.4 Performance optimization and final polish
    - Optimize image loading and caching
    - Minimize bundle sizes for web and mobile
    - Add loading skeletons for better UX
    - Implement proper error boundaries
    - Add analytics tracking (optional)
    - _Requirements: 5.4, 6.3_
  

  - [x]* 7.5 Create user documentation


    - Write user guide for submitting reviews
    - Write moderator guide for review management
    - Create FAQ document
    - Add screenshots to README
    - _Requirements: 7.2_
