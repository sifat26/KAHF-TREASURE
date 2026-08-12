import { Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';
import mongoose from 'mongoose';
import { z } from 'zod';
import { notifyNewOrder } from '../utils/notifications';

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    quantity: z.number().int().min(1),
  })),
  customerName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(1),
  district: z.string().min(1),
  upazila: z.string().min(1),
  addressLine: z.string().min(1),
  postalCode: z.string().optional(),
  orderNote: z.string().optional(),
  shipping: z.number().min(0).default(0),
  paymentMethod: z.enum(['cod', 'bkash', 'nagad', 'card']).default('cod'),
});

function generateTrackingNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KT-${ts}-${rand}`;
}

export const createOrder = catchAsync(async (req: AuthRequest, res: Response) => {
  const body = orderSchema.parse(req.body);

  // Build order items with prices from DB (never trust client prices)
  const orderItems = [];
  let subtotal = 0;

  for (const item of body.items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new ApiError(404, `Product not found: ${item.productId}`);
    if (product.deleted || !product.isActive) throw new ApiError(400, `Product not available: ${product.title}`);

    let unitPrice = product.basePrice;
    let variantLabel: string | undefined;
    let variantId: mongoose.Types.ObjectId | undefined;

    if (item.variantId) {
      const variant = product.variants.find(v => v._id?.toString() === item.variantId);
      if (!variant) throw new ApiError(404, `Variant not found for ${product.title}`);
      if (variant.stock < item.quantity) throw new ApiError(400, `Insufficient stock for ${product.title} (${variant.label})`);
      unitPrice = variant.priceOverride || product.basePrice;
      variantLabel = variant.label;
      variantId = new mongoose.Types.ObjectId(item.variantId);

      // Decrement variant stock
      variant.stock -= item.quantity;
      await product.save();
    } else {
      // Check total stock across variants
      const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
      if (totalStock < item.quantity) throw new ApiError(400, `Insufficient stock for ${product.title}`);
    }

    product.soldCount += item.quantity;
    await product.save();

    const totalPrice = unitPrice * item.quantity;
    subtotal += totalPrice;

    orderItems.push({
      productId: item.productId,
      variantId,
      title: product.title,
      variantLabel,
      image: product.images[0] || '',
      quantity: item.quantity,
      unitPrice,
      totalPrice,
    });
  }

  const totalAmount = subtotal + body.shipping;

  const order = await Order.create({
    trackingNumber: generateTrackingNumber(),
    userId: req.user?.userId || null,
    isGuestOrder: !req.user?.userId,
    customerName: body.customerName,
    email: body.email,
    phone: body.phone,
    district: body.district,
    upazila: body.upazila,
    addressLine: body.addressLine,
    postalCode: body.postalCode,
    orderNote: body.orderNote,
    items: orderItems,
    subtotal,
    shipping: body.shipping,
    discountAmount: 0,
    totalAmount,
    paymentMethod: body.paymentMethod,
    status: 'pending',
    statusHistories: [{ status: 'pending', changedAt: new Date() }],
  });

  // Clear cart if user was logged in
  if (req.user?.userId) {
    await Cart.findOneAndUpdate({ userId: req.user.userId }, { $set: { items: [] } });
  }

  // Notify admin(s) on Telegram — fire-and-forget so a notification failure
  // or slowness never blocks the customer's checkout response.
  void notifyNewOrder(order);

  sendResponse(res, { statusCode: 201, success: true, message: 'Order placed', data: order });
});

export const getOrders = catchAsync(async (req: AuthRequest, res: Response) => {
  const page = Math.max(1, parseInt(String(req.query.page || '1'), 10));
  const limit = Math.min(100, parseInt(String(req.query.limit || '20'), 10));

  const filter: Record<string, unknown> = {};
  if (req.query.status) filter.status = req.query.status;

  // Customers see only their orders
  if (req.user!.role === 'customer') {
    filter.userId = req.user!.userId;
  }

  const [orders, total] = await Promise.all([
    Order.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
    Order.countDocuments(filter),
  ]);

  sendResponse(res, {
    statusCode: 200, success: true, message: 'Orders retrieved',
    data: orders,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

export const getOrder = catchAsync(async (req: AuthRequest, res: Response) => {
  const order = await Order.findOne({ $or: [{ _id: req.params.id }, { trackingNumber: req.params.id }] });
  if (!order) throw new ApiError(404, 'Order not found');

  // Customer can only see their own order
  if (req.user!.role === 'customer' && order.userId?.toString() !== req.user!.userId) {
    throw new ApiError(403, 'Forbidden');
  }

  sendResponse(res, { statusCode: 200, success: true, message: 'Order retrieved', data: order });
});

export const updateOrderStatus = catchAsync(async (req: AuthRequest, res: Response) => {
  const { status, note } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');

  order.status = status;
  order.statusHistories.push({ status, note, changedById: new mongoose.Types.ObjectId(req.user!.userId), changedAt: new Date() });
  await order.save();

  sendResponse(res, { statusCode: 200, success: true, message: 'Order status updated', data: order });
});

export const trackOrder = catchAsync(async (req: AuthRequest, res: Response) => {
  const order = await Order.findOne({ trackingNumber: req.params.trackingNumber })
    .select('trackingNumber customerName phone district upazila addressLine postalCode orderNote status paymentStatus statusHistories items subtotal shipping discountAmount totalAmount paymentMethod createdAt');
  if (!order) throw new ApiError(404, 'Order not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Order tracked', data: order });
});
