import { getDatabase as getDb, closeDatabase as closeDb } from './connection';
import { UserRepository as UserRepo } from './users';
import { ProductRepository as ProductRepo } from './products';
import { ReviewRepository as ReviewRepo } from './reviews';
import { ModerationRepository as ModerationRepo } from './moderation';

// Re-export connection functions
export const getDatabase = getDb;
export const closeDatabase = closeDb;

// Re-export classes
export { UserRepo as UserRepository };
export { ProductRepo as ProductRepository };
export { ReviewRepo as ReviewRepository };
export { ModerationRepo as ModerationRepository };

// Create singleton instances
export const userRepository = new UserRepo();
export const productRepository = new ProductRepo();
export const reviewRepository = new ReviewRepo();
export const moderationRepository = new ModerationRepo();
