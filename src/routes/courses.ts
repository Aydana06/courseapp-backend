// src/routes/courses.ts
import { Router } from "express";
import type { Response } from "express";
import CourseModel, { ICourse } from "../models/Course.js";
import { authGuard, AuthRequest } from "../middleware/auth.js";

const router = Router();

// бүх курс (эсвэл maxId хүртэлх курс)
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const maxId = Number(req.query.maxId);
    let query = {};
    if (!isNaN(maxId)) {
      query = { _id: { $lte: maxId } }; // ObjectId-г хэрэгжүүлэхээр бол өөр логик хэрэгтэй
    }

    const courses = await CourseModel.find(query);
    res.json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});

// Featured курс (эхний 3-ыг санал болгоно)
router.get("/featured", async (_req, res: Response) => {
  try {
    const courses = await CourseModel.find().limit(3);
    res.json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});

// Нэг курс авах
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course олдсонгүй" });
    }
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});



export default router;
