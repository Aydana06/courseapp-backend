import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: "student" | "instructor" | "admin";
  createdAt: Date;
  lastLoginAt: Date;
  bio?: string;
  cart: mongoose.Types.ObjectId[];
  preferences: {
    language: string;
    notifications: boolean;
    newsletter: boolean;
  };
  enrolledCourses: mongoose.Types.ObjectId[];
  progress: mongoose.Types.ObjectId[]; 
  certificates: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date, default: Date.now },
  bio: { type: String, default: "" },
  preferences: {
    language: { type: String, default: "Монгол" },
    notifications: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false },
  },
    cart: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  progress: [{ type: Schema.Types.ObjectId, ref: "CourseProgress" }],
  certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }]
});

export default mongoose.model<IUser>("User", UserSchema);
