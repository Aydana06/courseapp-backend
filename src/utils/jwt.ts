import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { config } from '../config.js';
import type { User } from '../types.js';

export function signAccessToken(user: User): string {
   console.log("JWT_SECRET in signAccessToken:", config.JWT_SECRET); 
  const payload = {
    sub: user._id.toString(),
    role: user.role || "student",
    email: user.email,
    firstName: user.firstName,  
    lastName: user.lastName 
  };

  const options: SignOptions = {
    expiresIn: config.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign(payload, config.JWT_SECRET as Secret, options);
}

export function signRefreshToken(user: User): string {
  const payload = {
    sub: user._id.toString(),
  };

  const options: SignOptions = {
    expiresIn: config.REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign(payload, config.REFRESH_SECRET as Secret, options);
}

export function verifyAccessToken(token: string) {
  console.log("JWT_SECRET in verifyAccessToken:", config.JWT_SECRET); 

  try {
    const payload = jwt.verify(token, config.JWT_SECRET as Secret) as jwt.JwtPayload;
    console.log("Decoded payload:", payload);
    return payload;
  } catch (err) {
    console.error("Invalid token:", err);
    throw err;
  }
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.REFRESH_SECRET) as jwt.JwtPayload;
}
