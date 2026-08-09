import { httpClient } from '@/lib/httpClient';
import { Order, OrderQueryParams } from '@/types/order';

export interface CreateOrderPayload {
  items: { productId: string; variantId?: string; quantity: number }[];
  customerName: string;
  email?: string;
  phone: string;
  district: string;
  upazila: string;
  addressLine: string;
  postalCode?: string;
  orderNote?: string;
  shipping?: number;
  paymentMethod?: 'cod' | 'bkash' | 'nagad' | 'card';
}

export const orderServices = {
  createOrder: (data: CreateOrderPayload) => httpClient.post<Order>('/orders', data),
  getOrders: (params?: OrderQueryParams) => httpClient.get<Order[]>('/orders', params as Record<string, unknown>),
  getOrder: (id: string) => httpClient.get<Order>(`/orders/${id}`),
  updateOrderStatus: (id: string, status: string, note?: string) =>
    httpClient.patch<Order>(`/orders/${id}/status`, { status, note }),
  trackOrder: (trackingNumber: string) => httpClient.get<Order>(`/orders/track/${trackingNumber}`),
};
