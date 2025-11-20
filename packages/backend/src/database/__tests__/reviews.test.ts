import Database from 'better-sqlite3';
import { ReviewRepository } from '../reviews';
import { UserRepository } from '../users';
import { ProductRepository } from '../products';
import fs from 'fs';
import path from 'path';

describe('ReviewRepository', () => {
  let db: Database.Database;
  let reviewRepo: ReviewRepository;
  let userRepo: UserRepository;
  let productRepo: ProductRepository;
  const SCHEMA_PATH = path.join(__dirname, '../schema.sql');

  let testUserId: number;
  let testProductId: number;

  beforeEach(() => {
    db = new Database(':memory:');
    db.pragma('foreign_keys = ON');

    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);

    jest.spyOn(require('../connection'), 'getDatabase').mockReturnValue(db);
    
    reviewRepo = new ReviewRepository();
    userRepo = new UserRepository();
    productRepo = new ProductRepository();

    // Create test user and product
    const user = userRepo.createUser({
      email: 'reviewer@example.com',
      passwordHash: 'hashed_password',
      displayName: 'Test Reviewer',
      authProvider: 'email',
    });
    testUserId = user.id;

    const product = productRepo.createProduct({
      name: 'Test Product',
      description: 'A product for testing reviews',
      category: 'Electronics',
    });
    testProductId = product.id;
  });

  afterEach(() => {
    db.close();
    jest.restoreAllMocks();
  });

  describe('createReview', () => {
    it('should create a new review with pending status', () => {
      const input = {
        productId: testProductId,
        userId: testUserId,
        userName: 'Test Reviewer',
        rating: 5,
        reviewText: 'This is a great product! Highly recommended for everyone.',
      };

      const review = reviewRepo.createReview(input);

      expect(review).toBeDefined();
      expect(review.id).toBeGreaterThan(0);
      expect(review.productId).toBe(testProductId);
      expect(review.userId).toBe(testUserId);
      expect(review.rating).toBe(5);
      expect(review.status).toBe('pending');
    });

    it('should enforce rating constraints (1-5)', () => {
      const input = {
        productId: testProductId,
        userId: testUserId,
        userName: 'Test Reviewer',
        rating: 6,
        reviewText: 'This is a test review with invalid rating.',
      };

      expect(() => reviewRepo.createReview(input)).toThrow();
    });

    it('should enforce review text length constraints', () => {
      const shortInput = {
        productId: testProductId,
        userId: testUserId,
        userName: 'Test Reviewer',
        rating: 5,
        reviewText: 'Short',
      };

      expect(() => reviewRepo.createReview(shortInput)).toThrow();

      const longInput = {
        productId: testProductId,
        userId: testUserId,
        userName: 'Test Reviewer',
        rating: 5,
        reviewText: 'a'.repeat(1001),
      };

      expect(() => reviewRepo.createReview(longInput)).toThrow();
    });
  });

  describe('getReviewById', () => {
    it('should retrieve review by ID', () => {
      const created = reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Test Reviewer',
        rating: 4,
        reviewText: 'Good product with minor issues but overall satisfied.',
      });

      const found = reviewRepo.getReviewById(created.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
      expect(found?.rating).toBe(4);
    });

    it('should return null for non-existent ID', () => {
      const found = reviewRepo.getReviewById(99999);
      expect(found).toBeNull();
    });
  });

  describe('getReviewsByProduct', () => {
    beforeEach(() => {
      // Create multiple reviews
      reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer 1',
        rating: 5,
        reviewText: 'Excellent product! Exceeded my expectations completely.',
      });

      reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer 2',
        rating: 4,
        reviewText: 'Very good product, would recommend to friends.',
      });

      // Approve one review
      const reviews = reviewRepo.getPendingReviews();
      if (reviews.length > 0) {
        reviewRepo.updateReviewStatus(reviews[0].id, {
          status: 'approved',
          moderatorId: testUserId,
          moderatedAt: new Date(),
        });
      }
    });

    it('should retrieve all reviews for a product', () => {
      const reviews = reviewRepo.getReviewsByProduct(testProductId);
      expect(reviews.length).toBeGreaterThanOrEqual(2);
    });

    it('should filter reviews by status', () => {
      const approved = reviewRepo.getReviewsByProduct(testProductId, 'approved');
      expect(approved).toHaveLength(1);

      const pending = reviewRepo.getReviewsByProduct(testProductId, 'pending');
      expect(pending).toHaveLength(1);
    });

    it('should sort reviews by date (newest first)', () => {
      const reviews = reviewRepo.getReviewsByProduct(testProductId);
      for (let i = 0; i < reviews.length - 1; i++) {
        expect(reviews[i].createdAt >= reviews[i + 1].createdAt).toBe(true);
      }
    });
  });

  describe('getPendingReviews', () => {
    it('should retrieve only pending reviews', () => {
      reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer',
        rating: 5,
        reviewText: 'Pending review that needs moderation approval.',
      });

      const pending = reviewRepo.getPendingReviews();
      expect(pending.length).toBeGreaterThan(0);
      expect(pending.every(r => r.status === 'pending')).toBe(true);
    });
  });

  describe('updateReviewStatus', () => {
    it('should update review status to approved', () => {
      const review = reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer',
        rating: 5,
        reviewText: 'Review to be approved by moderator.',
      });

      reviewRepo.updateReviewStatus(review.id, {
        status: 'approved',
        moderatorId: testUserId,
        moderatedAt: new Date(),
      });

      const updated = reviewRepo.getReviewById(review.id);
      expect(updated?.status).toBe('approved');
      expect(updated?.moderatorId).toBe(testUserId);
      expect(updated?.moderatedAt).toBeDefined();
    });

    it('should update review status to rejected', () => {
      const review = reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer',
        rating: 1,
        reviewText: 'Review to be rejected by moderator.',
      });

      reviewRepo.updateReviewStatus(review.id, {
        status: 'rejected',
        moderatorId: testUserId,
        moderatedAt: new Date(),
      });

      const updated = reviewRepo.getReviewById(review.id);
      expect(updated?.status).toBe('rejected');
    });
  });

  describe('deleteReview', () => {
    it('should delete a review', () => {
      const review = reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer',
        rating: 3,
        reviewText: 'Review to be deleted by moderator.',
      });

      reviewRepo.deleteReview(review.id);

      const found = reviewRepo.getReviewById(review.id);
      expect(found).toBeNull();
    });
  });

  describe('hasUserReviewedProduct', () => {
    it('should return true if user has reviewed product', () => {
      reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer',
        rating: 5,
        reviewText: 'User has already reviewed this product.',
      });

      const hasReviewed = reviewRepo.hasUserReviewedProduct(testUserId, testProductId);
      expect(hasReviewed).toBe(true);
    });

    it('should return false if user has not reviewed product', () => {
      const hasReviewed = reviewRepo.hasUserReviewedProduct(testUserId, testProductId);
      expect(hasReviewed).toBe(false);
    });

    it('should ignore rejected reviews', () => {
      const review = reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer',
        rating: 5,
        reviewText: 'Review that will be rejected.',
      });

      reviewRepo.updateReviewStatus(review.id, {
        status: 'rejected',
        moderatorId: testUserId,
        moderatedAt: new Date(),
      });

      const hasReviewed = reviewRepo.hasUserReviewedProduct(testUserId, testProductId);
      expect(hasReviewed).toBe(false);
    });
  });

  describe('getReviewCountByStatus', () => {
    beforeEach(() => {
      reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer 1',
        rating: 5,
        reviewText: 'First pending review for counting.',
      });

      reviewRepo.createReview({
        productId: testProductId,
        userId: testUserId,
        userName: 'Reviewer 2',
        rating: 4,
        reviewText: 'Second pending review for counting.',
      });
    });

    it('should count reviews by status', () => {
      const pendingCount = reviewRepo.getReviewCountByStatus('pending');
      expect(pendingCount).toBe(2);

      const approvedCount = reviewRepo.getReviewCountByStatus('approved');
      expect(approvedCount).toBe(0);
    });
  });
});
