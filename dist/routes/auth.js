import { Router } from 'express';
const router = Router();
// Mock users хадгалах
let users = [];
let tokens = [];
// ----------------- LOGIN -----------------
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Demo: зөвхөн нэг хэрэглэгч байг гэж үзье
    const existingUser = users.find(u => u.email === email);
    if (!existingUser || password !== '123456') {
        return res.status(401).json({
            success: false,
            message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна'
        });
    }
    const token = 'mock_token_' + Date.now();
    tokens.push(token);
    return res.json({
        success: true,
        data: {
            user: existingUser,
            token
        }
    });
});
// ----------------- REGISTER -----------------
router.post('/register', (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;
    if (users.some(u => u.email === email)) {
        return res.status(400).json({
            success: false,
            message: 'Энэ имэйл бүртгэлтэй байна'
        });
    }
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        name: '',
        role: 'student',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        bio: '',
        preferences: {
            language: 'Монгол',
            notifications: true,
            newsletter: false
        },
        enrolledCourses: [],
        progress: [],
        certificates: []
    };
    users.push(newUser);
    const token = 'mock_token_' + Date.now();
    tokens.push(token);
    return res.json({
        success: true,
        data: {
            user: newUser,
            token
        }
    });
});
// ----------------- REFRESH TOKEN -----------------
router.post('/refresh', (req, res) => {
    const token = 'mock_refreshed_token_' + Date.now();
    return res.json({
        success: true,
        data: { token }
    });
});
// ----------------- UPDATE PROFILE -----------------
router.put('/profile', (req, res) => {
    const { id, ...updates } = req.body;
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'Хэрэглэгч олдсонгүй' });
    }
    users[userIndex] = { ...users[userIndex], ...updates };
    return res.json({ success: true, data: users[userIndex] });
});
// ----------------- VERIFY EMAIL -----------------
router.post('/verify-email', (req, res) => {
    const { token } = req.body;
    if (token) {
        return res.json({ success: true, data: true });
    }
    else {
        return res.status(400).json({ success: false, data: false });
    }
});
// ----------------- RESET PASSWORD -----------------
router.post('/reset-password', (req, res) => {
    const { email } = req.body;
    if (!users.some(u => u.email === email)) {
        return res.status(404).json({ success: false, message: 'Ийм имэйл байхгүй' });
    }
    // Жинхэнэдээ email илгээх ёстой
    return res.json({ success: true, data: true });
});
export default router;
