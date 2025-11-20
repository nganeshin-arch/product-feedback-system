import { AppError } from '../middleware';

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  return { valid: true };
}

/**
 * Validate review text
 */
export function validateReviewText(text: string): { valid: boolean; message?: string } {
  if (text.length < 10) {
    return { valid: false, message: 'Review must be at least 10 characters long' };
  }
  if (text.length > 1000) {
    return { valid: false, message: 'Review must not exceed 1000 characters' };
  }
  return { valid: true };
}

/**
 * Validate rating value
 */
export function validateRating(rating: number): { valid: boolean; message?: string } {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { valid: false, message: 'Rating must be an integer between 1 and 5' };
  }
  return { valid: true };
}

/**
 * Sanitize string input (basic XSS prevention)
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate required fields
 */
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): void {
  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      400,
      'MISSING_FIELDS',
      `Missing required fields: ${missingFields.join(', ')}`
    );
  }
}
