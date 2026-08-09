import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  _id?: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  variantId?: mongoose.Types.ObjectId;
  title: string;
  image?: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
}

export interface ICart extends Document {
  userId?: mongoose.Types.ObjectId | null;
  sessionId?: string;
  items: ICartItem[];
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  image: String,
  variantLabel: String,
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
}, { _id: true });

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  sessionId: { type: String, default: null },
  items: [cartItemSchema],
  couponCode: String,
}, { timestamps: true });

cartSchema.index({ userId: 1 }, { unique: true, sparse: true });
cartSchema.index({ sessionId: 1 }, { unique: true, sparse: true });

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
