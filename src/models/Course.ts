// src/models/Course.ts
import mongoose, { Schema, Document } from "mongoose";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: string;
}

interface CourseDetail {
  level: string;
  category: string;
  rating: number;
  students: number;
  language: string;
  lastUpdated: string;
  tags: string[];
  lessons: Lesson[];
  requirements: string[];
  outcomes: string[];
}

export interface ICourse extends Document {
  _id: mongoose.Types.ObjectId; 
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  instructor: string;
  details: CourseDetail[];
}

const LessonSchema = new Schema<Lesson>({
  id: Number,
  title: String,
  duration: String,
  type: String
});

const CourseDetailSchema = new Schema<CourseDetail>({
  level: String,
  category: String,
  rating: Number,
  students: Number,
  language: String,
  lastUpdated: String,
  tags: [String],
  lessons: [LessonSchema],
  requirements: [String],
  outcomes: [String]
});

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: String,
  price: Number,
  duration: String,
  image: String,
  instructor: String,
  details: [CourseDetailSchema]
});

export default mongoose.model<ICourse>("Course", CourseSchema);
