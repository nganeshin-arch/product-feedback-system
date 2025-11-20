import { Router, Request, Response, NextFunction } from 'express';
import { reviewRepository, productRepository } from '../database';
import { authenticate } from '../auth';
import { AppError } from '../middleware';
import { validateReviewText, validateRating, validateRequiredFields } from '../utils';
import type { ReviewCreateInput } from '@feedback-system/shared';

const router = Router();

/**
 * GET /api/products/:productId/reviews
 * Get approved reviews for a specific product
 */
router.get('/products/:productId/reviews', (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = parseInt(req.params.productId);

    if (isNaN(productId) || productId < 1) {
      throw new AppError(400, 'INVALID_PRODUCT_ID', 'Invalid product ID');
    }

    // Check if product exists
    const product = productRepository.getProductById(productId);
    if (!product) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND', 'Product not found');
    }

    // Get only approved reviews
    const reviews = reviewRepository.getReviewsByProduct(productId, 'approved');

    res.set('Cache-Control', 'public, max-age=60'); // Cache for 1 minute
    res.json({ data: reviews });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/reviews
 * Submit a new review (authenticated users only)
 */
router.post('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, rating, reviewText } = req.body;
    const userId = req.user!.userId;
    const userName = req.user!.email.split('@')[0]; // Use email prefix as default name

    // Validate required fields
    validateRequiredFields(req.body, ['productId', 'rating', 'reviewText']);

    // Validate product ID
    const productIdNum = parseInt(productId);
    if (isNaN(productIdNum) || productIdNum < 1) {
      throw new AppError(400, 'INVALID_PRODUCT_ID', 'Invalid product ID');
    }

    // Check if product exists
    const product = productRepository.getProductById(productIdNum);
    if (!product) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND', 'Product not found');
    }

    // Validate rating
    const ratingValidation = validateRating(rating);
    if (!ratingValidation.valid) {
      throw new AppError(400, 'INVALID_RATING', ratingValidation.message!);
    }

    // Validate review text
    const reviewValidation = validateReviewText(reviewText);
    if (!reviewValidation.valid) {
      throw new AppError(400, 'INVALID_REVIEW_TEXT', reviewValidation.message!);
    }

    // Check if user has already reviewed this product
    if (reviewRepository.hasUserReviewedProduct(userId, productIdNum)) {
      throw new AppError(409, 'ALREADY_REVIEWED', 'You have already reviewed this product');
    }

    // Create review with 'pending' status
    const reviewInput: ReviewCreateInput = {
      productId: productIdNum,
      userId,
      userName,
      rating,
      reviewText: reviewText.trim(),
    };

    const review = reviewRepository.createReview(reviewInput);

    res.status(201).json({
      message: 'Review submitted successfully. It will be visible after moderation.',
      review,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
