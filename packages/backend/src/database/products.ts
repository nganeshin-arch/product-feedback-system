import { getDatabase } from './connection';
import type { Product, ProductCreateInput } from '@feedback-system/shared';

export class ProductRepository {
  /**
   * Get all products with optional pagination
   */
  getAllProducts(limit?: number, offset?: number): Product[] {
    const db = getDatabase();
    let query = `
      SELECT id, name, description, category, image_url as imageUrl,
             average_rating as averageRating, total_reviews as totalReviews,
             created_at as createdAt
      FROM products
      ORDER BY name ASC
    `;

    if (limit !== undefined) {
      query += ` LIMIT ${limit}`;
      if (offset !== undefined) {
        query += ` OFFSET ${offset}`;
      }
    }

    const stmt = db.prepare(query);
    const rows = stmt.all() as any[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      imageUrl: row.imageUrl,
      averageRating: row.averageRating,
      totalReviews: row.totalReviews,
      createdAt: new Date(row.createdAt),
    }));
  }

  /**
   * Get product by ID
   */
  getProductById(id: number): Product | null {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, name, description, category, image_url as imageUrl,
             average_rating as averageRating, total_reviews as totalReviews,
             created_at as createdAt
      FROM products
      WHERE id = ?
    `);

    const row = stmt.get(id) as any;
    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      imageUrl: row.imageUrl,
      averageRating: row.averageRating,
      totalReviews: row.totalReviews,
      createdAt: new Date(row.createdAt),
    };
  }

  /**
   * Search products by name or description
   */
  searchProducts(query: string): Product[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, name, description, category, image_url as imageUrl,
             average_rating as averageRating, total_reviews as totalReviews,
             created_at as createdAt
      FROM products
      WHERE name LIKE ? OR description LIKE ?
      ORDER BY name ASC
    `);

    const searchTerm = `%${query}%`;
    const rows = stmt.all(searchTerm, searchTerm) as any[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      imageUrl: row.imageUrl,
      averageRating: row.averageRating,
      totalReviews: row.totalReviews,
      createdAt: new Date(row.createdAt),
    }));
  }

  /**
   * Filter products by category
   */
  filterByCategory(category: string): Product[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, name, description, category, image_url as imageUrl,
             average_rating as averageRating, total_reviews as totalReviews,
             created_at as createdAt
      FROM products
      WHERE category = ?
      ORDER BY name ASC
    `);

    const rows = stmt.all(category) as any[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      imageUrl: row.imageUrl,
      averageRating: row.averageRating,
      totalReviews: row.totalReviews,
      createdAt: new Date(row.createdAt),
    }));
  }

  /**
   * Get all unique categories
   */
  getCategories(): string[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT DISTINCT category FROM products ORDER BY category ASC');
    const rows = stmt.all() as any[];
    return rows.map((row) => row.category);
  }

  /**
   * Create a new product
   */
  createProduct(input: ProductCreateInput): Product {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO products (name, description, category, image_url)
      VALUES (?, ?, ?, ?)
    `);

    const info = stmt.run(input.name, input.description, input.category, input.imageUrl || null);

    const product = this.getProductById(Number(info.lastInsertRowid));
    if (!product) {
      throw new Error('Failed to create product');
    }

    return product;
  }

  /**
   * Update product statistics (average rating and total reviews)
   */
  updateProductStats(productId: number): void {
    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE products 
      SET average_rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews 
        WHERE product_id = ? AND status = 'approved'
      ),
      total_reviews = (
        SELECT COUNT(*)
        FROM reviews 
        WHERE product_id = ? AND status = 'approved'
      )
      WHERE id = ?
    `);

    stmt.run(productId, productId, productId);
  }

  /**
   * Get total product count
   */
  getTotalCount(): number {
    const db = getDatabase();
    const stmt = db.prepare('SELECT COUNT(*) as count FROM products');
    const row = stmt.get() as any;
    return row.count;
  }
}
