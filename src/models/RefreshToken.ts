// models/RefreshToken.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IRefreshToken extends Document {
  user: mongoose.Types.ObjectId;
  tokenHash: string;          
  expiresAt: Date;          
  createdAt: Date;
  createdByIp?: string;
  revokedAt?: Date;
  replacedBy?: mongoose.Types.ObjectId | null;
  userAgent?: string;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
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

export default mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
