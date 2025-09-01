import jwt from "jsonwebtoken";
import { config } from '../config.js';
export function signAccessToken(user) {
    console.log("JWT_SECRET in signAccessToken:", config.JWT_SECRET);
    const payload = {
        sub: user._id.toString(),
        role: user.role || "student",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };
    const options = {
        expiresIn: config.JWT_EXPIRES_IN,
    };
    return jwt.sign(payload, config.JWT_SECRET, options);
}
export function signRefreshToken(user) {
    const payload = {
        sub: user._id.toString(),
    };
    const options = {
        expiresIn: config.REFRESH_EXPIRES_IN,
    };
    return jwt.sign(payload, config.REFRESH_SECRET, options);
}
export function verifyAccessToken(token) {
    console.log("JWT_SECRET in verifyAccessToken:", config.JWT_SECRET);
    try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        console.log("Decoded payload:", payload);
        return payload;
    }
    catch (err) {
        console.error("Invalid token:", err);
        throw err;
    }
}
export function verifyRefreshToken(token) {
    return jwt.verify(token, config.REFRESH_SECRET);
}
