// models/RefreshToken.ts
import mongoose, { Schema } from "mongoose";
const RefreshTokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: () => new Date(), required: true },
    createdByIp: String,
    revokedAt: Date,
    replacedBy: { type: Schema.Types.ObjectId, ref: "RefreshToken", default: null },
    userAgent: String,
});
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default mongoose.model("RefreshToken", RefreshTokenSchema);
