import { Response } from 'express';
import { Product } from '../models/Product';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';
import { getPagination } from '../utils/pagination';
import { z } from 'zod';
import { slugify } from '../utils/slugify';

const variantSchema = z.object({
  label: z.string(),
  stock: z.number().int().min(0).default(0),
  priceOverride: z.number().min(0).optional(),
  sku: z.string().optional(),
});

const productSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string(),
  brand: z.string().optional(),
  basePrice: z.number().min(0),
  compareAtPrice: z.number().min(0).optional(),
  images: z.array(z.string()).default([]),
  variants: z.array(variantSchema).default([]),
  attributes: z.record(z.string(), z.unknown()).default({}),
  tags: z.array(z.string()).default([]),
  sku: z.string().optional(),
  lowStockThreshold: z.number().int().min(0).default(5),
  newArrival: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isOnOffer: z.boolean().default(false),
  productOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const createProduct = catchAsync(async (req: AuthRequest, res: Response) => {
  const body = productSchema.parse(req.body);
  if (!body.slug) body.slug = slugify(body.title);
  const existing = await Product.findOne({ slug: body.slug });
  if (existing) throw new ApiError(409, 'Slug already exists');

  const product = await Product.create(body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Product created', data: product });
});

export const getProducts = catchAsync(async (req: AuthRequest, res: Response) => {
  const { page, limit, skip, sort } = getPagination(req.query);
  const filter: Record<string, unknown> = { deleted: false };

  if (req.query.category) filter.categoryId = req.query.category;
  if (req.query.search) filter.$text = { $search: String(req.query.search) };
  if (req.query.minPrice || req.query.maxPrice) {
    filter.basePrice = {};
    if (req.query.minPrice) (filter.basePrice as any).$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) (filter.basePrice as any).$lte = Number(req.query.maxPrice);
  }
  if (req.query.tags) {
    filter.tags = { $in: String(req.query.tags).split(',') };
  }
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
  if (req.query.isFeatured === 'true') filter.isFeatured = true;
  if (req.query.newArrival === 'true') filter.newArrival = true;

  const [products, total] = await Promise.all([
    Product.find(filter).populate('categoryId').sort(sort).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  sendResponse(res, {
    statusCode: 200, success: true, message: 'Products retrieved',
    data: products,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

export const getProduct = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const mongoose = await import('mongoose');
  const isValidObjectId = mongoose.default.isValidObjectId(id);
  const filter: Record<string, unknown> = { deleted: false };
  if (isValidObjectId) {
    filter.$or = [{ _id: id }, { slug: id }];
  } else {
    filter.slug = id;
  }
  const product = await Product.findOne(filter).populate('categoryId');
  if (!product) throw new ApiError(404, 'Product not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Product retrieved', data: product });
});

export const updateProduct = catchAsync(async (req: AuthRequest, res: Response) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!product) throw new ApiError(404, 'Product not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Product updated', data: product });
});

export const deleteProduct = catchAsync(async (req: AuthRequest, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { $set: { deleted: true, isActive: false } }, { new: true });
  if (!product) throw new ApiError(404, 'Product not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Product deleted', data: null });
});
