import { Response } from 'express';
import { Category } from '../models/Category';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';
import { getPagination } from '../utils/pagination';
import { z } from 'zod';
import { slugify } from '../utils/slugify';

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  type: z.enum(['product', 'attar', 'book', 'clothing', 'other']).default('product'),
  attributesSchema: z.record(z.string(), z.string()).default({}),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const createCategory = catchAsync(async (req: AuthRequest, res: Response) => {
  const body = categorySchema.parse(req.body);
  if (!body.slug) body.slug = slugify(body.name);
  const cat = await Category.create(body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Category created', data: cat });
});

export const getCategories = catchAsync(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = { deleted: false };
  if (req.query.type) filter.type = req.query.type;
  if (req.query.parentId) filter.parentId = req.query.parentId;
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';

  const cats = await Category.find(filter).populate('parentId').sort('order');
  sendResponse(res, { statusCode: 200, success: true, message: 'Categories retrieved', data: cats });
});

export const getCategory = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const mongoose = await import('mongoose');
  const isValidObjectId = mongoose.default.isValidObjectId(id);
  const filter: Record<string, unknown> = { deleted: false };
  if (isValidObjectId) {
    filter.$or = [{ _id: id }, { slug: id }];
  } else {
    filter.slug = id;
  }
  const cat = await Category.findOne(filter).populate('parentId');
  if (!cat) throw new ApiError(404, 'Category not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Category retrieved', data: cat });
});

export const updateCategory = catchAsync(async (req: AuthRequest, res: Response) => {
  // Build the update object, explicitly handling parentId: null (clearing parent)
  const updateData: Record<string, unknown> = { ...req.body };

  // If parentId is explicitly null or empty string, set it to null in DB
  if (req.body.parentId === null || req.body.parentId === '') {
    updateData.parentId = null;
  }

  const cat = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!cat) throw new ApiError(404, 'Category not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Category updated', data: cat });
});

export const deleteCategory = catchAsync(async (req: AuthRequest, res: Response) => {
  const cat = await Category.findByIdAndUpdate(req.params.id, { $set: { deleted: true, isActive: false } }, { new: true });
  if (!cat) throw new ApiError(404, 'Category not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Category deleted', data: null });
});
