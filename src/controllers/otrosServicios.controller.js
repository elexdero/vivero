import { pool } from '../db.js'

export const mostrarOtrosServicios = async (req, res) =>{
    const {rows} = await pool.query(`SELECT *FROM otrosservicios`)
    if(rows ===0){
        res.json({message : "No hay servicios registrados"})
    }
    res.json(rows)
}