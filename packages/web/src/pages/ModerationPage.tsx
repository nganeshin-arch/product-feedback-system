import { usePendingReviews, useApproveReview, useRejectReview } from '../hooks/useModeration';

export default function ModerationPage() {
  const pendingReviewsQuery = usePendingReviews();
  const approveReview = useApproveReview();
  const rejectReview = useRejectReview();

  const handleApprove = async (reviewId: number) => {
    if (confirm('Approve this review?')) {
      try {
        await approveReview.mutateAsync(reviewId);
      } catch (error) {
        console.error('Failed to approve review:', error);
      }
    }
  };

  const handleReject = async (reviewId: number) => {
    const reason = prompt('Reason for rejection (optional):');
    if (reason !== null) {
      try {
        await rejectReview.mutateAsync({ reviewId, reason: reason || undefined });
      } catch (error) {
        console.error('Failed to reject review:', error);
      }
    }
  };

  if (pendingReviewsQuery.isLoading) return <p>Loading pending reviews...</p>;

  const pendingReviews = pendingReviewsQuery.data || [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Moderation Dashboard</h1>

      {pendingReviews.length === 0 && (
        <p className="text-gray-600">No pending reviews</p>
      )}

      <div className="space-y-4">
        {pendingReviews.map((review: any) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-1">
                {review.product?.name || `Product #${review.productId}`}
              </h3>
              <p className="text-sm text-gray-500">{review.product?.category}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{review.userName}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-700">{review.reviewText}</p>
              <p className="text-sm text-gray-500 mt-2">
                Submitted: {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(review.id)}
                disabled={approveReview.isPending}
                className="bg-success text-white px-4 py-2 rounded-md hover:bg-success/90 disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(review.id)}
                disabled={rejectReview.isPending}
                className="bg-error text-white px-4 py-2 rounded-md hover:bg-error/90 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
