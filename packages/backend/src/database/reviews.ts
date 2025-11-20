import { getDatabase } from './connection';
import type { Review, ReviewCreateInput, ReviewUpdateInput } from '@feedback-system/shared';

export class ReviewRepository {
  /**
   * Create a new review
   */
  createReview(input: ReviewCreateInput): Review {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO reviews (product_id, user_id, user_name, rating, review_text, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `);

    const info = stmt.run(
      input.productId,
      input.userId,
      input.userName,
      input.rating,
      input.reviewText
    );

    const review = this.getReviewById(Number(info.lastInsertRowid));
    if (!review) {
      throw new Error('Failed to create review');
    }

    return review;
  }

  /**
   * Get review by ID
   */
  getReviewById(id: number): Review | null {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, product_id as productId, user_id as userId, user_name as userName,
             rating, review_text as reviewText, status,
             created_at as createdAt, moderated_at as moderatedAt, moderator_id as moderatorId
      FROM reviews
      WHERE id = ?
    `);

    const row = stmt.get(id) as any;
    if (!row) return null;

    return {
      id: row.id,
      productId: row.productId,
      userId: row.userId,
      userName: row.userName,
      rating: row.rating,
      reviewText: row.reviewText,
      status: row.status,
      createdAt: new Date(row.createdAt),
      moderatedAt: row.moderatedAt ? new Date(row.moderatedAt) : undefined,
      moderatorId: row.moderatorId || undefined,
    };
  }

  /**
   * Get reviews for a specific product
   */
  getReviewsByProduct(productId: number, status?: string): Review[] {
    const db = getDatabase();
    let query = `
      SELECT id, product_id as productId, user_id as userId, user_name as userName,
             rating, review_text as reviewText, status,
             created_at as createdAt, moderated_at as moderatedAt, moderator_id as moderatorId
      FROM reviews
      WHERE product_id = ?
    `;

    const params: any[] = [productId];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    const rows = stmt.all(...params) as any[];

    return rows.map((row) => ({
      id: row.id,
      productId: row.productId,
      userId: row.userId,
      userName: row.userName,
      rating: row.rating,
      reviewText: row.reviewText,
      status: row.status,
      createdAt: new Date(row.createdAt),
      moderatedAt: row.moderatedAt ? new Date(row.moderatedAt) : undefined,
      moderatorId: row.moderatorId || undefined,
    }));
  }

  /**
   * Get all pending reviews
   */
  getPendingReviews(): Review[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, product_id as productId, user_id as userId, user_name as userName,
             rating, review_text as reviewText, status,
             created_at as createdAt, moderated_at as moderatedAt, moderator_id as moderatorId
      FROM reviews
      WHERE status = 'pending'
      ORDER BY created_at ASC
    `);

    const rows = stmt.all() as any[];

    return rows.map((row) => ({
      id: row.id,
      productId: row.productId,
      userId: row.userId,
      userName: row.userName,
      rating: row.rating,
      reviewText: row.reviewText,
      status: row.status,
      createdAt: new Date(row.createdAt),
      moderatedAt: row.moderatedAt ? new Date(row.moderatedAt) : undefined,
      moderatorId: row.moderatorId || undefined,
    }));
  }

  /**
   * Get reviews by user
   */
  getReviewsByUser(userId: number): Review[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, product_id as productId, user_id as userId, user_name as userName,
             rating, review_text as reviewText, status,
             created_at as createdAt, moderated_at as moderatedAt, moderator_id as moderatorId
      FROM reviews
      WHERE user_id = ?
      ORDER BY created_at DESC
    `);

    const rows = stmt.all(userId) as any[];

    return rows.map((row) => ({
      id: row.id,
      productId: row.productId,
      userId: row.userId,
      userName: row.userName,
      rating: row.rating,
      reviewText: row.reviewText,
      status: row.status,
      createdAt: new Date(row.createdAt),
      moderatedAt: row.moderatedAt ? new Date(row.moderatedAt) : undefined,
      moderatorId: row.moderatorId || undefined,
    }));
  }

  /**
   * Update review status (approve/reject)
   */
  updateReviewStatus(id: number, update: ReviewUpdateInput): void {
    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE reviews
      SET status = ?, moderator_id = ?, moderated_at = ?
      WHERE id = ?
    `);

    stmt.run(update.status, update.moderatorId, update.moderatedAt.toISOString(), id);
  }

  /**
   * Delete a review
   */
  deleteReview(id: number): void {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM reviews WHERE id = ?');
    stmt.run(id);
  }

  /**
   * Check if user has already reviewed a product
   */
  hasUserReviewedProduct(userId: number, productId: number): boolean {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM reviews 
      WHERE user_id = ? AND product_id = ? AND status != 'rejected'
    `);
    const row = stmt.get(userId, productId) as any;
    return row.count > 0;
  }

  /**
   * Get review count by status
   */
  getReviewCountByStatus(status: string): number {
    const db = getDatabase();
    const stmt = db.prepare('SELECT COUNT(*) as count FROM reviews WHERE status = ?');
    const row = stmt.get(status) as any;
    return row.count;
  }
}
