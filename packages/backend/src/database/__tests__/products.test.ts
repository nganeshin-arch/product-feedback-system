import Database from 'better-sqlite3';
import { ProductRepository } from '../products';
import fs from 'fs';
import path from 'path';

describe('ProductRepository', () => {
  let db: Database.Database;
  let productRepo: ProductRepository;
  const SCHEMA_PATH = path.join(__dirname, '../schema.sql');

  beforeEach(() => {
    db = new Database(':memory:');
    db.pragma('foreign_keys = ON');

    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);

    jest.spyOn(require('../connection'), 'getDatabase').mockReturnValue(db);
    
    productRepo = new ProductRepository();
  });

  afterEach(() => {
    db.close();
    jest.restoreAllMocks();
  });

  describe('createProduct', () => {
    it('should create a new product', () => {
      const input = {
        name: 'Test Product',
        description: 'A test product description',
        category: 'Electronics',
        imageUrl: 'https://example.com/image.jpg',
      };

      const product = productRepo.createProduct(input);

      expect(product).toBeDefined();
      expect(product.id).toBeGreaterThan(0);
      expect(product.name).toBe(input.name);
      expect(product.description).toBe(input.description);
      expect(product.category).toBe(input.category);
      expect(product.averageRating).toBe(0);
      expect(product.totalReviews).toBe(0);
    });
  });

  describe('getAllProducts', () => {
    beforeEach(() => {
      // Create test products
      for (let i = 1; i <= 5; i++) {
        productRepo.createProduct({
          name: `Product ${i}`,
          description: `Description ${i}`,
          category: 'Electronics',
        });
      }
    });

    it('should retrieve all products', () => {
      const products = productRepo.getAllProducts();
      expect(products).toHaveLength(5);
    });

    it('should support pagination with limit', () => {
      const products = productRepo.getAllProducts(3);
      expect(products).toHaveLength(3);
    });

    it('should support pagination with limit and offset', () => {
      const products = productRepo.getAllProducts(2, 2);
      expect(products).toHaveLength(2);
      expect(products[0].name).toBe('Product 3');
    });
  });

  describe('getProductById', () => {
    it('should retrieve product by ID', () => {
      const created = productRepo.createProduct({
        name: 'Find Me',
        description: 'Test description',
        category: 'Electronics',
      });

      const found = productRepo.getProductById(created.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
      expect(found?.name).toBe('Find Me');
    });

    it('should return null for non-existent ID', () => {
      const found = productRepo.getProductById(99999);
      expect(found).toBeNull();
    });
  });

  describe('searchProducts', () => {
    beforeEach(() => {
      productRepo.createProduct({
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise cancellation',
        category: 'Electronics',
      });
      productRepo.createProduct({
        name: 'Smart Watch',
        description: 'Fitness tracking watch',
        category: 'Electronics',
      });
      productRepo.createProduct({
        name: 'Coffee Maker',
        description: 'Automatic coffee brewing machine',
        category: 'Home & Kitchen',
      });
    });

    it('should search products by name', () => {
      const results = productRepo.searchProducts('headphones');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Wireless Headphones');
    });

    it('should search products by description', () => {
      const results = productRepo.searchProducts('fitness');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Smart Watch');
    });

    it('should be case-insensitive', () => {
      const results = productRepo.searchProducts('COFFEE');
      expect(results).toHaveLength(1);
    });

    it('should return empty array for no matches', () => {
      const results = productRepo.searchProducts('nonexistent');
      expect(results).toHaveLength(0);
    });
  });

  describe('filterByCategory', () => {
    beforeEach(() => {
      productRepo.createProduct({
        name: 'Product 1',
        description: 'Description 1',
        category: 'Electronics',
      });
      productRepo.createProduct({
        name: 'Product 2',
        description: 'Description 2',
        category: 'Electronics',
      });
      productRepo.createProduct({
        name: 'Product 3',
        description: 'Description 3',
        category: 'Home & Kitchen',
      });
    });

    it('should filter products by category', () => {
      const electronics = productRepo.filterByCategory('Electronics');
      expect(electronics).toHaveLength(2);

      const homeKitchen = productRepo.filterByCategory('Home & Kitchen');
      expect(homeKitchen).toHaveLength(1);
    });
  });

  describe('getCategories', () => {
    beforeEach(() => {
      productRepo.createProduct({
        name: 'Product 1',
        description: 'Description 1',
        category: 'Electronics',
      });
      productRepo.createProduct({
        name: 'Product 2',
        description: 'Description 2',
        category: 'Home & Kitchen',
      });
      productRepo.createProduct({
        name: 'Product 3',
        description: 'Description 3',
        category: 'Electronics',
      });
    });

    it('should return unique categories', () => {
      const categories = productRepo.getCategories();
      expect(categories).toHaveLength(2);
      expect(categories).toContain('Electronics');
      expect(categories).toContain('Home & Kitchen');
    });
  });

  describe('getTotalCount', () => {
    it('should return total product count', () => {
      expect(productRepo.getTotalCount()).toBe(0);

      productRepo.createProduct({
        name: 'Product 1',
        description: 'Description 1',
        category: 'Electronics',
      });

      expect(productRepo.getTotalCount()).toBe(1);

      productRepo.createProduct({
        name: 'Product 2',
        description: 'Description 2',
        category: 'Electronics',
      });

      expect(productRepo.getTotalCount()).toBe(2);
    });
  });
});
