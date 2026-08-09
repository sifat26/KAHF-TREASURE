export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  variantId?: string;
  title: string;
  variantLabel?: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  note?: string;
  changedById?: string;
  changedAt: string;
}

export interface Order {
  _id: string;
  trackingNumber: string;
  userId?: string | null;
  customerName: string;
  email?: string;
  phone: string;
  district: string;
  upazila: string;
  addressLine: string;
  postalCode?: string;
  orderNote?: string;
  isGuestOrder: boolean;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  status: OrderStatus;
  statusHistories: OrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: string;
}
