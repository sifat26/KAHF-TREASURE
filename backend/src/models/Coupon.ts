import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  description?: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  appliesToAllProducts: boolean;
  categoryIds: mongoose.Types.ObjectId[];
  productIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true, uppercase: true },
  description: String,
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true, min: 0 },
  minOrderAmount: { type: Number, min: 0 },
  maxDiscountAmount: { type: Number, min: 0 },
  usageLimit: { type: Number, required: true, min: 1 },
  usedCount: { type: Number, default: 0, min: 0 },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  appliesToAllProducts: { type: Boolean, default: true },
  categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

export const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);
