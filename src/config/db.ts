import mongoose from "mongoose";
import { config } from "../config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      // options not required in Mongoose v7+
    });
    console.log("✅ MongoDB connected...");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
