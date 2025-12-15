import { pool } from '../db.js';

// 1. MOSTRAR PEDIDOS (Mostrando nombre del Cliente)
export const obtenerPedidos = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT 
                p.id_pedido, 
                p.fecha_pedido, 
                p.fecha_entrega, 
                p.estado, 
                p.total_estimado,
                c.name_cliente,
                c.ap_pat_cliente
            FROM pedidos p
            JOIN clientes c ON p.id_cliente = c.id_cliente
            ORDER BY p.id_pedido DESC
        `);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// 2. CREAR UN PEDIDO (Del Cliente)
export const crearPedido = async (req, res, next) => {
    const client = await pool.connect();
    try {
        // AHORA RECIBIMOS id_cliente
        const { id_cliente, fecha_entrega, items } = req.body;
        
        await client.query('BEGIN');

        // A. Calcular Total
        let total = 0;
        items.forEach(i => total += (i.cantidad * i.precio));

        // B. Insertar Encabezado
        const resPedido = await client.query(
            `INSERT INTO pedidos (id_cliente, fecha_entrega, total_estimado)
             VALUES ($1, $2, $3) RETURNING id_pedido`,
            [id_cliente, fecha_entrega, total]
        );
        const idPedido = resPedido.rows[0].id_pedido;

        // C. Insertar Detalles (Con el Proveedor sugerido)
        for (const item of items) {
            let id_planta = null;
            let id_producto = null;

            if (item.type === 'planta') id_planta = item.id;
            if (item.type === 'producto') id_producto = item.id;

            await client.query(
                `INSERT INTO detalle_pedidos 
                (id_pedido, id_planta, id_producto, id_proveedor, cantidad, precio_cotizado, subtotal)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [idPedido, id_planta, id_producto, item.id_proveedor, item.cantidad, item.precio, item.subtotal]
            );
        }

        await client.query('COMMIT');
        res.json({ message: 'Encargo registrado correctamente', id_pedido: idPedido });

    } catch (error) {
        await client.query('ROLLBACK');
        next(error);
    } finally {
        client.release();
    }
};

// 3. CAMBIAR ESTADO (Cuando llega el producto)
export const actualizarEstadoPedido = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Cambiamos a 'Listo' para avisar al cliente que ya llegó
        const result = await pool.query(
            "UPDATE pedidos SET estado = 'Listo para Entrega' WHERE id_pedido = $1 RETURNING *", 
            [id]
        );
        
        if (result.rowCount === 0) return res.status(404).json({ message: "Pedido no encontrado" });
        res.json({ message: 'Estado actualizado: Listo para entregar' });
    } catch (error) {
        next(error);
    }
};