import { Router } from "express";
import { authGuard } from "../middleware/auth.js";
import UserModel from "../models/User.js";
import CourseModel from "../models/Course.js";
const router = Router();
// Сагс ба enrollment авах
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
                cart: user.cart || [],
                enrolledCourses: user.enrolledCourses || []
            }
        });
    }
    catch (err) {
        console.error('Error fetching cart and enrolled courses:', err);
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// Сагсанд нэмэх
router.post("/cart/:courseId", authGuard, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user?.id);
        if (!user)
            return res.status(404).json({ success: false, message: "User олдсонгүй" });
        const course = await CourseModel.findById(req.params.courseId);
        if (!course)
            return res.status(404).json({ success: false, message: "Курс олдсонгүй" });
        // ObjectId харьцуулахдаа equals() ашиглана
        if (!user.cart.some(id => id.equals(course._id)) &&
            !user.enrolledCourses.some(id => id.equals(course._id))) {
            user.cart.push(course._id);
            await user.save();
        }
        // populate-тэй буцаана
        const updatedUser = await UserModel.findById(req.user?.id).populate("cart");
        res.json({ success: true, data: updatedUser?.cart });
    }
    catch (err) {
        console.error('Error adding course to cart:', err);
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// Сагснаас устгах
router.delete("/cart/:courseId", authGuard, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const user = await UserModel.findById(req.user.id);
        if (!user)
            return res.status(404).json({ success: false, message: "User олдсонгүй" });
        // cart дотор зөвхөн ObjectId-ууд байгаа
        user.cart = user.cart.filter((id) => id.toString() !== req.params.courseId);
        await user.save();
        // Дахиж populate хийж буцаах
        const updatedUser = await UserModel.findById(req.user.id).populate("cart");
        res.json({ success: true, data: updatedUser?.cart });
    }
    catch (err) {
        console.error('Error removing course from cart:', err);
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// Enrollment хийх
router.post("/enroll/:courseId", authGuard, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user?.id);
        if (!user)
            return res.status(404).json({ success: false, message: "User олдсонгүй" });
        const course = await CourseModel.findById(req.params.courseId);
        if (!course)
            return res.status(404).json({ success: false, message: "Курс олдсонгүй" });
        // cart-аас хасна
        user.cart = user.cart.filter(id => id.toString() !== course._id.toString());
        // enrolledCourses-д нэмнэ
        if (!user.enrolledCourses.includes(course._id)) {
            user.enrolledCourses.push(course._id);
            await user.save();
        }
        res.json({ success: true, data: user.enrolledCourses });
    }
    catch (err) {
        console.error('Error enrolling in course:', err);
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
export default router;
