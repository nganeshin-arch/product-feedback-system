import { Request, Response, NextFunction } from 'express';
import passport from './passport';
import { generateTokens } from './jwt';
import { AppError } from '../middleware';
import type { User, AuthResponse } from '@feedback-system/shared';

/**
 * Initiate Google OAuth flow
 */
export function initiateGoogleAuth(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })(req, res, next);
}

/**
 * Handle Google OAuth callback
 */
export function handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'google',
    { session: false },
    (err: Error | null, user: User | false, info: any) => {
      if (err) {
        console.error('Google OAuth error:', err);
        
        // Redirect to frontend with error
        const errorMessage = encodeURIComponent(err.message || 'Authentication failed');
        const redirectUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        return res.redirect(`${redirectUrl}/login?error=${errorMessage}`);
      }

      if (!user) {
        const errorMessage = encodeURIComponent('Authentication failed');
        const redirectUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        return res.redirect(`${redirectUrl}/login?error=${errorMessage}`);
      }

      try {
        // Generate JWT tokens
        const tokens = generateTokens(user);

        // Redirect to frontend with tokens
        const redirectUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const params = new URLSearchParams({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          userId: user.id.toString(),
          email: user.email,
          displayName: user.displayName,
          role: user.role,
        });

        res.redirect(`${redirectUrl}/auth/callback?${params.toString()}`);
      } catch (error) {
        console.error('Token generation error:', error);
        const errorMessage = encodeURIComponent('Failed to generate authentication tokens');
        const redirectUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        return res.redirect(`${redirectUrl}/login?error=${errorMessage}`);
      }
    }
  )(req, res, next);
}

/**
 * Alternative: Return tokens as JSON (for mobile apps)
 */
export function handleGoogleCallbackJSON(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'google',
    { session: false },
    (err: Error | null, user: User | false, info: any) => {
      if (err) {
        return next(new AppError(401, 'OAUTH_ERROR', err.message || 'Authentication failed'));
      }

      if (!user) {
        return next(new AppError(401, 'OAUTH_FAILED', 'Authentication failed'));
      }

      try {
        // Generate JWT tokens
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
        return next(new AppError(500, 'TOKEN_GENERATION_FAILED', 'Failed to generate tokens'));
      }
    }
  )(req, res, next);
}
