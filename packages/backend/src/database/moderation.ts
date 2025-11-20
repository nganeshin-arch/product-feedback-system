import { getDatabase } from './connection';
import type { ModerationAction, ModerationActionCreateInput } from '@feedback-system/shared';

export class ModerationRepository {
  /**
   * Log a moderation action
   */
  logModerationAction(input: ModerationActionCreateInput): ModerationAction {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO moderation_history (review_id, moderator_id, action, reason)
      VALUES (?, ?, ?, ?)
    `);

    const info = stmt.run(input.reviewId, input.moderatorId, input.action, input.reason || null);

    const action = this.getModerationActionById(Number(info.lastInsertRowid));
    if (!action) {
      throw new Error('Failed to log moderation action');
    }

    return action;
  }

  /**
   * Get moderation action by ID
   */
  getModerationActionById(id: number): ModerationAction | null {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, review_id as reviewId, moderator_id as moderatorId,
             action, reason, timestamp
      FROM moderation_history
      WHERE id = ?
    `);

    const row = stmt.get(id) as any;
    if (!row) return null;

    return {
      id: row.id,
      reviewId: row.reviewId,
      moderatorId: row.moderatorId,
      action: row.action,
      reason: row.reason || undefined,
      timestamp: new Date(row.timestamp),
    };
  }

  /**
   * Get moderation history for a specific review
   */
  getModerationHistoryByReview(reviewId: number): ModerationAction[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, review_id as reviewId, moderator_id as moderatorId,
             action, reason, timestamp
      FROM moderation_history
      WHERE review_id = ?
      ORDER BY timestamp DESC
    `);

    const rows = stmt.all(reviewId) as any[];

    return rows.map((row) => ({
      id: row.id,
      reviewId: row.reviewId,
      moderatorId: row.moderatorId,
      action: row.action,
      reason: row.reason || undefined,
      timestamp: new Date(row.timestamp),
    }));
  }

  /**
   * Get moderation history for a specific moderator
   */
  getModerationHistoryByModerator(moderatorId: number, limit?: number): ModerationAction[] {
    const db = getDatabase();
    let query = `
      SELECT id, review_id as reviewId, moderator_id as moderatorId,
             action, reason, timestamp
      FROM moderation_history
      WHERE moderator_id = ?
      ORDER BY timestamp DESC
    `;

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    const stmt = db.prepare(query);
    const rows = stmt.all(moderatorId) as any[];

    return rows.map((row) => ({
      id: row.id,
      reviewId: row.reviewId,
      moderatorId: row.moderatorId,
      action: row.action,
      reason: row.reason || undefined,
      timestamp: new Date(row.timestamp),
    }));
  }

  /**
   * Get all moderation history with optional limit
   */
  getAllModerationHistory(limit?: number): ModerationAction[] {
    const db = getDatabase();
    let query = `
      SELECT id, review_id as reviewId, moderator_id as moderatorId,
             action, reason, timestamp
      FROM moderation_history
      ORDER BY timestamp DESC
    `;

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    const stmt = db.prepare(query);
    const rows = stmt.all() as any[];

    return rows.map((row) => ({
      id: row.id,
      reviewId: row.reviewId,
      moderatorId: row.moderatorId,
      action: row.action,
      reason: row.reason || undefined,
      timestamp: new Date(row.timestamp),
    }));
  }

  /**
   * Get moderation statistics for a moderator
   */
  getModeratorStats(moderatorId: number): {
    totalActions: number;
    approvals: number;
    rejections: number;
    removals: number;
  } {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN action = 'approve' THEN 1 ELSE 0 END) as approvals,
        SUM(CASE WHEN action = 'reject' THEN 1 ELSE 0 END) as rejections,
        SUM(CASE WHEN action = 'remove' THEN 1 ELSE 0 END) as removals
      FROM moderation_history
      WHERE moderator_id = ?
    `);

    const row = stmt.get(moderatorId) as any;

    return {
      totalActions: row.total || 0,
      approvals: row.approvals || 0,
      rejections: row.rejections || 0,
      removals: row.removals || 0,
    };
  }
}
