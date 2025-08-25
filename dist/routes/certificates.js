import { Router } from 'express';
import { certificates } from '../data/db.js';
const router = Router();
// GET /certificates/user/:userId
router.get('/user/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const data = certificates.filter(c => c.userId === userId);
    res.json({ success: true, data });
});
export default router;
