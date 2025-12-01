import ROUTER  from 'express'
import {mostrarTrabajadores, mostrarTrabajadoresById, registrarTrabajador, borrarTrabajador, modificarTrabajador} from '../controllers/trabajadores.controller.js'


const router = ROUTER();

router.get('/trabajadores', mostrarTrabajadores);
router.get('/trabajador/:id', mostrarTrabajadoresById);
router.post('/registrarTrabajador', registrarTrabajador);
router.delete('/borrarTrabajador/:id', borrarTrabajador);
router.put('/modificarTrabajador/:id', modificarTrabajador);

export default router;