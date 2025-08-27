// src/routes/courses.ts
import { Router } from "express";
import CourseModel from "../models/Course.js";
const router = Router();
// бүх курс (эсвэл maxId хүртэлх курс)
router.get("/", async (req, res) => {
    try {
        const maxId = Number(req.query.maxId);
        let query = {};
        if (!isNaN(maxId)) {
            query = { _id: { $lte: maxId } }; // ObjectId-г хэрэгжүүлэхээр бол өөр логик хэрэгтэй
        }
        const courses = await CourseModel.find(query);
        res.json({ success: true, data: courses });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// Featured курс (эхний 3-ыг санал болгоно)
router.get("/featured", async (_req, res) => {
    try {
        const courses = await CourseModel.find().limit(3);
        res.json({ success: true, data: courses });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// Нэг курс авах
router.get("/:id", async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course олдсонгүй" });
        }
        res.json({ success: true, data: course });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
export default router;
