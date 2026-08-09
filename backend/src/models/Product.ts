import mongoose, { Schema, Document } from 'mongoose';

export interface IProductVariant {
  _id?: mongoose.Types.ObjectId;
  label: string; // e.g. "3ml", "6ml", "12ml"
  stock: number;
  priceOverride?: number;
  sku?: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  description?: string;
  categoryId: mongoose.Types.ObjectId;
  brand?: string;
  basePrice: number;
  compareAtPrice?: number;
  images: string[];
  variants: IProductVariant[];
  attributes: Record<string, unknown>; // category-specific: volume, isbn, size, etc.
  tags: string[];
  sku?: string;
  isActive: boolean;
  deleted: boolean;
  newArrival: boolean;
  isFeatured: boolean;
  isOnOffer: boolean;
  productOrder: number;
  averageRating: number;
  reviewCount: number;
  soldCount: number;
  lowStockThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

const variantSchema = new Schema<IProductVariant>({
  label: { type: String, required: true },
  stock: { type: Number, required: true, default: 0, min: 0 },
  priceOverride: { type: Number, min: 0 },
  sku: String,
}, { _id: true });

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: String,
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: String,
  basePrice: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  images: [{ type: String }],
  variants: [variantSchema],
  attributes: { type: Schema.Types.Mixed, default: {} },
  tags: [{ type: String }],
  sku: { type: String, unique: true, sparse: true },
  isActive: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isOnOffer: { type: Boolean, default: false },
  productOrder: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0, min: 0 },
  soldCount: { type: Number, default: 0, min: 0 },
  lowStockThreshold: { type: Number, default: 5, min: 0 },
}, { timestamps: true });

productSchema.index({ categoryId: 1 });
productSchema.index({ deleted: 1, isActive: 1 });
productSchema.index({ title: 'text', description: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);
