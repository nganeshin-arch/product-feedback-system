import { getDatabase } from './connection';
import type { User, UserCreateInput } from '@feedback-system/shared';

export class UserRepository {
  /**
   * Create a new user
   */
  createUser(input: UserCreateInput): User {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, display_name, photo_url, auth_provider, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(
      input.email,
      input.passwordHash || null,
      input.displayName,
      input.photoURL || null,
      input.authProvider,
      input.role || 'user'
    );

    const user = this.getUserById(Number(info.lastInsertRowid));
    if (!user) {
      throw new Error('Failed to create user');
    }

    return user;
  }

  /**
   * Get user by email
   */
  getUserByEmail(email: string): User | null {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, email, display_name as displayName, photo_url as photoURL, 
             auth_provider as authProvider, role, created_at as createdAt
      FROM users
      WHERE email = ?
    `);

    const row = stmt.get(email) as any;
    if (!row) return null;

    return {
      id: row.id,
      email: row.email,
      displayName: row.displayName,
      photoURL: row.photoURL,
      authProvider: row.authProvider,
      role: row.role,
      createdAt: new Date(row.createdAt),
    };
  }

  /**
   * Get user by ID
   */
  getUserById(id: number): User | null {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, email, display_name as displayName, photo_url as photoURL, 
             auth_provider as authProvider, role, created_at as createdAt
      FROM users
      WHERE id = ?
    `);

    const row = stmt.get(id) as any;
    if (!row) return null;

    return {
      id: row.id,
      email: row.email,
      displayName: row.displayName,
      photoURL: row.photoURL,
      authProvider: row.authProvider,
      role: row.role,
      createdAt: new Date(row.createdAt),
    };
  }

  /**
   * Get user password hash (for authentication)
   */
  getUserPasswordHash(email: string): string | null {
    const db = getDatabase();
    const stmt = db.prepare('SELECT password_hash FROM users WHERE email = ?');
    const row = stmt.get(email) as any;
    return row?.password_hash || null;
  }

  /**
   * Update user profile
   */
  updateUser(id: number, updates: Partial<Pick<User, 'displayName' | 'photoURL'>>): User | null {
    const db = getDatabase();
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.displayName !== undefined) {
      fields.push('display_name = ?');
      values.push(updates.displayName);
    }
    if (updates.photoURL !== undefined) {
      fields.push('photo_url = ?');
      values.push(updates.photoURL);
    }

    if (fields.length === 0) {
      return this.getUserById(id);
    }

    values.push(id);
    const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return this.getUserById(id);
  }

  /**
   * Check if user exists by email
   */
  userExists(email: string): boolean {
    const db = getDatabase();
    const stmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE email = ?');
    const row = stmt.get(email) as any;
    return row.count > 0;
  }
}
