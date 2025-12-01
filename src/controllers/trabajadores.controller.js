import { json } from "express";
import { pool } from '../db.js'

export const mostrarTrabajadores = async(req, res) =>{
    try{
        const {rows} = await pool.query('SELECT *FROM trabajadores');
        if(rows === 0 || rows === null){
            return res.status(204).json({message : 'Error, no hay contenido para mostrar'});
        }
        return res.json(rows)
    }catch(error){
        return res.status(505).json({error :  error.message})
    }
}

export const mostrarTrabajadoresById = async(req, res) =>{
    try{
        const {id} = req.params;
        const {rows} = await pool.query('SELECT *FROM Trabajadores WHERE tabajadorId = $1', [id]);
        if(rows === 0 || rows < 0){
            return res.status(404).json({mesasage : 'Error, id invalido'});
        }
        console.log(rows)
        res.json(rows[0])
        
    }catch(error){
        return res.status(505).json({error : error.message})
    }
}

export const registrarTrabajador = async(req, res) =>{
    try{
        const {nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador} = req.body;
        if(!nameTrabajador || !apPatTrabajador || !apMatTrabajador || !direccionTrabajador || !telTrabajador || !emailTrabajador){
            res.status(422).json({message : 'Error al agregar datos'})
        }
        const {rows} = await pool.query('INSERT INTO Trabajadores(nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador]);
        console.log(rows[0])
        res.json(rows)
    }catch(error){
        return res.status(505).json({mesasage : error.mesasage});
    }
}

export const borrarTrabajador = async (req, res) => {
    try {
        const { id } = req.params;
        const {rows} = await pool.query('DELETE FROM trabajadores WHERE tabajadorId=$1', [id]);
    
        if(rows === 0){
            return res.status(404).json({message: 'Error, id invalido o trabajador no encontrado'});
        }
        return res.json({ message: 'Trabajador eliminado con éxito' });
    }catch(error){
        return res.status(500).json({ message: error.message });
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
        const result = await pool.query('UPDATE Trabajadores SET nameTrabajador = $1, apPatTrabajador = $2, apMatTrabajador = $3, direccionTrabajador = $4, telTrabajador =$5, emailTrabajador = $6 WHERE tabajadorId =$7 RETURNING *', [nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador, id]);
        console.log(result)
        return res.json(result.rows[0]);
    }catch(error){
        return res.status.json({message : mesasage.error});
    }
}