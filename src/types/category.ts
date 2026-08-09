export type CategoryType = 'product' | 'attar' | 'book' | 'clothing' | 'other';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  type: CategoryType;
  attributesSchema?: Record<string, string>;
  isActive: boolean;
  deleted: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  parentId_data?: Category | null;
}

export interface CategoryPayload {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  type?: CategoryType;
  attributesSchema?: Record<string, string>;
  order?: number;
  isActive?: boolean;
}
