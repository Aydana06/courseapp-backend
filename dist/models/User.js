import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    phone: Number,
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
export default mongoose.model("User", UserSchema);
