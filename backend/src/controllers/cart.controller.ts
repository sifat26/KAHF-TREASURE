import { Response } from 'express';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';

export const getCart = catchAsync(async (req: AuthRequest, res: Response) => {
  let cart = await Cart.findOne({ userId: req.user!.userId }).populate('items.productId');
  if (!cart) {
    cart = await Cart.create({ userId: req.user!.userId, items: [] });
  }
  sendResponse(res, { statusCode: 200, success: true, message: 'Cart retrieved', data: cart });
});

export const addToCart = catchAsync(async (req: AuthRequest, res: Response) => {
  const { productId, variantId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');

  // Find variant or use base price
  let variantLabel: string | undefined;
  let unitPrice = product.basePrice;

  if (variantId) {
    const variant = product.variants.find(v => v._id?.toString() === variantId);
    if (!variant) throw new ApiError(404, 'Variant not found');
    if (variant.stock < quantity) throw new ApiError(400, 'Insufficient stock');
    variantLabel = variant.label;
    if (variant.priceOverride) unitPrice = variant.priceOverride;
  }

  let cart = await Cart.findOne({ userId: req.user!.userId });
  if (!cart) {
    cart = await Cart.create({ userId: req.user!.userId, items: [] });
  }

  const existingItem = cart.items.find(item =>
    item.productId.toString() === productId &&
    (item.variantId?.toString() || '') === (variantId || '')
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    // totalPrice is computed on demand
  } else {
    cart.items.push({
      productId, variantId, title: product.title,
      image: product.images[0] || '', variantLabel,
      quantity, unitPrice,
    } as any);
    // Set totalPrice via markModified
  }

  await cart.save();
  sendResponse(res, { statusCode: 200, success: true, message: 'Added to cart', data: cart });
});

export const updateCartItem = catchAsync(async (req: AuthRequest, res: Response) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user!.userId });
  if (!cart) throw new ApiError(404, 'Cart not found');

  const item = cart.items.find(i => i._id?.toString() === itemId);
  if (!item) throw new ApiError(404, 'Cart item not found');

  if (quantity <= 0) {
    cart.items = cart.items.filter(i => i._id?.toString() !== itemId);
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  sendResponse(res, { statusCode: 200, success: true, message: 'Cart updated', data: cart });
});

export const removeFromCart = catchAsync(async (req: AuthRequest, res: Response) => {
  const { itemId } = req.params;
  const cart = await Cart.findOne({ userId: req.user!.userId });
  if (!cart) throw new ApiError(404, 'Cart not found');
  cart.items = cart.items.filter(i => i._id?.toString() !== itemId);
  await cart.save();
  sendResponse(res, { statusCode: 200, success: true, message: 'Item removed', data: cart });
});

export const clearCart = catchAsync(async (req: AuthRequest, res: Response) => {
  await Cart.findOneAndUpdate({ userId: req.user!.userId }, { $set: { items: [] } });
  sendResponse(res, { statusCode: 200, success: true, message: 'Cart cleared', data: null });
});
