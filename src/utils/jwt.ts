import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { config } from '../config.js';
import type { User } from '../types.js';

export function signAccessToken(user: User): string {
  const payload = {
    sub: user.id.toString(),
    role: user.role || "student",
    email: user.email,
  };

  const options: SignOptions = {
    expiresIn: config.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"], // 👈 string-г зөвшөөрүүлж байна
  };

  return jwt.sign(payload, config.JWT_SECRET as Secret, options);
}

export function signRefreshToken(user: User): string {
  const payload = {
    sub: user.id.toString(),
  };

  const options: SignOptions = {
    expiresIn: config.REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign(payload, config.REFRESH_SECRET as Secret, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.REFRESH_SECRET) as jwt.JwtPayload;
}
