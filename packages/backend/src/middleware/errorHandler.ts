import { Request, Response, NextFunction } from 'express';
import type { ApiError } from '@feedback-system/shared';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err);

  if (err instanceof AppError) {
    const errorResponse: { error: ApiError } = {
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    };
    return res.status(err.statusCode).json(errorResponse);
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    const errorResponse: { error: ApiError } = {
      error: {
        code: 'VALIDATION_ERROR',
        message: err.message,
      },
    };
    return res.status(400).json(errorResponse);
  }

  // Handle database errors
  if (err.message.includes('UNIQUE constraint failed')) {
    const errorResponse: { error: ApiError } = {
      error: {
        code: 'DUPLICATE_ENTRY',
        message: 'A record with this information already exists',
      },
    };
    return res.status(409).json(errorResponse);
  }

  // Default error response
  const errorResponse: { error: ApiError } = {
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message,
    },
  };
  res.status(500).json(errorResponse);
}

export function notFoundHandler(req: Request, res: Response) {
  const errorResponse: { error: ApiError } = {
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  };
  res.status(404).json(errorResponse);
}
