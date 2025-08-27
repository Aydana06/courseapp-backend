// routes/progressRoutes.ts
import { Router } from "express";
import CourseProgress from "../models/CourseProgress.js";
const router = Router();
// Нэг хэрэглэгчийн бүх progress
router.get("/user/:userId", async (req, res) => {
    const progresses = await CourseProgress.find({ userId: req.params.userId });
    res.json({ success: true, data: progresses });
});
export default router;
