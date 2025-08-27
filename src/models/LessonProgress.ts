// src/models/LessonProgress.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILessonProgress extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  lessonId: number;
  completed: boolean;
  completedAt: Date;
  timeSpent: number;
  quizScore?: number;
}

const LessonProgressSchema = new Schema<ILessonProgress>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  lessonId: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  completedAt: Date,
  timeSpent: Number,
  quizScore: Number
});

export default mongoose.model<ILessonProgress>("LessonProgress", LessonProgressSchema);
