import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import progressRoutes from './routes/progress.js';
import certificateRoutes from './routes/certificates.js';
import commentRoutes from './routes/comments.js';
import cartRoutes from './routes/cart.js';
const app = express();
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());
// Health
app.get('/health', (_req, res) => res.json({ ok: true }));
// API
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/progress', progressRoutes);
app.use('/certificates', certificateRoutes);
app.use('/comments', commentRoutes);
app.use('/cart', cartRoutes);
// 404
app.use((_req, res) => res.status(404).json({ success: false, message: 'Not found' }));
app.listen(config.PORT, () => {
    console.log(`API listening on http://localhost:${config.PORT}`);
});
