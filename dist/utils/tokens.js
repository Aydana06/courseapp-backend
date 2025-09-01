// utils/tokens.ts
import jwt from "jsonwebtoken";
import crypto from "crypto";
const ACCESS_TTL = "15m";
const REFRESH_TTL_DAYS = 30;
export function signAccessToken(user) {
    const payload = { sub: user.id.toString(), role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
}
export function generateRefreshTokenValue() {
    // 64 bytes random -> 128 hex chars
    return crypto.randomBytes(64).toString("hex");
}
export function sha256(input) {
    return crypto.createHash("sha256").update(input).digest("hex");
}
export function refreshExpiryDate() {
    const d = new Date();
    d.setDate(d.getDate() + REFRESH_TTL_DAYS);
    return d;
}
