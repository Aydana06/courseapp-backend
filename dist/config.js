import dotenv from 'dotenv';
dotenv.config();
export const config = {
    PORT: Number(process.env.PORT || 4000),
    JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'dev_refresh_secret_change_me',
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || '7d',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};
