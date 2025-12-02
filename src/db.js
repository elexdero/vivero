import pg from 'pg'
import { db } from './config.js'

export const pool = new pg.Pool({
    user: db.user,
    host: db.host,
    password: db.password,
    port: db.port,
    database: db.database
})

