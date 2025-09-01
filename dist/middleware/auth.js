import { verifyAccessToken } from "../utils/jwt.js";
export function authGuard(req, res, next) {
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
    }
    catch (err) {
        console.error("JWT verify error:", err.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}
