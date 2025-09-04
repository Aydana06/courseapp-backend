import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: Number(process.env.PORT || 5000),
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret_change_me_in_production",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "dev_refresh_secret_change_me_in_production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || "7d",
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:4200',
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/elearning"
};
