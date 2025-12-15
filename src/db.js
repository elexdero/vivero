import pg from 'pg';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_VIVERO, DB_PORT } from './config.js';

export const pool = new pg.Pool({
    user: DB_USER,         
    password: DB_PASSWORD,
    host: DB_HOST,         
    port: DB_PORT,         
    database: DB_VIVERO    
});
