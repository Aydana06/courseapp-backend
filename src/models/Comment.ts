import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment extends Document {
  userId: Types.ObjectId;
  courseId?: Types.ObjectId;
  name: string;
  role: string;
  content: string;
  rating: number;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: false },
  name: { type: String, required: false },
  role: { type: String, default: "student" },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IComment>("Comment", CommentSchema);
