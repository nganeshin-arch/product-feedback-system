import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Review } from '@feedback-system/shared';

export function useProductReviews(productId: number) {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Review[] }>(`/products/${productId}/reviews`);
      return data.data;
    },
    enabled: !!productId,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: { productId: number; rating: number; reviewText: string }) => {
      const { data } = await api.post('/reviews', review);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
    },
  });
}
