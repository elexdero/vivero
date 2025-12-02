import { pool } from '../db.js'
const bcrypt = require('bcryptjs');

export const registrarUsuario = async (req, res) =>{
     try{
        const { username, rfc, password } = req.body;
        const newUser = new User({ username, rfc, password});
        await newUser.save();
        res.status(201).json({message : "Bienvenido, "+ username});
    }catch(error){
        next(error)
    }
}
export const iniciarSesion  = async (req, res) =>{
   try{
    const {rfc, password} = req.body;
    const user = await User.findOne({rfc});
    if(!user){
        return res.status(400).json({message : 'Credenciales invalidas'});
    }
    res.status(202).json({message: 'Bienvenido ' + username})
    //vista
   }catch(error){
        next(error)
   }
}