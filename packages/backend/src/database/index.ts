export { getDatabase, closeDatabase } from './connection';
export { UserRepository } from './users';
export { ProductRepository } from './products';
export { ReviewRepository } from './reviews';
export { ModerationRepository } from './moderation';

// Create singleton instances
export const userRepository = new UserRepository();
export const productRepository = new ProductRepository();
export const reviewRepository = new ReviewRepository();
export const moderationRepository = new ModerationRepository();
