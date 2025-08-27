// src/models/Certificate.ts
import mongoose, { Schema } from "mongoose";
const CertificateSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    courseName: String,
    userName: String,
    issueDate: Date,
    grade: String,
    status: { type: String, enum: ["issued", "revoked"], default: "issued" }
});
export default mongoose.model("Certificate", CertificateSchema);
