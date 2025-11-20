// User types
export interface User {
  id: number;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'moderator';
  authProvider: 'email' | 'google';
  createdAt: Date;
}

export interface UserCreateInput {
  email: string;
  passwordHash?: string;
  displayName: string;
  photoURL?: string;
  authProvider: 'email' | 'google';
  role?: 'user' | 'moderator';
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
}

export interface ProductCreateInput {
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
}

// Review types
export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  reviewText: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  moderatedAt?: Date;
  moderatorId?: number;
}

export interface ReviewCreateInput {
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  reviewText: string;
}

export interface ReviewUpdateInput {
  status: 'approved' | 'rejected';
  moderatorId: number;
  moderatedAt: Date;
}

// Moderation types
export interface ModerationAction {
  id: number;
  reviewId: number;
  moderatorId: number;
  action: 'approve' | 'reject' | 'remove';
  reason?: string;
  timestamp: Date;
}

export interface ModerationActionCreateInput {
  reviewId: number;
  moderatorId: number;
  action: 'approve' | 'reject' | 'remove';
  reason?: string;
}

// Authentication types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
