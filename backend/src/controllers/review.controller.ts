import { Response } from 'express';
import { Review } from '../models/Review';
import { Product } from '../models/Product';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';
import { getPagination } from '../utils/pagination';

export const createReview = catchAsync(async (req: AuthRequest, res: Response) => {
  const { productId, orderId, customerName, rating, comment } = req.body;
  const review = await Review.create({ productId, orderId, customerName, rating, comment });

  // Update product average rating
  const reviews = await Review.find({ productId, isApproved: true });
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  await Product.findByIdAndUpdate(productId, { averageRating: Math.round(avg * 10) / 10, reviewCount: reviews.length });

  sendResponse(res, { statusCode: 201, success: true, message: 'Review submitted', data: review });
});

export const getReviews = catchAsync(async (req: AuthRequest, res: Response) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter: Record<string, unknown> = {};
  if (req.query.productId) filter.productId = req.query.productId;
  if (req.query.showOnHomepage === 'true') filter.showOnHomepage = true;
  if (req.user!.role === 'customer') filter.isApproved = true;

  const [reviews, total] = await Promise.all([
    Review.find(filter).sort('-createdAt').skip(skip).limit(limit),
    Review.countDocuments(filter),
  ]);

  sendResponse(res, {
    statusCode: 200, success: true, message: 'Reviews retrieved',
    data: reviews, meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

export const approveReview = catchAsync(async (req: AuthRequest, res: Response) => {
  const review = await Review.findByIdAndUpdate(
    req.params.id, { $set: { isApproved: true, showOnHomepage: req.body.showOnHomepage ?? true } },
    { new: true }
  );
  if (!review) throw new ApiError(404, 'Review not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Review approved', data: review });
});
