import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  customerName: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  showOnHomepage: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  customerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  showOnHomepage: { type: Boolean, default: false },
}, { timestamps: true });

reviewSchema.index({ productId: 1, orderId: 1 }, { unique: true });

export const Review = mongoose.model<IReview>('Review', reviewSchema);
