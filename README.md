# Product Feedback System

A full-stack application enabling users to submit and view product reviews and ratings, with moderation capabilities. Built for deployment on web browsers (via Netlify) and Android mobile devices.

[![CI](https://github.com/yourusername/product-feedback-system/workflows/CI/badge.svg)](https://github.com/yourusername/product-feedback-system/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🌐 **Web Application**: React-based SPA with responsive design
- 📱 **Mobile Application**: React Native Android app (structure ready)
- 🔐 **Authentication**: JWT-based auth with Google OAuth and email/password
- ⭐ **Reviews & Ratings**: Users can submit feedback (1-5 stars with text reviews)
- 👮 **Moderation**: Moderators can approve, reject, or remove reviews
- 📦 **~30 Products**: Pre-seeded product catalog
- 💾 **SQLite Database**: Lightweight, file-based data storage
- 🚀 **Auto-deploy**: CI/CD with GitHub Actions and Netlify

## 🛠 Technology Stack

### Frontend (Web)
- React 18.x with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Axios + React Query for API calls
- Error boundaries and toast notifications

### Frontend (Mobile)
- React Native 0.72+ with TypeScript
- React Navigation
- AsyncStorage for offline caching

### Backend
- Node.js 18.x LTS
- Express.js 4.x
- SQLite3 (better-sqlite3)
- JWT authentication (access + refresh tokens)
- Passport.js for OAuth
- Netlify Functions

## 📋 Prerequisites

- Node.js 18.x LTS or higher
- npm 9.x or higher
- Git
- Android Studio (for mobile development)
- Visual Studio Code (recommended)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/product-feedback-system.git
cd product-feedback-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Database

```bash
npm run db:init
```

This creates the SQLite database with:
- Database schema (users, products, reviews, moderation_history)
- ~30 sample products across 4 categories
- Hardcoded moderator account
- Sample user accounts and reviews

### 4. Configure Environment Variables

**packages/backend/.env**
```env
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8888/api/auth/google/callback
DATABASE_PATH=./database/feedback.db
NODE_ENV=development
```

**packages/web/.env**
```env
VITE_API_URL=http://localhost:8888/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

See `.env.example` for all variables.

### 5. Run Development Server

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

## 📁 Project Structure

```
product-feedback-system/
├── packages/
│   ├── web/              # React web application
│   │   ├── src/
│   │   │   ├── components/  # Reusable components
│   │   │   ├── contexts/    # React contexts
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── lib/         # Utilities (axios)
│   │   │   └── pages/       # Page components
│   │   └── package.json
│   ├── mobile/           # React Native mobile app
│   ├── backend/          # Express API + Netlify Functions
│   │   ├── src/
│   │   │   ├── auth/        # Authentication logic
│   │   │   ├── database/    # Database layer
│   │   │   ├── middleware/  # Express middleware
│   │   │   ├── routes/      # API routes
│   │   │   └── utils/       # Utilities
│   │   ├── scripts/         # Database scripts
│   │   └── package.json
│   └── shared/           # Shared TypeScript types
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── .kiro/
│   └── specs/            # Project specifications
├── netlify.toml          # Netlify configuration
├── package.json          # Root package.json (workspaces)
└── README.md
```

## 📜 Available Scripts

### Root Level
- `npm run dev` - Start web development server
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier
- `npm run db:init` - Initialize SQLite database

### Package Level
- `npm run dev:web` - Start web dev server
- `npm run dev:mobile` - Start mobile dev server
- `npm run build:web` - Build web application
- `npm run build:mobile` - Build mobile application

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/categories` - Get categories

### Reviews
- `GET /api/products/:id/reviews` - Get approved reviews
- `POST /api/reviews` - Submit review (authenticated)

### Moderation (Moderator only)
- `GET /api/moderation/pending` - Get pending reviews
- `PUT /api/moderation/:id/approve` - Approve review
- `PUT /api/moderation/:id/reject` - Reject review
- `DELETE /api/moderation/reviews/:id` - Remove review
- `GET /api/moderation/history` - Get moderation history
- `GET /api/moderation/stats` - Get moderator stats

## 🔐 Default Credentials

**Moderator Account:**
- Email: `moderator@example.com`
- Password: `admin123`

**Test User Account:**
- Email: `user@example.com`
- Password: `user123`

## 🚀 Deployment

### Quick Deploy to Netlify (5 minutes)

```bash
# 1. Push to GitHub
git push origin main

# 2. Generate secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 3. Deploy on Netlify
# - Go to https://app.netlify.com/
# - Import from GitHub
# - Set environment variables
# - Deploy!
```

**📚 Deployment Guides:**
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 5-minute quick start ⚡
- **[deploy-to-netlify.md](deploy-to-netlify.md)** - Step-by-step guide 🎯
- **[NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md)** - Comprehensive guide 📋
- **[DEPLOYMENT_INDEX.md](DEPLOYMENT_INDEX.md)** - All deployment docs 📚

**Test Credentials:**
- User: `user@example.com` / `user123`
- Moderator: `moderator@example.com` / `admin123`

## 🧪 Testing

```bash
# Run linting
npm run lint

# Format code
npm run format
```

## 📖 Documentation

- [Implementation Status](IMPLEMENTATION_STATUS.md) - Current progress
- [Deployment Guide](DEPLOYMENT.md) - Deployment instructions
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Design Document](.kiro/specs/product-feedback-system/design.md) - System design
- [Requirements](.kiro/specs/product-feedback-system/requirements.md) - Requirements spec

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React, Express, and SQLite
- Deployed on Netlify
- Authentication with JWT and Passport.js
- UI styled with Tailwind CSS

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the implementation status

## 🎯 Roadmap

- [x] Backend API with authentication
- [x] Web application with core features
- [x] Review submission and moderation
- [x] Deployment configuration
- [ ] React Native mobile app implementation
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] iOS mobile app

---

Made with ❤️ for product feedback management

<!-- Build trigger: 2025-11-21 v2 -->
