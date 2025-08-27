// src/models/CourseProgress.ts
import mongoose, { Schema } from "mongoose";
const CourseProgressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessons: { type: [Number], default: [] },
    progress: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now },
    lastAccessed: { type: Date, default: Date.now }
});
export default mongoose.model("CourseProgress", CourseProgressSchema);
