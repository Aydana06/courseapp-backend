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

// Шинэ курс үүсгэх (admin/instructor эрхтэй)
router.post("/", authGuard, async (req: AuthRequest, res: Response) => {
  try {
    // Зөвхөн admin эсвэл instructor эрхтэй хэрэглэгч
    if (req.user?.role !== 'admin' && req.user?.role !== 'instructor') {
      return res.status(403).json({ success: false, message: "Хандах эрхгүй" });
    }

    const courseData = {
      ...req.body,
      instructor: req.user?.firstName + ' ' + req.user?.lastName
    };

    const course = new CourseModel(courseData);
    await course.save();

    res.status(201).json({ success: true, data: course });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ success: false, message: "Сургалт үүсгэхэд алдаа гарлаа" });
  }
});

// Курс шинэчлэх (admin/instructor эрхтэй)
router.put("/:id", authGuard, async (req: AuthRequest, res: Response) => {
  try {
    // Зөвхөн admin эсвэл instructor эрхтэй хэрэглэгч
    if (req.user?.role !== 'admin' && req.user?.role !== 'instructor') {
      return res.status(403).json({ success: false, message: "Хандах эрхгүй" });
    }

    const course = await CourseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: "Course олдсонгүй" });
    }

    res.json({ success: true, data: course });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ success: false, message: "Сургалт шинэчлэхэд алдаа гарлаа" });
  }
});

// Курс устгах (admin эрхтэй)
router.delete("/:id", authGuard, async (req: AuthRequest, res: Response) => {
  try {
    // Зөвхөн admin эрхтэй хэрэглэгч
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Хандах эрхгүй" });
    }

    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course олдсонгүй" });
    }

    res.json({ success: true, message: "Сургалт амжилттай устгагдлаа" });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ success: false, message: "Сургалт устгахад алдаа гарлаа" });
  }
});

export default router;
