import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: mongoose.Types.ObjectId | null;
  type: 'product' | 'attar' | 'book' | 'clothing' | 'other';
  attributesSchema?: Record<string, string>; // e.g. { volume: 'string', isbn: 'string', size: 'string' }
  isActive: boolean;
  deleted: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: String,
  image: String,
  parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  type: { type: String, enum: ['product', 'attar', 'book', 'clothing', 'other'], default: 'product' },
  attributesSchema: { type: Schema.Types.Mixed, default: {} },
  isActive: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

categorySchema.index({ parentId: 1 });

export const Category = mongoose.model<ICategory>('Category', categorySchema);
