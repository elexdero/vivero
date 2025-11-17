import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "Alonso2712",
    database: "viverocoyoacan",
    port: "5433"
})

