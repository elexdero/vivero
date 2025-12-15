import { pool } from '../db.js'

export const mostrarTrabajadores = async(req, res) =>{
    try{
        const {rows} = await pool.query('SELECT *FROM trabajadores');
        if(rows === 0 || rows === null){
            return res.status(204).json({message : 'Error, no hay contenido para mostrar'});
        }
        return res.json(rows)
    }catch(error){
        next(error);
    }
}

export const mostrarTrabajadoresById = async(req, res, next) =>{
    try{
        const {id} = req.params;
        const {rows} = await pool.query('SELECT *FROM trabajadores WHERE id_trabajador = $1', [id]);
        if(rows === 0 || rows < 0){
            return res.status(404).json({mesasage : 'Error, id invalido'});
        }
        console.log(rows)
        res.json(rows[0])
        
    }catch(error){
        next(error)
    }
}

export const registrarTrabajador = async (req, res, next) => {
    try {
        // Recibimos TODOS los datos del frontend
        const { 
            nameTrabajador, 
            apPatTrabajador, 
            apMatTrabajador, 
            fechaNacimiento,
            direccionTrabajador, 
            telTrabajador, 
            emailTrabajador,
            puestoTrabajador,
            turnoTrabajador,
            sueldoTrabajador,
            fechaAlta
        } = req.body;

        const { rows } = await pool.query(
            `INSERT INTO trabajadores 
            (
                name_trabajador, 
                ap_pat_trabajador, 
                ap_mat_trabajador, 
                fecha_nacimiento,
                direccion_trabajador, 
                tel_trabajador, 
                email_trabajador,
                puesto_trabajador,
                turno_trabajador,
                sueldo_trabajador,
                fecha_alta
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [
                nameTrabajador, 
                apPatTrabajador, 
                apMatTrabajador, 
                fechaNacimiento,
                direccionTrabajador, 
                telTrabajador, 
                emailTrabajador,
                puestoTrabajador,
                turnoTrabajador,
                sueldoTrabajador,
                fechaAlta
            ]
        );

        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};

export const borrarTrabajador = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {rows} = await pool.query('DELETE FROM trabajadores WHERE id_trabajador=$1', [id]);
    
        if(rows === 0){
            return res.status(404).json({message: 'Error, id invalido o trabajador no encontrado'});
        }
        return res.json({ message: 'Trabajador eliminado con éxito' });
    }catch(error){
        next(error)
    }
};
export const modificarTrabajador = async(req, res) =>{
    try{
        const {id} = req.params;
        const {nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador} = req.body;
        const idNumeric = parseInt(id);
        if(idNumeric === 0 || idNumeric < 0){
            return res.status(404).json({message : 'id invalido'});
        }
        const result = await pool.query('UPDATE Trabajadores SET name_trabajador = $1, ap_pat_trabajador = $2, ap_mat_trabajador = $3, direccion_trabajador = $4, tel_trabajador =$5, email_trabajador = $6 WHERE id_trabajador =$7 RETURNING *', [nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador, id]);
        console.log(result)
        return res.json(result.rows[0]);
    }catch(error){
        next(error)
    }
}