import { Router } from 'express';
import { courses } from '../data/db.js';
import type { ApiResponse, Course } from '../types.js';

const router = Router();

// бүх курс (эсвэл maxId хүртэлх курс)
router.get('/', (req, res) => {
    const maxId = Number(req.query.maxId);
    let result = courses;
    if (!isNaN(maxId)) {
        result = result.filter(c => c.id <= maxId);
    }

    res.json(<ApiResponse<Course[]>>{ success: true, data: result });
});

router.get('/featured', (_req, res) => {
  // жишээ нь эхний 3-ыг санал болгоно
  res.json(<ApiResponse<Course[]>>{ success: true, data: courses.slice(0, 3) });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find(c => c.id === id);
  if (!course) return res.status(404).json({ success: false, message: 'Course олдсонгүй' });
  res.json(<ApiResponse<Course>>{ success: true, data: course });
});


export default router;
