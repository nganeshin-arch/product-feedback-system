import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Review } from '@feedback-system/shared';

export function usePendingReviews() {
  return useQuery({
    queryKey: ['moderation', 'pending'],
    queryFn: async () => {
      const { data } = await api.get<{ data: Review[] }>('/moderation/pending');
      return data.data;
    },
  });
}

export function useApproveReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      const { data } = await api.put(`/moderation/${reviewId}/approve`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moderation', 'pending'] });
    },
  });
}

export function useRejectReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, reason }: { reviewId: number; reason?: string }) => {
      const { data } = await api.put(`/moderation/${reviewId}/reject`, { reason });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moderation', 'pending'] });
    },
  });
}
