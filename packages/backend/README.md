# Product Feedback Backend API

Express.js backend API with SQLite database for the Product Feedback System.

## Features

- JWT authentication with access and refresh tokens
- Google OAuth integration
- SQLite database with better-sqlite3
- RESTful API endpoints
- Netlify Functions support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Initialize database:
```bash
npm run db:init
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search?q=query` - Search products

### Reviews
- `GET /api/products/:id/reviews` - Get approved reviews
- `POST /api/reviews` - Submit review (authenticated)

### Moderation
- `GET /api/moderation/pending` - Get pending reviews (moderator)
- `PUT /api/moderation/:id/approve` - Approve review (moderator)
- `PUT /api/moderation/:id/reject` - Reject review (moderator)
- `DELETE /api/reviews/:id` - Remove review (moderator)

## Database

SQLite database with tables:
- `users` - User accounts
- `products` - Product catalog (~30 items)
- `reviews` - User reviews and ratings
- `moderation_history` - Moderation actions log

## Default Accounts

**Moderator:**
- Email: moderator@example.com
- Password: admin123

**Test User:**
- Email: user@example.com
- Password: user123
