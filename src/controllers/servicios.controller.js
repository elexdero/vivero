import { pool } from "../db.js";

// 1. LISTAR SERVICIOS (Con nombre del producto asociado)
export const obtenerServicios = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT 
                s.id_servicio,
                s.name_servicio,
                s.fecha_servicio,
                s.desc_servicio,
                s.costo_servicio,
                p.name_producto
            FROM otros_servicios s
            LEFT JOIN productos p ON s.id_producto = p.id_producto
        `);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// 2. OBTENER UN SERVICIO (Para editar)
export const obtenerServicioById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM otros_servicios WHERE id_servicio = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Servicio no encontrado" });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// 3. CREAR SERVICIO
export const crearServicio = async (req, res, next) => {
    try {
        const { name_servicio, fecha_servicio, desc_servicio, costo_servicio, id_producto } = req.body;

        const result = await pool.query(
            `INSERT INTO otros_servicios 
            (name_servicio, fecha_servicio, desc_servicio, costo_servicio, id_producto) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name_servicio, fecha_servicio, desc_servicio, costo_servicio, id_producto || null]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// 4. ACTUALIZAR SERVICIO
export const actualizarServicio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name_servicio, fecha_servicio, desc_servicio, costo_servicio, id_producto } = req.body;

        const result = await pool.query(
            `UPDATE otros_servicios SET 
                name_servicio=$1, fecha_servicio=$2, desc_servicio=$3, costo_servicio=$4, id_producto=$5
            WHERE id_servicio=$6 RETURNING *`,
            [name_servicio, fecha_servicio, desc_servicio, costo_servicio, id_producto || null, id]
        );

        if (result.rowCount === 0) return res.status(404).json({ message: "No encontrado" });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// 5. ELIMINAR SERVICIO
export const eliminarServicio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM otros_servicios WHERE id_servicio = $1", [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: "No encontrado" });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};