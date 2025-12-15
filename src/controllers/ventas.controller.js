import { pool } from '../db.js';

// 1. MOSTRAR VENTAS (Sin nombre de cliente)
export const mostrarVentas = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT 
                id_venta, 
                fecha_venta, 
                total_venta, 
                forma_pago
            FROM ventas 
            ORDER BY fecha_venta DESC
        `);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// 2. GENERAR VENTA (Sin id_cliente)
export const generarVenta = async (req, res, next) => {
    const client = await pool.connect(); 
    
    try {
        // CAMBIO: Ya no extraemos id_cliente del body
        const { forma_pago, total_venta, detalles } = req.body;

        await client.query('BEGIN');

        // CAMBIO: Insertamos solo forma_pago y total
        const ventaResult = await client.query(
            `INSERT INTO ventas (forma_pago, total_venta) 
             VALUES ($1, $2) RETURNING id_venta`,
            [forma_pago, total_venta]
        );
        const idVenta = ventaResult.rows[0].id_venta;

        // B. Insertar Detalles (Esto sigue igual)
        for (const item of detalles) {
            let id_planta = null;
            let id_producto = null;
            let id_servicio = null;

            if (item.type === 'planta') {
                id_planta = item.id;
                await client.query('UPDATE plantas SET stock = stock - $1 WHERE id_planta = $2', [item.cantidad, id_planta]);
            } else if (item.type === 'producto') {
                id_producto = item.id;
                await client.query('UPDATE productos SET stock = stock - $1 WHERE id_producto = $2', [item.cantidad, id_producto]);
            } else if (item.type === 'servicio') {
                id_servicio = item.id;
            }

            await client.query(
                `INSERT INTO detalle_ventas 
                (id_venta, id_planta, id_producto, id_servicio, cantidad, precio_unitario, subtotal)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [idVenta, id_planta, id_producto, id_servicio, item.cantidad, item.precio, item.subtotal]
            );
        }

        await client.query('COMMIT');
        res.json({ message: 'Venta registrada con éxito', id_venta: idVenta });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error en transacción:", error);
        res.status(500).json({ message: "Error al registrar venta: " + error.message });
    } finally {
        client.release();
    }
};

// 3. OBTENER DETALLE (Igual que antes)
export const obtenerDetalleVenta = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Hacemos JOIN con todas las tablas posibles para obtener nombres y precios
        const result = await pool.query(`
            SELECT 
                d.*,
                v.fecha_venta,
                v.forma_pago,
                v.total_venta,
                p.name_planta,
                prod.name_producto,
                serv.name_servicio
            FROM detalle_ventas d
            INNER JOIN ventas v ON d.id_venta = v.id_venta
            LEFT JOIN plantas p ON d.id_planta = p.id_planta
            LEFT JOIN productos prod ON d.id_producto = prod.id_producto
            LEFT JOIN otros_servicios serv ON d.id_servicio = serv.id_servicio
            WHERE d.id_venta = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}
