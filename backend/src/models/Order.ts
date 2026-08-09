import mongoose, { Schema, Document } from 'mongoose';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  variantId?: mongoose.Types.ObjectId;
  title: string;
  variantLabel?: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IOrderStatusHistory {
  status: OrderStatus;
  note?: string;
  changedById?: mongoose.Types.ObjectId;
  changedAt: Date;
}

export interface IOrder extends Document {
  trackingNumber: string;
  userId?: mongoose.Types.ObjectId | null;
  customerName: string;
  email?: string;
  phone: string;
  district: string;
  upazila: string;
  addressLine: string;
  postalCode?: string;
  orderNote?: string;
  isGuestOrder: boolean;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  status: OrderStatus;
  statusHistories: IOrderStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  variantLabel: String,
  image: String,
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 },
}, { _id: true });

const statusHistorySchema = new Schema<IOrderStatusHistory>({
  status: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'], required: true },
  note: String,
  changedById: { type: Schema.Types.ObjectId, ref: 'User' },
  changedAt: { type: Date, default: Date.now },
}, { _id: true });

const orderSchema = new Schema<IOrder>({
  trackingNumber: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  customerName: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  addressLine: { type: String, required: true },
  postalCode: String,
  orderNote: String,
  isGuestOrder: { type: Boolean, default: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true, min: 0 },
  shipping: { type: Number, default: 0, min: 0 },
  discountAmount: { type: Number, default: 0, min: 0 },
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: ['cod', 'bkash', 'nagad', 'card'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  transactionId: String,
  status: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'], default: 'pending' },
  statusHistories: [statusHistorySchema],
}, { timestamps: true });

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
