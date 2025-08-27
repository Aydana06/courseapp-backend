// src/server.ts
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import comments from "./routes/comments.js";
import courses from "./routes/courses.js";
import auth from "./routes/auth.js";
import progress from "./routes/progress.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
// CORS тохиргоо
app.use(cors({
    origin: ["http://localhost:4200"],
    credentials: true,
}));
// routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courses);
app.use("/api/comments", comments);
app.use("/api/auth", auth);
app.use("/api/progress", progress);
const PORT = 5000;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (err) {
        console.error("DB connection failed", err);
        process.exit(1);
    }
};
startServer();
