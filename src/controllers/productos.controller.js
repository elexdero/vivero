import { pool } from "../db.js";

// 1. OBTENER PRODUCTOS (Con nombre del proveedor)
export const obtenerProductos = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT 
                p.id_producto,
                p.name_producto,
                p.info_producto,
                p.stock,
                p.precio_producto,
                pr.name_proveedor  -- Asumiendo que en tu tabla proveedores se llama 'name_proveedor' o similar
            FROM productos p
            LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
        `);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// 2. OBTENER UN PRODUCTO (Para editar)
export const obtenerProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM productos WHERE id_producto = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// 3. CREAR PRODUCTO
export const crearProducto = async (req, res, next) => {
    try {
        const { name_producto, info_producto, stock, precio_producto, id_proveedor } = req.body;
        
        const result = await pool.query(
            `INSERT INTO productos (name_producto, info_producto, stock, precio_producto, id_proveedor) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name_producto, info_producto, stock, precio_producto, id_proveedor]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// 4. ACTUALIZAR PRODUCTO
export const actualizarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name_producto, info_producto, stock, precio_producto, id_proveedor } = req.body;

        const result = await pool.query(
            `UPDATE productos SET name_producto=$1, info_producto=$2, stock=$3, precio_producto=$4, id_proveedor=$5 
             WHERE id_producto=$6 RETURNING *`,
            [name_producto, info_producto, stock, precio_producto, id_proveedor, id]
        );

        if (result.rowCount === 0) return res.status(404).json({ message: "No encontrado" });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// 5. ELIMINAR PRODUCTO
export const eliminarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM productos WHERE id_producto = $1", [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: "No encontrado" });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};