import { httpClient, getToken } from '@/lib/httpClient';
import { normalizeText } from '@/lib/text';
import { Product, ProductPayload, ProductQueryParams } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const productServices = {
  getProducts: async (params?: ProductQueryParams) =>
    normalizeText(await httpClient.get<Product[]>('/products', params as Record<string, unknown>)),

  getProduct: async (idOrSlug: string) =>
    normalizeText(await httpClient.get<Product>(`/products/${idOrSlug}`)),

  createProduct: (data: ProductPayload) =>
    httpClient.post<Product>('/products', data),

  updateProduct: (id: string, data: Partial<ProductPayload>) =>
    httpClient.patch<Product>(`/products/${id}`, data),

  deleteProduct: (id: string) =>
    httpClient.delete<Product>(`/products/${id}`),

  // Upload single image to Cloudinary via backend
  uploadImage: async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('image', file);
    const token = getToken();
    const res = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Upload failed');
    return data.data.url;
  },

  // Upload multiple images
  uploadImages: async (files: File[]): Promise<string[]> => {
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));
    const token = getToken();
    const res = await fetch(`${API_BASE_URL}/upload/images`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Upload failed');
    return data.data.urls;
  },
};
