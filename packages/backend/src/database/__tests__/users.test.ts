import Database from 'better-sqlite3';
import { UserRepository } from '../users';
import fs from 'fs';
import path from 'path';

describe('UserRepository', () => {
  let db: Database.Database;
  let userRepo: UserRepository;
  const SCHEMA_PATH = path.join(__dirname, '../schema.sql');

  beforeEach(() => {
    // Create in-memory database for testing
    db = new Database(':memory:');
    db.pragma('foreign_keys = ON');

    // Load and execute schema
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);

    // Mock getDatabase to return our test database
    jest.spyOn(require('../connection'), 'getDatabase').mockReturnValue(db);
    
    userRepo = new UserRepository();
  });

  afterEach(() => {
    db.close();
    jest.restoreAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user with email auth', () => {
      const input = {
        email: 'test@example.com',
        passwordHash: 'hashed_password',
        displayName: 'Test User',
        authProvider: 'email' as const,
      };

      const user = userRepo.createUser(input);

      expect(user).toBeDefined();
      expect(user.id).toBeGreaterThan(0);
      expect(user.email).toBe(input.email);
      expect(user.displayName).toBe(input.displayName);
      expect(user.authProvider).toBe('email');
      expect(user.role).toBe('user');
    });

    it('should create a moderator user', () => {
      const input = {
        email: 'mod@example.com',
        passwordHash: 'hashed_password',
        displayName: 'Moderator',
        authProvider: 'email' as const,
        role: 'moderator' as const,
      };

      const user = userRepo.createUser(input);

      expect(user.role).toBe('moderator');
    });

    it('should create a user with OAuth', () => {
      const input = {
        email: 'oauth@example.com',
        displayName: 'OAuth User',
        photoURL: 'https://example.com/photo.jpg',
        authProvider: 'google' as const,
      };

      const user = userRepo.createUser(input);

      expect(user.authProvider).toBe('google');
      expect(user.photoURL).toBe(input.photoURL);
    });

    it('should throw error for duplicate email', () => {
      const input = {
        email: 'duplicate@example.com',
        passwordHash: 'hashed_password',
        displayName: 'User 1',
        authProvider: 'email' as const,
      };

      userRepo.createUser(input);

      expect(() => userRepo.createUser(input)).toThrow();
    });
  });

  describe('getUserByEmail', () => {
    it('should retrieve user by email', () => {
      const input = {
        email: 'find@example.com',
        passwordHash: 'hashed_password',
        displayName: 'Find Me',
        authProvider: 'email' as const,
      };

      const created = userRepo.createUser(input);
      const found = userRepo.getUserByEmail(input.email);

      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
      expect(found?.email).toBe(input.email);
    });

    it('should return null for non-existent email', () => {
      const found = userRepo.getUserByEmail('nonexistent@example.com');
      expect(found).toBeNull();
    });
  });

  describe('getUserById', () => {
    it('should retrieve user by ID', () => {
      const input = {
        email: 'findbyid@example.com',
        passwordHash: 'hashed_password',
        displayName: 'Find By ID',
        authProvider: 'email' as const,
      };

      const created = userRepo.createUser(input);
      const found = userRepo.getUserById(created.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
      expect(found?.email).toBe(input.email);
    });

    it('should return null for non-existent ID', () => {
      const found = userRepo.getUserById(99999);
      expect(found).toBeNull();
    });
  });

  describe('getUserPasswordHash', () => {
    it('should retrieve password hash', () => {
      const input = {
        email: 'password@example.com',
        passwordHash: 'hashed_password_123',
        displayName: 'Password User',
        authProvider: 'email' as const,
      };

      userRepo.createUser(input);
      const hash = userRepo.getUserPasswordHash(input.email);

      expect(hash).toBe(input.passwordHash);
    });

    it('should return null for OAuth users', () => {
      const input = {
        email: 'oauth@example.com',
        displayName: 'OAuth User',
        authProvider: 'google' as const,
      };

      userRepo.createUser(input);
      const hash = userRepo.getUserPasswordHash(input.email);

      expect(hash).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update user display name', () => {
      const input = {
        email: 'update@example.com',
        passwordHash: 'hashed_password',
        displayName: 'Original Name',
        authProvider: 'email' as const,
      };

      const created = userRepo.createUser(input);
      const updated = userRepo.updateUser(created.id, {
        displayName: 'Updated Name',
      });

      expect(updated?.displayName).toBe('Updated Name');
    });

    it('should update user photo URL', () => {
      const input = {
        email: 'photo@example.com',
        passwordHash: 'hashed_password',
        displayName: 'Photo User',
        authProvider: 'email' as const,
      };

      const created = userRepo.createUser(input);
      const updated = userRepo.updateUser(created.id, {
        photoURL: 'https://example.com/new-photo.jpg',
      });

      expect(updated?.photoURL).toBe('https://example.com/new-photo.jpg');
    });
  });

  describe('userExists', () => {
    it('should return true for existing user', () => {
      const input = {
        email: 'exists@example.com',
        passwordHash: 'hashed_password',
        displayName: 'Exists',
        authProvider: 'email' as const,
      };

      userRepo.createUser(input);
      const exists = userRepo.userExists(input.email);

      expect(exists).toBe(true);
    });

    it('should return false for non-existent user', () => {
      const exists = userRepo.userExists('notexists@example.com');
      expect(exists).toBe(false);
    });
  });
});
