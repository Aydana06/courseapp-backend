// routes/comments.ts
import { Router } from "express";
import mongoose from "mongoose";
import { authGuard, AuthRequest } from "../middleware/auth.js";
import CommentModel from "../models/Comment.js";

const router = Router();

//  Бүх коммент авах
router.get("/", async (req, res) => {
  try {
    const { courseId, limit } = req.query as { courseId?: string; limit?: string };
    const filter: any = {};
    if (courseId) filter.courseId = courseId;
    const lim = limit ? parseInt(limit, 10) : undefined;
    const query = CommentModel.find(filter).sort({ createdAt: -1 });
    if (lim) query.limit(lim);
    const comments = await query.exec();
    res.json({ success: true, data: comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});

//  Шинэ коммент нэмэх (зөвхөн нэвтэрсэн хэрэглэгч)
router.post("/", authGuard, async (req: AuthRequest, res) => {
  try {
    const { content, rating, courseId } = req.body;
    const user = req.user;

    if (!user) return res.status(401).json({ success: false, message: "Нэвтрэх шаардлагатай" });
    if (!content) return res.status(400).json({ success: false, message: "Сэтгэгдэл шаардлагатай" });

    const comment = await CommentModel.create({
      userId: new mongoose.Types.ObjectId(user.id), // String -> ObjectId
      courseId: courseId ? new mongoose.Types.ObjectId(courseId) : undefined,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      role: user.role || "student",
      content,
      rating: rating || 5
    });

    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});

//  Коммент устгах (зөвхөн өөрийнхөө эсвэл админ)
router.delete("/:id", authGuard, async (req: AuthRequest, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) return res.status(404).json({ success: false, message: "Сэтгэгдэл олдсонгүй" });

    if (comment.userId.toString() !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({ success: false, message: "Үйлдэл хийх эрхгүй" });
    }

    await CommentModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Сэтгэгдэл устгагдлаа" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});

//  Нэг коммент авах
router.get("/:id", async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Сэтгэгдэл олдсонгүй" });
    }
    res.json({ success: true, data: comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});


export default router;
