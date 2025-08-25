import { Router } from 'express';
import { certificates } from '../data/db.js';
import type { ApiResponse, Certificate } from '../types.js';

const router = Router();

// GET /certificates/user/:userId
router.get('/user/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const data = certificates.filter(c => c.userId === userId);
  res.json(<ApiResponse<Certificate[]>>{ success: true, data });
});

export default router;
