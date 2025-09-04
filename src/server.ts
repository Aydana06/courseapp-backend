// src/server.ts
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { config } from "./config.js";
import userRoutes from "./routes/userRoutes.js";
import comments from "./routes/comments.js";
import courses from "./routes/courses.js"
import auth from "./routes/auth.js";
import  progress  from "./routes/progress.js";
import  cartRoutes  from "./routes/cartRoutes.js";



const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS тохиргоо
app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,                
  })
);


// routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courses);
app.use("/api/comments", comments);
app.use("/api/auth", auth);
app.use("/api/progress", progress);
app.use("/api/cart", cartRoutes)

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Серверийн алдаа гарлаа' 
  });
});

// 404 handler
app.use('*', (req: any, res: any) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint олдсонгүй' 
  });
});

const PORT = config.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

startServer();
