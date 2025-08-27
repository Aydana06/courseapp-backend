import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

export function authGuard(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const token = header.slice(7);
    const payload = verifyAccessToken(token); // { sub, role, firstName?, lastName? }
    req.user = { 
      id: String(payload.sub), 
      role: String(payload.role),
      firstName: payload.firstName, // токенд байвал авна
      lastName: payload.lastName
    };
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

