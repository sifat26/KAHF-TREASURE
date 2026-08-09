import { Response } from 'express';

export function sendResponse<T>(res: Response, opts: {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}) {
  res.status(opts.statusCode).json({
    success: opts.success,
    message: opts.message,
    ...(opts.data !== undefined && { data: opts.data }),
    ...(opts.meta !== undefined && { meta: opts.meta }),
  });
}
