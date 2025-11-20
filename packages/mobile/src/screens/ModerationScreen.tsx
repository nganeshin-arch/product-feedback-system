import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import api from '../services/api';

interface PendingReview {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  product?: {
    name: string;
    category: string;
  };
}

export default function ModerationScreen() {
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const response = await api.get('/moderation/pending');
      setReviews(response.data.data);
    } catch (error) {
      console.error('Failed to fetch pending reviews:', error);
      Alert.alert('Error', 'Failed to load pending reviews');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPendingReviews();
  };

  const handleApprove = async (reviewId: number) => {
    try {
      await api.put(`/moderation/${reviewId}/approve`);
      Alert.alert('Success', 'Review approved');
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (error) {
      Alert.alert('Error', 'Failed to approve review');
    }
  };

  const handleReject = async (reviewId: number) => {
    Alert.alert(
      'Reject Review',
      'Are you sure you want to reject this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.put(`/moderation/${reviewId}/reject`);
              Alert.alert('Success', 'Review rejected');
              setReviews(reviews.filter((r) => r.id !== reviewId));
            } catch (error) {
              Alert.alert('Error', 'Failed to reject review');
            }
          },
        },
      ]
    );
  };

  const renderReview = ({ item }: { item: PendingReview }) => (
    <View style={styles.reviewCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.product?.name || `Product #${item.productId}`}</Text>
        {item.product?.category && (
          <Text style={styles.category}>{item.product.category}</Text>
        )}
      </View>

      <View style={styles.reviewInfo}>
        <View style={styles.reviewHeader}>
          <Text style={styles.userName}>{item.userName}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.reviewText}>{item.reviewText}</Text>
        <Text style={styles.date}>
          Submitted: {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={() => handleApprove(item.id)}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleReject(item.id)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No pending reviews</Text>
        }
      />
    </View>
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
  listContainer: {
    padding: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  productInfo: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewInfo: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#F59E0B',
    fontSize: 16,
    marginRight: 4,
  },
  rating: {
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
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 32,
    fontSize: 16,
  },
});
