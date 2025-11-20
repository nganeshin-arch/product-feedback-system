import express, { Express } from 'express';
import dotenv from 'dotenv';
import { corsMiddleware, errorHandler, notFoundHandler, requestLogger } from './middleware';
import { passport, configurePassport } from './auth';

// Load environment variables
dotenv.config();

// Configure Passport
configurePassport();

// Create Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(passport.initialize());

// Request logging (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use(requestLogger);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import reviewRoutes from './routes/reviews';
import moderationRoutes from './routes/moderation';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', reviewRoutes); // Mounted at /api for /api/products/:id/reviews
app.use('/api/moderation', moderationRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

export default app;
