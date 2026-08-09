import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { ApiError } from '../utils/ApiError';
import { User } from '../models/User';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    email: string;
  };
}

export const auth = (...requiredRoles: string[]) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new ApiError(401, 'You are not authorized');
      }

      let decoded: JwtPayload & { userId: string; role: string; email: string };
      try {
        decoded = jwt.verify(token, config.jwt.secret) as any;
      } catch {
        throw new ApiError(403, 'Invalid or expired token');
      }

      // Check if user is blocked
      const user = await User.findById(decoded.userId).select('+password');
      if (!user || user.isBlocked) {
        throw new ApiError(401, 'User not found or blocked');
      }

      req.user = decoded;

      // SUPER_ADMIN bypasses all role checks
      if (decoded.role === 'super_admin') {
        return next();
      }

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ApiError(403, 'Forbidden: insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
