import { pool } from '../db.js'

export const inicio = (req, res) =>{
    res.send('Inicio de la página por defecto')
}

export const mostrarPlantas = async (req, res) =>{
    const {rows} = await pool.query(`SELECT *FROM plantas`)
    if(rows ===0){
        res.json({message : "No hay plantas registradas"})
    }
    res.json(rows)
}

export const mostrarPlantasById = async(req, res) =>{
    try{
        const {id} = req.params; 
        const {rows} = await pool.query(`SELECT * FROM plantas where idPlanta = $1`, [id]);
        if(rows.length === 0 || rows.length < 0){ 
            res.status(404).json({message : 'Error, id invalido'})
        }
        console.log(rows);
        res.json({rows});
    }catch(error){
        console.log("Error al mostrar la planta")
        next(error)
    }
}

export const añadirPlanta = async(req, res) =>{
    try{
        const {namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta} = req.body;//siempre se requieren estos datos
        if(!namePlanta || !nameCient || !typePlanta || !tamPlanta || !typeLuz || !frecuenciaRiego || !precioPlanta){
            return res.status(422).json({message : "Error al procesar los datos"});
        }
        const {rows} = await pool.query(`INSERT INTO plantas(namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta]);
        console.log('Se añadió una nueva planta.', rows[0]);
        res.json(rows[0]);
    }catch(error){
        console.log('Error al añadir planta, ', error.message)
        next(error)
    }
}

export const eliminarPlanta = async(req, res) =>{
    try{
        const {id} = req.params
        const {rows} = await pool.query(`DELETE FROM plantas WHERE idPlanta=$1`,[id])
        if(rows ===0 || id <0){
            res.status(404).json({message : 'id no valido'});
        }
        return res.json({message : 'Planta eliminada con éxito'})
    }catch(error){
        console.log('Error al eliminar la planta, ', error.message)
        next(error)
    }
}

export const modificarPlanta = async(req, res) =>{
    try{
        const {id} = req.params;
        const {namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta} = req.body;
        const idNumeric = parseInt(id); 
        if(idNumeric <=0 || isNaN(idNumeric)){
            res.status(404).json({message : 'El id es invalido'});
        }
        const result = await pool.query('UPDATE plantas SET namePlanta = $1, nameCient =$2, typePlanta =$3, tamPlanta = $4, typeLuz = $5, frecuenciaRiego = $6, precioPlanta = $7 WHERE idPlanta= $8 RETURNING *', [namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta, id]
        );
        console.log(result);
        return res.json(result.rows[0]);
    }catch(error){
        next(error)
    }
}
