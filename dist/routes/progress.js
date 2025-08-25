import { Router } from 'express';
import { courseProgress, lessonProgress, courses } from '../data/db.js';
const router = Router();
// GET /progress/user/:userId
router.get('/user/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const data = courseProgress.filter(p => p.userId === userId);
    res.json({ success: true, data });
});
// GET /progress/overall/:userId
router.get('/overall/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const data = courseProgress.filter(p => p.userId === userId);
    const totalCourses = data.length;
    const completedCourses = data.filter(p => p.progress === 100).length;
    const averageProgress = totalCourses ? Math.round(data.reduce((s, p) => s + p.progress, 0) / totalCourses) : 0;
    res.json(({
        success: true,
        data: { totalCourses, completedCourses, averageProgress }
    }));
});
// GET /progress/recent/:userId
router.get('/recent/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const data = courseProgress
        .filter(p => p.userId === userId)
        .sort((a, b) => +new Date(b.lastAccessed) - +new Date(a.lastAccessed))
        .slice(0, 5);
    res.json({ success: true, data });
});
// POST /progress/update  { courseId, userId, lessonId }
router.post('/update', (req, res) => {
    const { courseId, userId, lessonId } = req.body;
    let p = courseProgress.find(pp => pp.courseId === courseId && pp.userId === userId);
    if (!p) {
        const totalLessons = (courses.find(c => c.id === courseId)?.details?.[0]?.lessons?.length) || 5;
        p = {
            courseId, userId, progress: 0, completedLessons: [], totalLessons, lastAccessed: new Date(), startDate: new Date()
        };
        courseProgress.push(p);
    }
    if (!p.completedLessons.includes(lessonId)) {
        p.completedLessons.push(lessonId);
        p.progress = Math.round((p.completedLessons.length / p.totalLessons) * 100);
        p.lastAccessed = new Date();
    }
    res.json({ success: true, data: p });
});
// GET /progress/lesson?lessonId=&courseId=&userId=
router.get('/lesson', (req, res) => {
    const lessonId = Number(req.query.lessonId);
    const courseId = Number(req.query.courseId);
    const userId = Number(req.query.userId);
    const lp = lessonProgress.find(l => l.lessonId === lessonId && l.courseId === courseId && l.userId === userId) || null;
    res.json({ success: true, data: lp });
});
// POST /progress/lesson/complete
router.post('/lesson/complete', (req, res) => {
    const { lessonId, courseId, userId, timeSpent, quizScore } = req.body;
    let lp = lessonProgress.find(l => l.lessonId === lessonId && l.courseId === courseId && l.userId === userId);
    if (!lp) {
        lp = { lessonId, courseId, userId, completed: true, completedAt: new Date(), timeSpent, quizScore };
        lessonProgress.push(lp);
    }
    else {
        lp.completed = true;
        lp.completedAt = new Date();
        lp.timeSpent = timeSpent;
        if (typeof quizScore !== 'undefined')
            lp.quizScore = quizScore;
    }
    // update course progress too
    const fakeReq = { body: { courseId, userId, lessonId } };
    const fakeRes = { json: () => { } };
    // (бодитод бол үйлдлээ сэргээд дуудаарай)
    res.json({ success: true, data: lp });
});
export default router;
