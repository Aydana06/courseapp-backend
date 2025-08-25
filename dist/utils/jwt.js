import jwt from "jsonwebtoken";
import { config } from '../config.js';
export function signAccessToken(user) {
    const payload = {
        sub: user.id.toString(),
        role: user.role || "student",
        email: user.email,
    };
    const options = {
        expiresIn: config.JWT_EXPIRES_IN, // 👈 string-г зөвшөөрүүлж байна
    };
    return jwt.sign(payload, config.JWT_SECRET, options);
}
export function signRefreshToken(user) {
    const payload = {
        sub: user.id.toString(),
    };
    const options = {
        expiresIn: config.REFRESH_EXPIRES_IN,
    };
    return jwt.sign(payload, config.REFRESH_SECRET, options);
}
export function verifyAccessToken(token) {
    return jwt.verify(token, config.JWT_SECRET);
}
export function verifyRefreshToken(token) {
    return jwt.verify(token, config.REFRESH_SECRET);
}
