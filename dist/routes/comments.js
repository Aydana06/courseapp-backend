import { Router } from 'express';
import { comments } from '../data/db.js';
import { authGuard } from '../middleware/auth.js';
const router = Router();
// бүх коммент
router.get('/', (_req, res) => {
    res.json({ success: true, data: comments });
});
// шинэ коммент нэмэх (зөвхөн нэвтэрсэн хэрэглэгч)
router.post('/', authGuard, (req, res) => {
    const { name, role, content, rating } = req.body;
    if (!name || !content) {
        return res.status(400).json({ success: false, message: 'Нэр болон сэтгэгдэл шаардлагатай' });
    }
    const newComment = {
        id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
        name,
        role: role || 'Guest',
        content,
        rating: rating || 5,
        userId: req.user.id
    };
    0;
    comments.unshift(newComment);
    res.status(201).json({ success: true, data: newComment });
});
// коммент устгах (зөвхөн өөрийнхөө эсвэл админ)
router.delete('/:id', authGuard, (req, res) => {
    const id = Number(req.params.id);
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Сэтгэгдэл олдсонгүй' });
    }
    const comment = comments[index];
    if (comment.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Устгах эрхгүй байна' });
    }
    comments.splice(index, 1);
    res.json({ success: true, message: 'Сэтгэгдэл устгагдлаа' });
});
export default router;
