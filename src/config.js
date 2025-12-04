import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 4000;

export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'Alonso2712';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_VIVERO = process.env.DB_VIVERO || 'vivero';
export const DB_PORT = process.env.DB_PORT || 5433;