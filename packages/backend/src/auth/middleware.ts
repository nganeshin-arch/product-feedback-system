import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, JWTPayload } from './jwt';
import { AppError } from '../middleware';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

/**
 * Middleware to authenticate requests using JWT
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(401, 'NO_TOKEN', 'No authentication token provided');
    }

    // Extract token from "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new AppError(401, 'INVALID_TOKEN_FORMAT', 'Invalid token format. Use: Bearer <token>');
    }

    const token = parts[1];
    const payload = verifyAccessToken(token);

    // Attach user info to request
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    const message = error instanceof Error ? error.message : 'Authentication failed';
    
    if (message === 'TOKEN_EXPIRED') {
      return next(new AppError(401, 'TOKEN_EXPIRED', 'Access token has expired'));
    }
    if (message === 'INVALID_TOKEN') {
      return next(new AppError(401, 'INVALID_TOKEN', 'Invalid access token'));
    }

    next(new AppError(401, 'AUTHENTICATION_FAILED', 'Authentication failed'));
  }
}

/**
 * Middleware to check if user is a moderator
 */
export function requireModerator(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return next(new AppError(401, 'UNAUTHORIZED', 'Authentication required'));
  }

  if (req.user.role !== 'moderator') {
    return next(
      new AppError(403, 'FORBIDDEN', 'This action requires moderator privileges')
    );
  }

  next();
}

/**
 * Optional authentication - doesn't fail if no token provided
 */
export function optionalAuthenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      const token = parts[1];
      const payload = verifyAccessToken(token);
      req.user = payload;
    }

    next();
  } catch {
    // Ignore errors for optional auth
    next();
  }
}
