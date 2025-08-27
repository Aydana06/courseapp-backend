// src/models/Course.ts
import mongoose, { Schema } from "mongoose";
const LessonSchema = new Schema({
    id: Number,
    title: String,
    duration: String,
    type: String
});
const CourseDetailSchema = new Schema({
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
const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: Number,
    duration: String,
    image: String,
    instructor: String,
    details: [CourseDetailSchema]
});
export default mongoose.model("Course", CourseSchema);
