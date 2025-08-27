import { Router } from "express";
import { authGuard } from "../middleware/auth.js";
import CertificateModel from "../models/Certificate.js";
const router = Router();
// Хэрэглэгчийн бүх сертификат авах
router.get("/user/:userId", authGuard, async (req, res) => {
    try {
        // зөвхөн өөрийн сертификат эсвэл админ харж болно
        if (req.user?.id !== req.params.userId && req.user?.role !== "admin") {
            return res.status(403).json({ success: false, message: "Үйлдэл хийх эрхгүй" });
        }
        const certificates = await CertificateModel.find({ userId: req.params.userId }).populate("courseId");
        res.json({ success: true, data: certificates });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// Сертификат үүсгэх
router.post("/", authGuard, async (req, res) => {
    try {
        const data = req.body;
        data.userId = req.user?.id;
        const certificate = await CertificateModel.create(data);
        res.status(201).json({ success: true, data: certificate });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
// Сертификатыг хүчингүй болгох
router.put("/revoke/:id", authGuard, async (req, res) => {
    try {
        const cert = await CertificateModel.findById(req.params.id);
        if (!cert)
            return res.status(404).json({ success: false, message: "Сертификат олдсонгүй" });
        cert.status = "issued";
        await cert.save();
        res.json({ success: true });
    }
    catch {
        res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
});
export default router;
