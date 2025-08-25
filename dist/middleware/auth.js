import { verifyAccessToken } from '../utils/jwt.js';
export function authGuard(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const token = header.slice(7);
        const payload = verifyAccessToken(token); // { sub, role }
        req.user = { id: String(payload.sub), role: String(payload.role) };
        next();
    }
    catch {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}
