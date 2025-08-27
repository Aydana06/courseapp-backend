import { Router } from "express";
import { authGuard } from "../middleware/auth.js";
import UserModel from "../models/User.js";
import CourseModel from "../models/Course.js";
const router = Router();
// 1️⃣ Хэрэглэгчийн сагс + enrolled курс авах
router.get("/", authGuard, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user?.id)
            .populate("cart")
            .populate("enrolledCourses");
        if (!user)
            return res.status(404).json({ success: false, message: "User олдсонгүй" });
        res.json({
            success: true,
            data: {
                cart: user.cart,
                enrolledCourses: user.enrolledCourses
            }
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// 2️⃣ Сагсанд курс нэмэх
router.post("/cart/:courseId", authGuard, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user?.id);
        if (!user)
            return res.status(404).json({ success: false, message: "User олдсонгүй" });
        const course = await CourseModel.findById(req.params.courseId);
        if (!course)
            return res.status(404).json({ success: false, message: "Курс олдсонгүй" });
        if (!user.cart.includes(course._id) && !user.enrolledCourses.includes(course._id)) {
            user.cart.push(course._id);
            await user.save();
        }
        res.json({ success: true, data: user.cart });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// 3️⃣ Сагснаас курс устгах
router.delete("/cart/:courseId", authGuard, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user?.id);
        if (!user)
            return res.status(404).json({ success: false, message: "User олдсонгүй" });
        user.cart = user.cart.filter(id => id.toString() !== req.params.courseId);
        await user.save();
        res.json({ success: true, data: user.cart });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// 4️⃣ Enrollment хийх (сагснаас шилжүүлэх)
router.post("/enroll/:courseId", authGuard, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user?.id);
        if (!user)
            return res.status(404).json({ success: false, message: "User олдсонгүй" });
        const course = await CourseModel.findById(req.params.courseId);
        if (!course)
            return res.status(404).json({ success: false, message: "Курс олдсонгүй" });
        user.cart = user.cart.filter(id => id.toString() !== course._id.toString());
        if (!user.enrolledCourses.includes(course._id)) {
            user.enrolledCourses.push(course._id);
            await user.save();
        }
        res.json({ success: true, data: user.enrolledCourses });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
export default router;
