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

const TOKEN_COOKIE_NAME = 'kahf_token';

/** Extract token from httpOnly cookie, falling back to Authorization header for API clients. */
function extractToken(req: Request): string | undefined {
  // Priority 1: httpOnly cookie (set by our login/register endpoints)
  const cookieToken = req.cookies?.[TOKEN_COOKIE_NAME];
  if (cookieToken) return cookieToken;

  // Priority 2: Bearer header (for mobile/API clients that can't use cookies)
  const headerToken = req.headers.authorization?.split(' ')[1];
  if (headerToken) return headerToken;

  return undefined;
}

export const auth = (...requiredRoles: string[]) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = extractToken(req);
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
