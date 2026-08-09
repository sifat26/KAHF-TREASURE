import { Response } from 'express';
import { uploadBufferToCloudinary } from '../config/cloudinary';
import { AuthRequest } from '../middlewares/auth';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ApiError } from '../utils/ApiError';

export const uploadImages = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    throw new ApiError(400, 'No files uploaded');
  }

  const urls: string[] = [];
  for (const file of req.files as Express.Multer.File[]) {
    const url = await uploadBufferToCloudinary(file.buffer);
    urls.push(url);
  }

  sendResponse(res, {
    statusCode: 200, success: true, message: 'Images uploaded to Cloudinary',
    data: { urls, count: urls.length },
  });
});

export const uploadSingleImage = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded');
  }
  const url = await uploadBufferToCloudinary(req.file.buffer);
  sendResponse(res, {
    statusCode: 200, success: true, message: 'Image uploaded to Cloudinary',
    data: { url },
  });
});
