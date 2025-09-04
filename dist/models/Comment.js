import mongoose, { Schema } from "mongoose";
const CommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: false },
    name: { type: String, required: false },
    role: { type: String, default: "student" },
    content: { type: String, required: true },
    rating: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Comment", CommentSchema);
