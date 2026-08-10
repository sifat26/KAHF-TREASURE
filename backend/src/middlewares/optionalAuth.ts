import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/User';
import { AuthRequest } from './auth';

const TOKEN_COOKIE_NAME = 'kahf_token';

/** Extract token from httpOnly cookie, falling back to Authorization header. */
function extractToken(req: Request): string | undefined {
  const cookieToken = req.cookies?.[TOKEN_COOKIE_NAME];
  if (cookieToken) return cookieToken;

  const headerToken = req.headers.authorization?.split(' ')[1];
  if (headerToken) return headerToken;

  return undefined;
}

/**
 * Optional authentication middleware.
 * If a valid token is present (cookie or header), it attaches `req.user`.
 * If no token or invalid token is present, it simply calls `next()` WITHOUT error.
 * This allows guest requests while still recognizing logged-in users.
 */
export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);
    if (!token) return next(); // Guest — no token, that's OK

    let decoded: JwtPayload & { userId: string; role: string; email: string };
    try {
      decoded = jwt.verify(token, config.jwt.secret) as any;
    } catch {
      return next(); // Invalid/expired token — treat as guest
    }

    const user = await User.findById(decoded.userId).select('+password');
    if (!user || user.isBlocked) return next(); // User blocked or not found — treat as guest

    req.user = decoded;
    next();
  } catch {
    next(); // Any error — treat as guest
  }
};
