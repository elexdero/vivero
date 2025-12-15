import {pool} from '../db.js'

export const mostrarClientes = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM clientes ORDER BY name_cliente ASC");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

export const mostrarClienteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Debug para ver si llega el ID
        console.log("Buscando cliente con ID:", id);

        const result = await pool.query("SELECT * FROM clientes WHERE id_cliente = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error en mostrarClienteById:", error);
        next(error); // Esto manda el error 500 si algo falla
    }
};


export const crearCliente = async (req, res, next) => {
    try {
        const { name_cliente, ap_pat_cliente, ap_mat_cliente, dir_cliente, tel_cliente, mail_cliente } = req.body;
        
        const result = await pool.query(
            `INSERT INTO clientes (name_cliente, ap_pat_cliente, ap_mat_cliente, dir_cliente, tel_cliente, mail_cliente) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name_cliente, ap_pat_cliente, ap_mat_cliente, dir_cliente, tel_cliente, mail_cliente]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};


export const actualizarCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name_cliente, ap_pat_cliente, ap_mat_cliente, dir_cliente, tel_cliente, mail_cliente } = req.body;
        const result = await pool.query(
            `UPDATE clientes 
             SET name_cliente = $1, ap_pat_cliente = $2, ap_mat_cliente = $3, dir_cliente = $4, tel_cliente = $5, mail_cliente = $6 
             WHERE id_cliente = $7 RETURNING *`,
            [name_cliente, ap_pat_cliente, ap_mat_cliente, dir_cliente, tel_cliente, mail_cliente, id]
        );
        if (result.rowCount === 0) return res.status(404).json({ message: "Cliente no encontrado" });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};