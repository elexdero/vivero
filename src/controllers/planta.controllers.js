import { pool } from '../db.js'

export const inicio = (req, res) =>{
    res.send('Inicio de la página por defecto')
}

// 1. MOSTRAR (Con nombre del proveedor)
export const mostrarPlantas = async (req, res, next) =>{
    try{
        // Traemos todo de la planta (p.*) y el nombre del proveedor (pr.name_proveedor)
        const {rows} = await pool.query(`
            SELECT p.*, pr.name_proveedor 
            FROM plantas p
            LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
            ORDER BY p.id_planta ASC
        `);
        
        if(rows.length === 0) return res.json([]);
        res.json(rows);
    }catch(error){
        next(error);
    }
}

export const mostrarPlantasById = async(req, res, next) =>{
    try{
        const {id} = req.params; 
        const {rows} = await pool.query(`SELECT * FROM plantas where id_planta = $1`, [id]);
        if(rows.length === 0) return res.status(404).json({message : 'Planta no encontrada'});
        res.json(rows[0]);
    }catch(error){
        next(error)
    }
}

// 2. AÑADIR (Guardando el proveedor)
export const añadirPlanta = async(req, res, next) => {
    try {
        // Recibimos idProveedor del frontend
        const {namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta, stock, idProveedor} = req.body;

        if(!namePlanta || !typePlanta || !precioPlanta){
            return res.status(422).json({message : "Faltan datos obligatorios"});
        }

        const {rows} = await pool.query(`
            INSERT INTO plantas 
            (name_planta, name_cient, type_planta, tam_planta, type_luz, frecuencia_riego, precio_planta, stock, id_proveedor) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, 
            // Si idProveedor es vacío, mandamos null
            [namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta, stock || 0, idProveedor || null]
        );

        res.json(rows[0]);
    } catch(error) {
        console.log('Error:', error.message);
        next(error);
    }
}

export const eliminarPlanta = async(req, res, next) =>{
    try{
        const {id} = req.params
        const result = await pool.query(`DELETE FROM plantas WHERE id_planta=$1`,[id])
        if(result.rowCount === 0) return res.status(404).json({message: "No encontrado"});
        res.sendStatus(204);
    }catch(error){
        next(error)
    }
}

// 3. MODIFICAR (Actualizando el proveedor)
export const modificarPlanta = async(req, res, next) =>{
    try{
        const {id} = req.params;
        const {namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta, stock, idProveedor} = req.body;
        
        const result = await pool.query(
            `UPDATE plantas SET 
                name_planta = $1, 
                name_cient = $2, 
                type_planta = $3, 
                tam_planta = $4, 
                type_luz = $5, 
                frecuencia_riego = $6, 
                precio_planta = $7,
                stock = $8,
                id_proveedor = $9
            WHERE id_planta = $10 RETURNING *`, 
            [namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta, stock, idProveedor || null, id]
        );

        if (result.rowCount === 0) return res.status(404).json({ message: 'No encontrado' });
        res.json(result.rows[0]);
    }catch(error){
        next(error)
    }
}