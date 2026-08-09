import { httpClient } from '@/lib/httpClient';
import { Banner } from '@/types/banner';

export const bannerServices = {
  getBanners: () => httpClient.get<Banner[]>('/banners'),
  createBanner: (data: Partial<Banner>) => httpClient.post<Banner>('/banners', data),
  updateBanner: (id: string, data: Partial<Banner>) => httpClient.patch<Banner>(`/banners/${id}`, data),
  deleteBanner: (id: string) => httpClient.delete<Banner>(`/banners/${id}`),
};
