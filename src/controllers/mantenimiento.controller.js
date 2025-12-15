import {pool} from '../db.js'

export const obtenerMantenimientos = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT 
                m.id_mantenimiento,
                m.freq_riego,
                m.type_fertilizacion,
                m.obs_ejemplar,
                p.name_planta,
                t.name_trabajador, 
                t.ap_pat_trabajador
            FROM mantenimientos m
            INNER JOIN plantas p ON m.id_planta = p.id_planta
            LEFT JOIN trabajadores t ON m.id_personal = t.id_trabajador
        `);
        
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// 2. Registrar Mantenimiento
export const crearMantenimiento = async (req, res, next) => {
    try {
        const { id_planta, id_personal, freq_riego, type_fertilizacion, obs_ejemplar } = req.body;

        const result = await pool.query(
            `INSERT INTO mantenimientos 
            (id_planta, id_personal, freq_riego, type_fertilizacion, obs_ejemplar) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [id_planta, id_personal, freq_riego, type_fertilizacion, obs_ejemplar]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// 3. Eliminar Mantenimiento
export const eliminarMantenimiento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM mantenimientos WHERE id_mantenimiento = $1", [id]);
        
        if (result.rowCount === 0) return res.status(404).json({ message: "No encontrado" });
        
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};