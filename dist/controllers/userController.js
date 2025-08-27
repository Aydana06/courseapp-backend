import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, phone } = req.body;
        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        // 🔑 JWT token гаргах
        const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1h" });
        // 🔒 Нууц үгийг хариултад оруулахгүй
        const { password: _pw, ...safeUser } = newUser.toObject();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { user: safeUser, token },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
