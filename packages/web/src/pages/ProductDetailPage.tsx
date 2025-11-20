import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useProductReviews, useSubmitReview } from '../hooks/useReviews';
import { useAuth } from '../contexts/AuthContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = parseInt(id!);
  const { isAuthenticated } = useAuth();

  const productQuery = useProduct(productId);
  const reviewsQuery = useProductReviews(productId);
  const submitReview = useSubmitReview();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitReview.mutateAsync({ productId, rating, reviewText });
      setShowReviewForm(false);
      setRating(5);
      setReviewText('');
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (productQuery.isLoading) return <p>Loading product...</p>;
  if (!productQuery.data) return <p>Product not found</p>;

  const product = productQuery.data;

  return (
    <div>
      <Link to="/" className="text-primary hover:underline mb-4 inline-block">
        ← Back to products
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{product.category}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-bold text-lg">{product.averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({product.totalReviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
        {isAuthenticated && !showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 mb-4"
          >
            Write a Review
          </button>
        )}

        {!isAuthenticated && (
          <p className="text-gray-600 mb-4">
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>{' '}
            to write a review
          </p>
        )}

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review ({reviewText.length}/1000)
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                minLength={10}
                maxLength={1000}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-sm text-gray-500 mt-1">Minimum 10 characters</p>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitReview.isPending}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {submitReview.isPending ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
            {submitReview.isSuccess && (
              <p className="text-success mt-2">Review submitted! It will appear after moderation.</p>
            )}
          </form>
        )}
      </div>

      <div className="space-y-4">
        {reviewsQuery.isLoading && <p>Loading reviews...</p>}
        {reviewsQuery.data?.length === 0 && <p className="text-gray-600">No reviews yet</p>}
        {reviewsQuery.data?.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{review.userName}</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.reviewText}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
