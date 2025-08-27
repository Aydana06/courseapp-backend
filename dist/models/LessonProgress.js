// src/models/LessonProgress.ts
import mongoose, { Schema } from "mongoose";
const LessonProgressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lessonId: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    completedAt: Date,
    timeSpent: Number,
    quizScore: Number
});
export default mongoose.model("LessonProgress", LessonProgressSchema);
