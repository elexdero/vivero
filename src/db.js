import pg from 'pg';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_VIVERO, DB_PORT } from './config.js';

export const pool = new pg.Pool({
    user: DB_USER,         // postgres
    password: DB_PASSWORD, // Alonso2712
    host: DB_HOST,         // localhost
    port: DB_PORT,         // 5433 <--- ¡ESTO ES CRUCIAL!
    database: DB_VIVERO    // vivero
});
