import { Router, Request, Response, NextFunction } from 'express';
import { userRepository } from '../database';
import { hashPassword, comparePassword, generateTokens, verifyRefreshToken, refreshAccessToken } from '../auth';
import { initiateGoogleAuth, handleGoogleCallback } from '../auth';
import { AppError } from '../middleware';
import { validateEmail, validatePassword, validateRequiredFields } from '../utils';
import type { AuthResponse, LoginCredentials, SignupCredentials } from '@feedback-system/shared';

const router = Router();

/**
 * POST /api/auth/signup
 * Register a new user with email and password
 */
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, displayName }: SignupCredentials = req.body;

    // Validate required fields
    validateRequiredFields(req.body, ['email', 'password', 'displayName']);

    // Validate email format
    if (!validateEmail(email)) {
      throw new AppError(400, 'INVALID_EMAIL', 'Invalid email format');
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      throw new AppError(400, 'WEAK_PASSWORD', passwordValidation.message!);
    }

    // Check if user already exists
    if (userRepository.userExists(email)) {
      throw new AppError(409, 'USER_EXISTS', 'A user with this email already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = userRepository.createUser({
      email,
      passwordHash,
      displayName,
      authProvider: 'email',
      role: 'user',
    });

    // Generate tokens
    const tokens = generateTokens(user);

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        authProvider: user.authProvider,
        createdAt: user.createdAt,
      },
      tokens,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: LoginCredentials = req.body;

    // Validate required fields
    validateRequiredFields(req.body, ['email', 'password']);

    // Get user by email
    const user = userRepository.getUserByEmail(email);
    if (!user) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    // Check if user uses OAuth
    if (user.authProvider !== 'email') {
      throw new AppError(400, 'OAUTH_USER', `This account uses ${user.authProvider} login. Please use social login.`);
    }

    // Get password hash
    const passwordHash = userRepository.getUserPasswordHash(email);
    if (!passwordHash) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    // Compare passwords
    const isValid = await comparePassword(password, passwordHash);
    if (!isValid) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    // Generate tokens
    const tokens = generateTokens(user);

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        authProvider: user.authProvider,
        createdAt: user.createdAt,
      },
      tokens,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/auth/google
 * Initiate Google OAuth flow
 */
router.get('/google', initiateGoogleAuth);

/**
 * GET /api/auth/google/callback
 * Handle Google OAuth callback
 */
router.get('/google/callback', handleGoogleCallback);

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
router.post('/refresh', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError(400, 'MISSING_REFRESH_TOKEN', 'Refresh token is required');
    }

    // Verify refresh token and generate new access token
    const newAccessToken = refreshAccessToken(refreshToken);

    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'REFRESH_TOKEN_EXPIRED') {
        return next(new AppError(401, 'REFRESH_TOKEN_EXPIRED', 'Refresh token has expired. Please login again.'));
      }
      if (error.message === 'INVALID_REFRESH_TOKEN') {
        return next(new AppError(401, 'INVALID_REFRESH_TOKEN', 'Invalid refresh token'));
      }
    }
    next(error);
  }
});

/**
 * POST /api/auth/logout
 * Logout (client-side token removal, no server action needed with JWT)
 */
router.post('/logout', (req: Request, res: Response) => {
  // With JWT, logout is handled client-side by removing tokens
  // This endpoint exists for consistency and future enhancements (e.g., token blacklist)
  res.json({
    message: 'Logged out successfully',
  });
});

export default router;
