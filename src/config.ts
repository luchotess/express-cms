import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL
};
