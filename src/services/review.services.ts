import { httpClient } from '@/lib/httpClient';
import { Review } from '@/types/review';

export const reviewServices = {
  getReviews: (productId?: string) =>
    httpClient.get<Review[]>('/reviews', productId ? { productId } : undefined),
  createReview: (data: { productId: string; orderId: string; customerName: string; rating: number; comment: string }) =>
    httpClient.post<Review>('/reviews', data),
  approveReview: (id: string, showOnHomepage?: boolean) =>
    httpClient.patch<Review>(`/reviews/${id}/approve`, { showOnHomepage }),
};
