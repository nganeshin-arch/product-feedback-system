import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Product, PaginatedResponse } from '@feedback-system/shared';

export function useProducts(page = 1, limit = 50) {
  return useQuery({
    queryKey: ['products', page, limit],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Product>>('/products', {
        params: { page, limit },
      });
      return data;
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async () => {
      const { data } = await api.get<{ data: Product[] }>('/products/search', {
        params: { q: query },
      });
      return data.data;
    },
    enabled: query.length >= 2,
  });
}
