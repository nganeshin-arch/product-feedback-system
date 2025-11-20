import { Router, Request, Response, NextFunction } from 'express';
import { productRepository } from '../database';
import { AppError } from '../middleware';
import type { Product, PaginatedResponse } from '@feedback-system/shared';

const router = Router();

/**
 * GET /api/products
 * Get all products with optional pagination
 * Query params: page, limit
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    // Validate pagination params
    if (page < 1) {
      throw new AppError(400, 'INVALID_PAGE', 'Page number must be greater than 0');
    }
    if (limit < 1 || limit > 100) {
      throw new AppError(400, 'INVALID_LIMIT', 'Limit must be between 1 and 100');
    }

    const offset = (page - 1) * limit;
    const products = productRepository.getAllProducts(limit, offset);
    const total = productRepository.getTotalCount();
    const totalPages = Math.ceil(total / limit);

    const response: PaginatedResponse<Product> = {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    // Set cache headers for better performance
    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/search
 * Search products by name or description
 * Query params: q (query string)
 */
router.get('/search', (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query.q as string;

    if (!query || query.trim().length === 0) {
      throw new AppError(400, 'MISSING_QUERY', 'Search query is required');
    }

    if (query.length < 2) {
      throw new AppError(400, 'QUERY_TOO_SHORT', 'Search query must be at least 2 characters');
    }

    const products = productRepository.searchProducts(query.trim());

    res.set('Cache-Control', 'public, max-age=60'); // Cache for 1 minute
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/categories
 * Get all unique product categories
 */
router.get('/categories', (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = productRepository.getCategories();

    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      throw new AppError(400, 'INVALID_ID', 'Invalid product ID');
    }

    const product = productRepository.getProductById(id);

    if (!product) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND', 'Product not found');
    }

    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
