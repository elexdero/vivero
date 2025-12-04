import { pool } from '../db.js';

export const mostrarVentas = async(req, res) =>{
    try {
        const { rows } = await pool.query(`
            SELECT v.idventa, v.fecha, v.total, c.namecliente, c.appatcliente
            FROM ventas v
            JOIN clientes c ON v.idcliente = c.idcliente
            ORDER BY v.fecha DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const generarVenta = async (req, res) => {
    try {
        const { idCliente, fecha, total, detalles } = req.body;
        const nuevaVenta = await pool.query(
            `INSERT INTO ventas (idcliente, fecha, total) 
             VALUES ($1, $2, $3) RETURNING *`,
            [idCliente, fecha, total]
        );
        const idVentaGenerado = nuevaVenta.rows[0].idventa;
        res.json({ 
            message: 'Venta registrada con éxito', 
            venta: nuevaVenta.rows[0] 
        });

    } catch (error) {
        res.status(500).json({ message: "Error al registrar la venta: " + error.message });
    }
};