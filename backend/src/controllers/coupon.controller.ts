import { Response } from 'express';
import { Coupon } from '../models/Coupon';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';
import { z } from 'zod';

const couponSchema = z.object({
  code: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(0),
  minOrderAmount: z.number().min(0).optional(),
  maxDiscountAmount: z.number().min(0).optional(),
  usageLimit: z.number().int().min(1),
  validFrom: z.string().transform(s => new Date(s)),
  validUntil: z.string().transform(s => new Date(s)),
  appliesToAllProducts: z.boolean().default(true),
});

export const createCoupon = catchAsync(async (req: AuthRequest, res: Response) => {
  const body = couponSchema.parse(req.body);
  body.code = body.code.toUpperCase();
  const coupon = await Coupon.create(body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Coupon created', data: coupon });
});

export const getCoupons = catchAsync(async (req: AuthRequest, res: Response) => {
  const coupons = await Coupon.find({ isActive: true }).sort('-createdAt');
  sendResponse(res, { statusCode: 200, success: true, message: 'Coupons retrieved', data: coupons });
});

export const validateCoupon = catchAsync(async (req: AuthRequest, res: Response) => {
  const { code, amount } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
  if (!coupon) throw new ApiError(404, 'Coupon not found');
  if (coupon.usedCount >= coupon.usageLimit) throw new ApiError(400, 'Coupon usage limit reached');
  if (new Date() < coupon.validFrom || new Date() > coupon.validUntil) throw new ApiError(400, 'Coupon expired');

  let discount = 0;
  if (coupon.type === 'percentage') {
    discount = (amount * coupon.value) / 100;
    if (coupon.maxDiscountAmount) discount = Math.min(discount, coupon.maxDiscountAmount);
  } else {
    discount = coupon.value;
  }

  if (coupon.minOrderAmount && amount < coupon.minOrderAmount) {
    throw new ApiError(400, `Minimum order amount: ${coupon.minOrderAmount}`);
  }

  sendResponse(res, {
    statusCode: 200, success: true, message: 'Coupon valid',
    data: { code: coupon.code, discount, type: coupon.type, value: coupon.value },
  });
});
