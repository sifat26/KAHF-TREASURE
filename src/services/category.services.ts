import { httpClient } from '@/lib/httpClient';
import { normalizeText } from '@/lib/text';
import { Category, CategoryPayload } from '@/types/category';

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
    const res = await httpClient.upload<{ url: string }>('/upload/image', fd);
    return res.data.url;
  },
};
