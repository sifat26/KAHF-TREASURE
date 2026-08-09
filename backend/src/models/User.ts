import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: 'super_admin' | 'admin' | 'editor' | 'customer';
  isBlocked: boolean;
  addresses: IAddress[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  label: string;
  name: string;
  phone: string;
  district: string;
  upazila: string;
  addressLine: string;
  postalCode?: string;
  isDefault: boolean;
}

const addressSchema = new Schema<IAddress>({
  label: { type: String, default: 'Home' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  addressLine: { type: String, required: true },
  postalCode: String,
  isDefault: { type: Boolean, default: false },
}, { _id: true });

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['super_admin', 'admin', 'editor', 'customer'], default: 'customer' },
  isBlocked: { type: Boolean, default: false },
  addresses: [addressSchema],
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
