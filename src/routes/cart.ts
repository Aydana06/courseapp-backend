import { Router } from 'express';
import type { ApiResponse, Course } from '../types.js';
import { users } from '../data/db.js';
import { authGuard, AuthRequest } from '../middleware/auth.js';
import { courses } from '../data/db.js'; // courses чинь бас memory дээр байж байгаа гэж бодлоо

const router = Router();

// 1. бүх сагсан дахь курсууд
router.get('/', authGuard, (req: AuthRequest, res) => {
  const user = users.find(u => u.id === Number(req.user?.id));
  if (!user) {
    return res.status(404).json(<ApiResponse<null>>{ success: false, message: 'User олдсонгүй' });
  }
  const userCourses = courses.filter(c => user.enrolledCourses.includes(c.id));
  return res.json(<ApiResponse<Course[]>>{ success: true, data: userCourses });
});

// 2. сагсанд шинээр курс нэмэх
router.post('/:courseId', authGuard, (req: AuthRequest, res) => {
  const user = users.find(u => u.id === Number(req.user?.id));
  if (!user) {
    return res.status(404).json(<ApiResponse<null>>{ success: false, message: 'User олдсонгүй' });
  }

  const courseId = Number(req.params.courseId);
  if (!courses.some(c => c.id === courseId)) {
    return res.status(404).json(<ApiResponse<null>>{ success: false, message: 'Курс олдсонгүй' });
  }

  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
  }

  return res.json(<ApiResponse<number[]>>{ success: true, data: user.enrolledCourses });
});

// 3. сагснаас курс устгах
router.delete('/:courseId', authGuard, (req: AuthRequest, res) => {
  const user = users.find(u => u.id === Number(req.user?.id));
  if (!user) {
    return res.status(404).json(<ApiResponse<null>>{ success: false, message: 'User олдсонгүй' });
  }

  const courseId = Number(req.params.courseId);
  user.enrolledCourses = user.enrolledCourses.filter(id => id !== courseId);

  return res.json(<ApiResponse<number[]>>{ success: true, data: user.enrolledCourses });
});

export default router;
