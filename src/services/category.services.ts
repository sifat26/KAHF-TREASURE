import { httpClient, getToken } from '@/lib/httpClient';
import { normalizeText } from '@/lib/text';
import { Category, CategoryPayload } from '@/types/category';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const categoryServices = {
  getCategories: async (params?: { type?: string; isActive?: boolean }) =>
    normalizeText(await httpClient.get<Category[]>('/categories', params as Record<string, unknown>)),

  getCategory: async (idOrSlug: string) => normalizeText(await httpClient.get<Category>(`/categories/${idOrSlug}`)),

  createCategory: (data: CategoryPayload) => httpClient.post<Category>('/categories', data),

  updateCategory: (id: string, data: Partial<CategoryPayload>) => httpClient.patch<Category>(`/categories/${id}`, data),

  deleteCategory: (id: string) => httpClient.delete<Category>(`/categories/${id}`),

  // Upload a single category image to Cloudinary via the backend
  uploadCategoryImage: async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('image', file);
    const token = getToken();
    const res = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Image upload failed');
    return data.data.url as string;
  },
};
