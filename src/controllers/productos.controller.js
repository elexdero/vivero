import { pool } from '../db.js';

export const mostrarProductos = async(req, res) =>{
    const {rows} = await pool.query('SELECT *FROM productos')
    if(rows === 0){
        res.json({message : "No hay productos que mostrar"})
    }
    res.json(rows)
}