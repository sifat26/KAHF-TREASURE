import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/User';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const register = catchAsync(async (req: AuthRequest, res: Response) => {
  const body = registerSchema.parse(req.body);
  const existing = await User.findOne({ email: body.email });
  if (existing) throw new ApiError(409, 'Email already registered');

  const hashedPassword = await bcrypt.hash(body.password, config.bcrypt_salt_rounds);
  const user = await User.create({ ...body, password: hashedPassword, role: 'customer' });

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expires_in as any }
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Registration successful',
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    },
  });
});

export const login = catchAsync(async (req: AuthRequest, res: Response) => {
  const body = loginSchema.parse(req.body);
  const user = await User.findOne({ email: body.email }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid credentials');
  if (user.isBlocked) throw new ApiError(403, 'Account blocked');

  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expires_in as any }
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    },
  });
});

export const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.userId).select('-password');
  if (!user) throw new ApiError(404, 'User not found');
  sendResponse(res, { statusCode: 200, success: true, message: 'Profile retrieved', data: user });
});

export const updateProfile = catchAsync(async (req: AuthRequest, res: Response) => {
  const { name, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user!.userId,
    { $set: { ...(name && { name }), ...(phone && { phone }) } },
    { new: true }
  ).select('-password');
  sendResponse(res, { statusCode: 200, success: true, message: 'Profile updated', data: user });
});

export const addAddress = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.userId);
  if (!user) throw new ApiError(404, 'User not found');
  user.addresses.push(req.body);
  if (req.body.isDefault) {
    user.addresses.forEach(a => { a.isDefault = false; });
  }
  await user.save();
  sendResponse(res, { statusCode: 201, success: true, message: 'Address added', data: user.addresses });
});

// Admin creation (super_admin/admin only)
export const createAdmin = catchAsync(async (req: AuthRequest, res: Response) => {
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['admin', 'editor']).default('admin'),
  });
  const body = schema.parse(req.body);
  const hashedPassword = await bcrypt.hash(body.password, config.bcrypt_salt_rounds);
  const user = await User.create({ ...body, password: hashedPassword });
  sendResponse(res, {
    statusCode: 201, success: true, message: 'Admin created',
    data: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});
