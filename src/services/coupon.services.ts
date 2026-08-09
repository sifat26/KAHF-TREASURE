import { httpClient } from '@/lib/httpClient';
import { Coupon } from '@/types/coupon';

export const couponServices = {
  getCoupons: () => httpClient.get<Coupon[]>('/coupons'),
  createCoupon: (data: Partial<Coupon>) => httpClient.post<Coupon>('/coupons', data),
  validateCoupon: (code: string, amount: number) =>
    httpClient.post<{ code: string; discount: number; type: string; value: number }>('/coupons/validate', { code, amount }),
};
