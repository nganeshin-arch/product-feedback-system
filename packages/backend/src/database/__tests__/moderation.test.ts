import Database from 'better-sqlite3';
import { ModerationRepository } from '../moderation';
import { UserRepository } from '../users';
import { ProductRepository } from '../products';
import { ReviewRepository } from '../reviews';
import fs from 'fs';
import path from 'path';

describe('ModerationRepository', () => {
  let db: Database.Database;
  let moderationRepo: ModerationRepository;
  let userRepo: UserRepository;
  let productRepo: ProductRepository;
  let reviewRepo: ReviewRepository;
  const SCHEMA_PATH = path.join(__dirname, '../schema.sql');

  let moderatorId: number;
  let reviewId: number;

  beforeEach(() => {
    db = new Database(':memory:');
    db.pragma('foreign_keys = ON');

    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);

    jest.spyOn(require('../connection'), 'getDatabase').mockReturnValue(db);
    
    moderationRepo = new ModerationRepository();
    userRepo = new UserRepository();
    productRepo = new ProductRepository();
    reviewRepo = new ReviewRepository();

    // Create test moderator
    const moderator = userRepo.createUser({
      email: 'moderator@example.com',
      passwordHash: 'hashed_password',
      displayName: 'Test Moderator',
      authProvider: 'email',
      role: 'moderator',
    });
    moderatorId = moderator.id;

    // Create test user
    const user = userRepo.createUser({
      email: 'user@example.com',
      passwordHash: 'hashed_password',
      displayName: 'Test User',
      authProvider: 'email',
    });

    // Create test product
    const product = productRepo.createProduct({
      name: 'Test Product',
      description: 'A product for testing moderation',
      category: 'Electronics',
    });

    // Create test review
    const review = reviewRepo.createReview({
      productId: product.id,
      userId: user.id,
      userName: 'Test User',
      rating: 5,
      reviewText: 'This is a test review for moderation testing.',
    });
    reviewId = review.id;
  });

  afterEach(() => {
    db.close();
    jest.restoreAllMocks();
  });

  describe('logModerationAction', () => {
    it('should log an approval action', () => {
      const input = {
        reviewId,
        moderatorId,
        action: 'approve' as const,
      };

      const action = moderationRepo.logModerationAction(input);

      expect(action).toBeDefined();
      expect(action.id).toBeGreaterThan(0);
      expect(action.reviewId).toBe(reviewId);
      expect(action.moderatorId).toBe(moderatorId);
      expect(action.action).toBe('approve');
      expect(action.timestamp).toBeDefined();
    });

    it('should log a rejection action with reason', () => {
      const input = {
        reviewId,
        moderatorId,
        action: 'reject' as const,
        reason: 'Inappropriate content',
      };

      const action = moderationRepo.logModerationAction(input);

      expect(action.action).toBe('reject');
      expect(action.reason).toBe('Inappropriate content');
    });

    it('should log a remove action', () => {
      const input = {
        reviewId,
        moderatorId,
        action: 'remove' as const,
        reason: 'Spam',
      };

      const action = moderationRepo.logModerationAction(input);

      expect(action.action).toBe('remove');
      expect(action.reason).toBe('Spam');
    });
  });

  describe('getModerationActionById', () => {
    it('should retrieve moderation action by ID', () => {
      const created = moderationRepo.logModerationAction({
        reviewId,
        moderatorId,
        action: 'approve',
      });

      const found = moderationRepo.getModerationActionById(created.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
      expect(found?.action).toBe('approve');
    });

    it('should return null for non-existent ID', () => {
      const found = moderationRepo.getModerationActionById(99999);
      expect(found).toBeNull();
    });
  });

  describe('getModerationHistoryByReview', () => {
    beforeEach(() => {
      // Log multiple actions for the same review
      moderationRepo.logModerationAction({
        reviewId,
        moderatorId,
        action: 'approve',
      });

      // Simulate a later rejection
      setTimeout(() => {
        moderationRepo.logModerationAction({
          reviewId,
          moderatorId,
          action: 'reject',
          reason: 'Changed mind',
        });
      }, 10);
    });

    it('should retrieve all actions for a review', () => {
      const history = moderationRepo.getModerationHistoryByReview(reviewId);
      expect(history.length).toBeGreaterThanOrEqual(1);
      expect(history.every(h => h.reviewId === reviewId)).toBe(true);
    });

    it('should sort actions by timestamp (newest first)', () => {
      const history = moderationRepo.getModerationHistoryByReview(reviewId);
      for (let i = 0; i < history.length - 1; i++) {
        expect(history[i].timestamp >= history[i + 1].timestamp).toBe(true);
      }
    });
  });

  describe('getModerationHistoryByModerator', () => {
    beforeEach(() => {
      // Create another review
      const user = userRepo.getUserByEmail('user@example.com');
      const product = productRepo.getAllProducts()[0];
      
      const review2 = reviewRepo.createReview({
        productId: product.id,
        userId: user!.id,
        userName: 'Test User',
        rating: 4,
        reviewText: 'Another test review for moderation history.',
      });

      // Log actions
      moderationRepo.logModerationAction({
        reviewId,
        moderatorId,
        action: 'approve',
      });

      moderationRepo.logModerationAction({
        reviewId: review2.id,
        moderatorId,
        action: 'reject',
        reason: 'Test rejection',
      });
    });

    it('should retrieve all actions by a moderator', () => {
      const history = moderationRepo.getModerationHistoryByModerator(moderatorId);
      expect(history.length).toBeGreaterThanOrEqual(2);
      expect(history.every(h => h.moderatorId === moderatorId)).toBe(true);
    });

    it('should support limit parameter', () => {
      const history = moderationRepo.getModerationHistoryByModerator(moderatorId, 1);
      expect(history).toHaveLength(1);
    });
  });

  describe('getAllModerationHistory', () => {
    beforeEach(() => {
      moderationRepo.logModerationAction({
        reviewId,
        moderatorId,
        action: 'approve',
      });

      moderationRepo.logModerationAction({
        reviewId,
        moderatorId,
        action: 'reject',
        reason: 'Test',
      });
    });

    it('should retrieve all moderation actions', () => {
      const history = moderationRepo.getAllModerationHistory();
      expect(history.length).toBeGreaterThanOrEqual(2);
    });

    it('should support limit parameter', () => {
      const history = moderationRepo.getAllModerationHistory(1);
      expect(history).toHaveLength(1);
    });
  });

  describe('getModeratorStats', () => {
    beforeEach(() => {
      // Create multiple reviews and actions
      const user = userRepo.getUserByEmail('user@example.com');
      const product = productRepo.getAllProducts()[0];

      for (let i = 0; i < 3; i++) {
        const review = reviewRepo.createReview({
          productId: product.id,
          userId: user!.id,
          userName: 'Test User',
          rating: 5,
          reviewText: `Test review ${i} for statistics testing.`,
        });

        const action = i === 0 ? 'approve' : i === 1 ? 'reject' : 'remove';
        moderationRepo.logModerationAction({
          reviewId: review.id,
          moderatorId,
          action: action as any,
        });
      }
    });

    it('should calculate moderator statistics', () => {
      const stats = moderationRepo.getModeratorStats(moderatorId);

      expect(stats.totalActions).toBeGreaterThanOrEqual(3);
      expect(stats.approvals).toBeGreaterThanOrEqual(1);
      expect(stats.rejections).toBeGreaterThanOrEqual(1);
      expect(stats.removals).toBeGreaterThanOrEqual(1);
    });

    it('should return zero stats for moderator with no actions', () => {
      const newModerator = userRepo.createUser({
        email: 'newmod@example.com',
        passwordHash: 'hashed_password',
        displayName: 'New Moderator',
        authProvider: 'email',
        role: 'moderator',
      });

      const stats = moderationRepo.getModeratorStats(newModerator.id);

      expect(stats.totalActions).toBe(0);
      expect(stats.approvals).toBe(0);
      expect(stats.rejections).toBe(0);
      expect(stats.removals).toBe(0);
    });
  });
});
