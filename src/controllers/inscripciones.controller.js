import { pool } from "../db.js"; 

export const mostrarinscritosCurso = async (req, res, next) => {
    try {
        const { id_evento } = req.params;
        const result = await pool.query(`
            SELECT 
                i.id_inscripcion, 
                i.fecha_registro,
                c.id_cliente,
                c.name_cliente, 
                c.ap_pat_cliente, 
                c.ap_mat_cliente,
                c.mail_cliente
            FROM inscripciones i
            INNER JOIN clientes c ON i.id_cliente = c.id_cliente
            WHERE i.id_evento = $1
        `, [id_evento]);
        res.json(result.rows);
        
    } catch (error) {
        next(error);
    }
};

export const mostrarInscritosById = async(req, res, next) => {
    try{
        const {id} = req.params;
        const {rows} = await pool.query('SELECT * FROM inscripciones WHERE id_inscripcion = $1', [id])
        if(rows.length === 0){
            return res.status(404).json({message : 'El id es invalido o no existe'})
        }
        res.json(rows[0])
    }catch(error){
        next(error)
    }
}

export const inscribirClientes = async(req, res, next) => {
    try{
        const {id_evento, id_cliente} = req.body;
       // console.log("Intentando inscribir - Evento ID:", id_evento, "Cliente ID:", id_cliente);
        const check = await pool.query(
            'SELECT * FROM inscripciones WHERE id_evento = $1 AND id_cliente = $2',
            [id_evento, id_cliente]
        );
        if(check.rows.length > 0){
            return res.status(404).json({message : 'El cliente ya esta registrado'})
        }
        const result = await pool.query('INSERT INTO inscripciones (id_evento, id_cliente, fecha_registro) VALUES ($1, $2, CURRENT_DATE) RETURNING *',
            [id_evento, id_cliente]
        );
        return res.json(result.rows[0]);
    }catch(error){
        next(error)
    }
}

export const eliminarInscripcion = async (req, res, next) =>{
    const {id} = req.params;
    try{
        await pool.query('DELETE FROM inscripciones WHERE id_inscripcion = $1', [id]);
        res.sendStatus(204);
    }catch(error){
        next(error);
    }
}