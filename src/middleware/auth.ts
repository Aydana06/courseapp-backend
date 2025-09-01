import { Request, Response, NextFunction } from 'express';

import { verifyAccessToken } from "../utils/jwt.js";

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
  console.log("Authorization header:", header);

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = header.split(" ")[1]; // slice биш split
  try {
    const payload = verifyAccessToken(token); 
    console.log("Decoded payload:", payload);

    req.user = { 
      id: String(payload.sub), 
      role: String(payload.role),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email
    };
    next();
  } catch (err: any) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
