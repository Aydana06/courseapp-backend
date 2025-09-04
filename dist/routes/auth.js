import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import { sha256, generateRefreshTokenValue, refreshExpiryDate, signAccessToken } from "../utils/tokens.js";
import { setRefreshCookie, clearRefreshCookie } from "../utils/cookies.js";
const router = Router();
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Имэйл буруу байна" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Нууц үг буруу байна" });
        }
        // Сүүлд нэвтэрсэн огноог шинэчлэх
        user.lastLoginAt = new Date();
        await user.save();
        // Access Token гаргах
        const accessToken = signAccessToken(user);
        const { password: _pw, ...safeUser } = user.toObject();
        return res.json({
            success: true,
            message: "Амжилттай нэвтэрлээ",
            data: {
                user: { ...safeUser, id: user._id },
                accessToken
            }
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Серверийн алдаа" });
    }
});
/** REGISTER */
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, phone } = req.body;
        // Email давхцаж байгаа эсэх шалгах
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Энэ имэйлээр бүртгэл хийгдсэн байна" });
        }
        // Нууц үг хэшлэх
        const hashed = await bcrypt.hash(password, 10);
        // Хэрэглэгч үүсгэх
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashed,
            phone,
            role: role || "student",
        });
        // Access + Refresh token гаргах
        const accessToken = signAccessToken(user);
        const plainRefresh = generateRefreshTokenValue();
        await RefreshToken.create({
            user: user._id,
            tokenHash: sha256(plainRefresh),
            expiresAt: refreshExpiryDate(),
        });
        setRefreshCookie(res, plainRefresh);
        const { password: _pw, ...safeUser } = user.toObject();
        return res.status(201).json({
            success: true,
            message: "Бүртгэл амжилттай",
            data: {
                user: { ...safeUser, id: user._id },
                accessToken
            }
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Серверийн алдаа" });
    }
});
/** REFRESH */
router.post("/refresh", async (req, res) => {
    const cookieToken = req.cookies?.["refresh_token"];
    if (!cookieToken)
        return res.status(401).json({ message: "Refresh token байхгүй" });
    const tokenHash = sha256(cookieToken);
    const existing = await RefreshToken.findOne({ tokenHash }).populate("user");
    if (!existing || !existing.user) {
        clearRefreshCookie(res);
        return res.status(401).json({ message: "Refresh token хүчингүй" });
    }
    if (existing.expiresAt < new Date()) {
        clearRefreshCookie(res);
        return res.status(401).json({ message: "Refresh token хугацаа дууссан" });
    }
    // Rotate
    const newPlain = generateRefreshTokenValue();
    await RefreshToken.create({
        user: existing.user._id,
        tokenHash: sha256(newPlain),
        expiresAt: refreshExpiryDate(),
    });
    existing.revokedAt = new Date();
    await existing.save();
    const newAccessToken = signAccessToken(existing.user);
    setRefreshCookie(res, newPlain);
    return res.json({
        success: true,
        message: "Access token шинэчлэгдлээ",
        data: { accessToken: newAccessToken }
    });
});
/** LOGOUT */
router.post("/logout", async (req, res) => {
    clearRefreshCookie(res);
    return res.json({ success: true });
});
export default router;
