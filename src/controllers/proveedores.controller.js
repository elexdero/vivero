import {pool} from '../db.js'

export const mostrarProveedores = async (req, res, next) =>{
    try{
        const {rows} = await pool.query('SELECT *FROM proveedores')
        if(rows.length === 0){
            return res.json([])
        }
        res.json(rows)
    }catch(error){
        next(error);
    }
}

export const mostrarProveedorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM proveedores WHERE id_proveedor = $1', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};

export const añadirProveedor = async (req, res, next) => {
    try{
        const {name_proveedor, rfc_proveedor, dir_proveedor, cont_proveedor}= req.body;
        if(!name_proveedor || !rfc_proveedor || !dir_proveedor || !cont_proveedor){
            return res.status(422).json({message: 'Favor de llenar todos los campos'});
        }
        const {rows} = await pool.query('INSERT INTO proveedores(name_proveedor, rfc_proveedor, dir_proveedor, cont_proveedor) VALUES($1, $2, $3, $4) RETURNING *', [name_proveedor, rfc_proveedor, dir_proveedor, cont_proveedor]);
        console.log('Se añadió un nuevo provedor', rows[0]);
        res.json(rows[0]);
    }catch(error){
        next(error)
    }
}
export const eliminarProveedor = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const {rows} = await pool.query('DELETE FROM proveedores WHERE id_proveedor = $1', [id])
        if(rows ===0 || id <0){
            res.status(404).json({message : 'id no valido'});
        }
        return res.json({message : 'Proveedor eliminado con éxito'})
    }catch(error){
        console.log('Error al eliminar el proveedor, ',error.message)
        next(error)
    }
}

export const modificarProveedor = async(req, res, next) =>{
    try{
        const {id} = req.params;
        const {name_proveedor, rfc_proveedor, dir_proveedor, cont_proveedor}= req.body;
        const result = await pool.query('UPDATE proveedores SET name_proveedor = $1, rfc_proveedor = $2, dir_proveedor = $3, cont_proveedor = $4 WHERE id_proveedor = $5 RETURNING *', [name_proveedor, rfc_proveedor, dir_proveedor, cont_proveedor,id]);
        if(result.rows.length === 0 ){
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }
        return res.status(202).json(result.rows[0])
    }catch(error){
        console.log('Error al modificar el proveedor, ', error.message)
        next(error)
    }
}