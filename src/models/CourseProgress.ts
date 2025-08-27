// src/models/CourseProgress.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICourseProgress extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  completedLessons: number[];
  progress: number;
  totalLessons: number;
  startDate: Date;
  lastAccessed: Date;
}

const CourseProgressSchema = new Schema<ICourseProgress>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: { type: [Number], default: [] },
  progress: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now }
});

export default mongoose.model<ICourseProgress>("CourseProgress", CourseProgressSchema);
