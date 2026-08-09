import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
  title?: string;
  subtitle?: string;
  image?: string;
  mobileImage?: string;
  linkUrl?: string;
  buttonText?: string;
  position: 'hero' | 'promo' | 'popup';
  isActive: boolean;
  deleted: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>({
  title: String,
  subtitle: String,
  image: String,
  mobileImage: String,
  linkUrl: String,
  buttonText: String,
  position: { type: String, enum: ['hero', 'promo', 'popup'], default: 'hero' },
  isActive: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Banner = mongoose.model<IBanner>('Banner', bannerSchema);
