export interface ProductVariant {
  _id?: string;
  label: string;
  stock: number;
  priceOverride?: number | null;
  compareAtPrice?: number | null;
  sku?: string | null;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description?: string | null;
  categoryId: string | { _id: string; name: string; slug: string; };
  brand?: string | null;
  basePrice: number;
  compareAtPrice?: number | null;
  images: string[];
  variants?: ProductVariant[];
  attributes?: Record<string, unknown>;
  tags?: string[];
  sku?: string | null;
  isActive: boolean;
  deleted: boolean;
  newArrival: boolean;
  isFeatured: boolean;
  isOnOffer: boolean;
  productOrder: number;
  averageRating?: number;
  reviewCount?: number;
  soldCount?: number;
  lowStockThreshold?: number;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
    type: string;
  };
}

export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  newArrival?: boolean;
  isFeatured?: boolean;
  isOnOffer?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
  tags?: string;
}

export interface ProductPayload {
  title: string;
  description?: string;
  categoryId: string;
  brand?: string | null;
  basePrice: number;
  compareAtPrice?: number | null;
  images?: string[];
  variants?: ProductVariant[];
  attributes?: Record<string, unknown>;
  tags?: string[];
  sku?: string;
  lowStockThreshold?: number;
  isActive?: boolean;
  newArrival?: boolean;
  isFeatured?: boolean;
  isOnOffer?: boolean;
  productOrder?: number;
}
