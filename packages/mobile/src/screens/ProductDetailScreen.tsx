import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';
import type { Product, Review } from '@feedback-system/shared';

export default function ProductDetailScreen() {
  const route = useRoute();
  const { productId } = route.params as { productId: number };

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    try {
      const [productRes, reviewsRes] = await Promise.all([
        api.get(`/products/${productId}`),
        api.get(`/products/${productId}/reviews`),
      ]);
      setProduct(productRes.data);
      setReviews(reviewsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
      Alert.alert('Error', 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (reviewText.length < 10) {
      Alert.alert('Error', 'Review must be at least 10 characters');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/reviews', {
        productId,
        rating,
        reviewText,
      });
      Alert.alert('Success', 'Review submitted! It will appear after moderation.');
      setShowReviewForm(false);
      setRating(5);
      setReviewText('');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {product.imageUrl && (
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      )}

      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{product.averageRating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({product.totalReviews} reviews)</Text>
        </View>

        {!showReviewForm && (
          <TouchableOpacity style={styles.writeReviewButton} onPress={() => setShowReviewForm(true)}>
            <Text style={styles.writeReviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
        )}

        {showReviewForm && (
          <View style={styles.reviewForm}>
            <Text style={styles.formTitle}>Write Your Review</Text>

            <Text style={styles.label}>Rating</Text>
            <View style={styles.starSelector}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text style={[styles.starButton, star <= rating && styles.starSelected]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Review ({reviewText.length}/1000)</Text>
            <TextInput
              style={styles.textArea}
              value={reviewText}
              onChangeText={setReviewText}
              placeholder="Share your experience..."
              multiline
              numberOfLines={4}
              maxLength={1000}
            />

            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.submitButton, submitting && styles.buttonDisabled]}
                onPress={handleSubmitReview}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowReviewForm(false)}
                disabled={submitting}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={styles.reviewsTitle}>Reviews</Text>
        {reviews.length === 0 ? (
          <Text style={styles.noReviews}>No reviews yet</Text>
        ) : (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewAuthor}>{review.userName}</Text>
                <View style={styles.reviewRating}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.reviewRatingText}>{review.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{review.reviewText}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  star: {
    color: '#F59E0B',
    fontSize: 20,
    marginRight: 4,
  },
  rating: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 16,
    color: '#6B7280',
  },
  writeReviewButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  writeReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewForm: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  starSelector: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  starButton: {
    fontSize: 32,
    color: '#D1D5DB',
    marginRight: 8,
  },
  starSelected: {
    color: '#F59E0B',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  noReviews: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
