import { Router } from "express";
import { authGuard } from "../middleware/auth.js";
import CartModel from "../models/Cart.js";
import CourseModel from "../models/Course.js";
const router = Router();
// 1️⃣ Хэрэглэгчийн сагс дахь курсуудыг авах
router.get("/", authGuard, async (req, res) => {
    try {
        let cart = await CartModel.findOne({ user: req.user?.id }).populate("courses");
        if (!cart) {
            cart = await CartModel.create({ user: req.user?.id, courses: [] });
        }
        return res.json({ success: true, data: cart.courses });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// 2️⃣ Сагсанд курс нэмэх
router.post("/:courseId", authGuard, async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.courseId);
        if (!course)
            return res.status(404).json({ success: false, message: "Курс олдсонгүй" });
        let cart = await CartModel.findOne({ user: req.user?.id });
        if (!cart) {
            cart = await CartModel.create({ user: req.user?.id, courses: [] });
        }
        if (!cart.courses.includes(course._id)) {
            cart.courses.push(course._id);
            await cart.save();
        }
        return res.json({ success: true, data: cart.courses });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// 3️⃣ Сагснаас курс устгах
router.delete("/:courseId", authGuard, async (req, res) => {
    try {
        const cart = await CartModel.findOne({ user: req.user?.id });
        if (!cart)
            return res.status(404).json({ success: false, message: "Сагс олдсонгүй" });
        cart.courses = cart.courses.filter((id) => id.toString() !== req.params.courseId);
        await cart.save();
        return res.json({ success: true, data: cart.courses });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
export default router;
