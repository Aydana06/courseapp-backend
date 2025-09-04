import { Router } from "express";
import { authGuard } from "../middleware/auth.js";
import CourseProgressModel from "../models/CourseProgress.js";
import LessonProgressModel from "../models/LessonProgress.js";
import CourseModel from "../models/Course.js";
const router = Router();
// ✅ Нэг хэрэглэгчийн тодорхой курсийн progress авах
router.get("/user/:userId/course/:courseId", authGuard, async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        let progress = await CourseProgressModel.findOne({ userId, courseId });
        if (!progress) {
            // If no progress yet, initialize one with totalLessons from Course
            const course = await CourseModel.findById(courseId);
            const totalLessons = course?.details?.[0]?.lessons?.length || 0;
            progress = await CourseProgressModel.create({
                userId,
                courseId,
                completedLessons: [],
                progress: 0,
                totalLessons,
                startDate: new Date(),
                lastAccessed: new Date()
            });
        }
        res.json({ success: true, data: progress });
    }
    catch (err) {
        console.error("Progress fetch error:", err);
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// GET /progress/user
router.get("/user", authGuard, async (req, res) => {
    try {
        const data = await CourseProgressModel.find({ userId: req.user.id });
        res.json({ success: true, data });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// POST /progress/update
router.post("/update", authGuard, async (req, res) => {
    try {
        const { courseId, lessonId } = req.body;
        let progress = await CourseProgressModel.findOne({ userId: req.user.id, courseId });
        if (!progress) {
            const course = await CourseModel.findById(courseId);
            const totalLessons = course?.details?.[0]?.lessons?.length || 0;
            progress = await CourseProgressModel.create({
                userId: req.user.id,
                courseId,
                completedLessons: [],
                progress: 0,
                totalLessons
            });
        }
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            progress.progress = Math.round((progress.completedLessons.length / progress.totalLessons) * 100);
            progress.lastAccessed = new Date();
            await progress.save();
        }
        res.json({ success: true, data: progress });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// POST /progress/lesson/complete
router.post("/lesson/complete", authGuard, async (req, res) => {
    try {
        const { courseId, lessonId, timeSpent, quizScore } = req.body;
        let lp = await LessonProgressModel.findOne({ userId: req.user.id, courseId, lessonId });
        if (!lp) {
            lp = await LessonProgressModel.create({
                userId: req.user.id,
                courseId,
                lessonId,
                completed: true,
                completedAt: new Date(),
                timeSpent,
                quizScore
            });
        }
        else {
            lp.completed = true;
            lp.completedAt = new Date();
            lp.timeSpent = timeSpent;
            if (quizScore !== undefined)
                lp.quizScore = quizScore;
            await lp.save();
        }
        res.json({ success: true, data: lp });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
export default router;
