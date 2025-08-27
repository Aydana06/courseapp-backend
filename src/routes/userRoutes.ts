import { Router } from "express";
import User from "../models/User.js";

const router = Router();

// Бүх хэрэглэгчид авах
router.get("/", async (_req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});

// Нэг хэрэглэгч авах
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User олдсонгүй" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});

// Хэрэглэгч засварлах
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ success: false, message: "User олдсонгүй" });
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Серверийн алдаа" });
  }
});

export default router;
