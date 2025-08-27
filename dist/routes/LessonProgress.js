// routes/lessonProgress.ts
import { Router } from "express";
import LessonProgress from "../models/LessonProgress.js";
const router = Router();
// Update or create progress
router.post("/", async (req, res) => {
    try {
        const { userId, lessonId, progress, completed } = req.body;
        const result = await LessonProgress.findOneAndUpdate({ userId, lessonId }, { progress, completed, updatedAt: new Date() }, { upsert: true, new: true });
        res.json({ success: true, data: result });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});
// Get progress of a user
router.get("/:userId", async (req, res) => {
    try {
        const progresses = await LessonProgress.find({ userId: req.params.userId })
            .populate("lessonId");
        res.json({ success: true, data: progresses });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});
export default router;
