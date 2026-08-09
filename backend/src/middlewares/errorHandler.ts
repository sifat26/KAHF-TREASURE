import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ZodError } from 'zod';

export function globalErrorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: { name: err.constructor.name },
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: { issues: err.issues },
    });
  }

  if (err instanceof Error) {
    // Mongoose duplicate key
    if (err.message.includes('E11000')) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate key error',
        error: { detail: err.message },
      });
    }
    // Multer file size
    if (err.message.includes('File too large')) {
      return res.status(413).json({
        success: false,
        message: 'File too large',
      });
    }
    return res.status(500).json({
      success: false,
      message: err.message,
      error: { name: err.name },
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: 'API not found',
    error: { path: req.originalUrl, message: 'The requested route does not exist' },
  });
}
