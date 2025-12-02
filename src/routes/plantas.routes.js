import ROUTER  from 'express'
import {inicio, mostrarPlantas, mostrarPlantasById, añadirPlanta, eliminarPlanta, modificarPlanta} from '../controllers/planta.controllers.js'

const router = ROUTER();


router.get('/plantas', mostrarPlantas);

router.get('/planta/:id', mostrarPlantasById);

router.post('/newPlanta', añadirPlanta);

router.delete('/deletePlanta/:id', eliminarPlanta);

router.put('/modificarPlanta/:id', modificarPlanta); //put para modificar totalidad, patch para modificar un solo atributo
export default router;
