import { Router, Request, Response, NextFunction } from 'express';
import { reviewRepository, productRepository, moderationRepository } from '../database';
import { authenticate, requireModerator } from '../auth';
import { AppError } from '../middleware';
import type { ModerationActionCreateInput } from '@feedback-system/shared';

const router = Router();

// All moderation routes require authentication and moderator role
router.use(authenticate, requireModerator);

/**
 * GET /api/moderation/pending
 * Get all pending reviews (moderator only)
 */
router.get('/pending', (req: Request, res: Response, next: NextFunction) => {
  try {
    const pendingReviews = reviewRepository.getPendingReviews();

    // Enrich with product information
    const enrichedReviews = pendingReviews.map((review) => {
      const product = productRepository.getProductById(review.productId);
      return {
        ...review,
        product: product
          ? {
              id: product.id,
              name: product.name,
              category: product.category,
            }
          : null,
      };
    });

    res.json({ data: enrichedReviews });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/moderation/:id/approve
 * Approve a review (moderator only)
 */
router.put('/:id/approve', (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = parseInt(req.params.id);
    const moderatorId = req.user!.userId;

    if (isNaN(reviewId) || reviewId < 1) {
      throw new AppError(400, 'INVALID_REVIEW_ID', 'Invalid review ID');
    }

    // Get the review
    const review = reviewRepository.getReviewById(reviewId);
    if (!review) {
      throw new AppError(404, 'REVIEW_NOT_FOUND', 'Review not found');
    }

    // Check if already moderated
    if (review.status !== 'pending') {
      throw new AppError(400, 'ALREADY_MODERATED', `Review is already ${review.status}`);
    }

    // Update review status to approved
    reviewRepository.updateReviewStatus(reviewId, {
      status: 'approved',
      moderatorId,
      moderatedAt: new Date(),
    });

    // Update product statistics (average rating and total reviews)
    productRepository.updateProductStats(review.productId);

    // Log moderation action
    const moderationAction: ModerationActionCreateInput = {
      reviewId,
      moderatorId,
      action: 'approve',
    };
    moderationRepository.logModerationAction(moderationAction);

    res.json({
      message: 'Review approved successfully',
      reviewId,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/moderation/:id/reject
 * Reject a review (moderator only)
 */
router.put('/:id/reject', (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = parseInt(req.params.id);
    const moderatorId = req.user!.userId;
    const { reason } = req.body;

    if (isNaN(reviewId) || reviewId < 1) {
      throw new AppError(400, 'INVALID_REVIEW_ID', 'Invalid review ID');
    }

    // Get the review
    const review = reviewRepository.getReviewById(reviewId);
    if (!review) {
      throw new AppError(404, 'REVIEW_NOT_FOUND', 'Review not found');
    }

    // Check if already moderated
    if (review.status !== 'pending') {
      throw new AppError(400, 'ALREADY_MODERATED', `Review is already ${review.status}`);
    }

    // Update review status to rejected
    reviewRepository.updateReviewStatus(reviewId, {
      status: 'rejected',
      moderatorId,
      moderatedAt: new Date(),
    });

    // Log moderation action with optional reason
    const moderationAction: ModerationActionCreateInput = {
      reviewId,
      moderatorId,
      action: 'reject',
      reason: reason || undefined,
    };
    moderationRepository.logModerationAction(moderationAction);

    res.json({
      message: 'Review rejected successfully',
      reviewId,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/reviews/:id
 * Remove a review (moderator only)
 */
router.delete('/reviews/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = parseInt(req.params.id);
    const moderatorId = req.user!.userId;
    const { reason } = req.body;

    if (isNaN(reviewId) || reviewId < 1) {
      throw new AppError(400, 'INVALID_REVIEW_ID', 'Invalid review ID');
    }

    // Get the review
    const review = reviewRepository.getReviewById(reviewId);
    if (!review) {
      throw new AppError(404, 'REVIEW_NOT_FOUND', 'Review not found');
    }

    const productId = review.productId;

    // Log moderation action before deletion
    const moderationAction: ModerationActionCreateInput = {
      reviewId,
      moderatorId,
      action: 'remove',
      reason: reason || undefined,
    };
    moderationRepository.logModerationAction(moderationAction);

    // Delete the review
    reviewRepository.deleteReview(reviewId);

    // Update product statistics if review was approved
    if (review.status === 'approved') {
      productRepository.updateProductStats(productId);
    }

    res.json({
      message: 'Review removed successfully',
      reviewId,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/moderation/history
 * Get moderation history (moderator only)
 * Query params: limit (optional)
 */
router.get('/history', (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    if (limit < 1 || limit > 200) {
      throw new AppError(400, 'INVALID_LIMIT', 'Limit must be between 1 and 200');
    }

    const history = moderationRepository.getAllModerationHistory(limit);

    res.json({ data: history });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/moderation/stats
 * Get moderation statistics for current moderator
 */
router.get('/stats', (req: Request, res: Response, next: NextFunction) => {
  try {
    const moderatorId = req.user!.userId;
    const stats = moderationRepository.getModeratorStats(moderatorId);

    res.json(stats);
  } catch (error) {
    next(error);
  }
});

export default router;
