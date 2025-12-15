import { pool } from "../db.js";

export const mostrarEventos = async (req, res, next) =>{
    try{
        const {rows} = await pool.query('SELECT *FROM eventos');
        if(rows === 0 || rows === null){
            return res.status(204).json({message : 'Error, no hay contenido para mostrar'});
        }
        return res.json(rows)
    }catch(error){
        next(error)
    }
}

export const mostrarEventosById = async (req, res, next) =>{
    try{
        const {id} = req.params;
        const {rows} = await pool.query('SELECT *FROM eventos WHERE id_evento =$1', [id])
        if(rows.length === 0){
            return res.status(404).json({message : 'ID invalido o inexistente'})
        }
        return res.status(202).json(rows[0]);
    }catch(error){
        next(error)
    }
}

export const crearEvento = async(req, res, next) =>{
    try{
        const {nombre_evento, des_evento, date_evento, cost_evento, cupo_maximo} = req.body;
        const {rows} = await pool.query(`INSERT INTO eventos (nombre_evento, des_evento, date_evento, cost_evento, cupo_maximo) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [nombre_evento, des_evento, date_evento, cost_evento, cupo_maximo]);
        res.json(rows[0]);
    }catch(error){
        next(error);
    }
}

export const borrarEvento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM eventos WHERE id_evento = $1', [id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

export const modificarEvento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre_evento, des_evento, date_evento, cost_evento, cupo_maximo } = req.body;

        const result = await pool.query(`
            UPDATE eventos SET nombre_evento = $1, des_evento = $2, date_evento = $3, cost_evento = $4, cupo_maximo = $5 WHERE id_evento = $6 RETURNING *`,[nombre_evento, des_evento, date_evento, cost_evento, cupo_maximo, id]);

        if (result.rows.length === 0) return res.status(404).json({ message: "Evento no encontrado" });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};