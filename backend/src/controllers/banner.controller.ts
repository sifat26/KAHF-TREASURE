import { Response } from 'express';
import { Banner } from '../models/Banner';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';

export const createBanner = catchAsync(async (req: AuthRequest, res: Response) => {
  const banner = await Banner.create(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Banner created', data: banner });
});

export const getBanners = catchAsync(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = { deleted: false };
  if (req.query.position) filter.position = req.query.position;
  if (req.user!.role === 'customer') filter.isActive = true;
  const banners = await Banner.find(filter).sort('order');
  sendResponse(res, { statusCode: 200, success: true, message: 'Banners retrieved', data: banners });
});

export const updateBanner = catchAsync(async (req: AuthRequest, res: Response) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  if (!banner) throw new ApiError(404, 'Banner not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Banner updated', data: banner });
});

export const deleteBanner = catchAsync(async (req: AuthRequest, res: Response) => {
  await Banner.findByIdAndUpdate(req.params.id, { $set: { deleted: true, isActive: false } });
  sendResponse(res, { statusCode: 200, success: true, message: 'Banner deleted', data: null });
});
