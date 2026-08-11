import { httpClient } from '@/lib/httpClient';
import { normalizeText } from '@/lib/text';
import { Product, ProductPayload, ProductQueryParams } from '@/types/product';

export const productServices = {
  getProducts: async (params?: ProductQueryParams) =>
    normalizeText(await httpClient.get<Product[]>('/products', params as Record<string, unknown>)),

  getProduct: async (idOrSlug: string) => normalizeText(await httpClient.get<Product>(`/products/${idOrSlug}`)),

  createProduct: (data: ProductPayload) => httpClient.post<Product>('/products', data),

  updateProduct: (id: string, data: Partial<ProductPayload>) => httpClient.patch<Product>(`/products/${id}`, data),

  deleteProduct: (id: string) => httpClient.delete<Product>(`/products/${id}`),

  // Upload single image to Cloudinary via backend
  uploadImage: async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('image', file);
    const res = await httpClient.upload<{ url: string }>('/upload/image', fd);
    return res.data.url;
  },

  // Upload multiple images
  uploadImages: async (files: File[]): Promise<string[]> => {
    const fd = new FormData();
    files.forEach((f) => fd.append('images', f));
    const res = await httpClient.upload<{ urls: string[] }>('/upload/images', fd);
    return res.data.urls;
  },
};
