import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import commentRoutes from './routes/comments.js';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
// 404
app.use((_req, res) => res.status(404).json({ success: false, message: 'Not Found' }));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
