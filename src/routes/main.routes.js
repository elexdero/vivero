import { Router } from 'express';
import { mostrarPlantas, mostrarPlantasById, añadirPlanta, eliminarPlanta, modificarPlanta } from '../controllers/planta.controllers.js';
// Asegúrate de que estos archivos existan y exporten las funciones:
import { mostrarOtrosServicios } from "../controllers/otrosServicios.controller.js";
import { mostrarProductos } from "../controllers/productos.controller.js";
import { mostrarVentas, generarVenta } from "../controllers/ventas.controller.js"; 
import {mostrarTrabajadores, mostrarTrabajadoresById, registrarTrabajador, borrarTrabajador, modificarTrabajador} from '../controllers/trabajadores.controller.js'
// import { getClientes } from "../controllers/clientes.controller.js"; // <-- Faltaba clientes

const router = Router();

// --- PLANTAS ---
router.get('/plantas', mostrarPlantas);
router.get('/planta/:id', mostrarPlantasById);
// OJO: En el frontend usamos /plantas/new, asegúrate que coincida aquí:
router.post('/plantas/new', añadirPlanta); 
router.delete('/deletePlanta/:id', eliminarPlanta);
router.put('/modificarPlanta/:id', modificarPlanta);

// --- OTROS SERVICIOS ---
router.get('/otrosServicios', mostrarOtrosServicios);

// --- PRODUCTOS ---
// CAMBIO: Quité 'mostrar' para que la ruta sea limpia: /api/productos
router.get('/productos', mostrarProductos); 

// --- VENTAS ---
router.get('/ventas', mostrarVentas);
// CAMBIO IMPORTANTE: Debe ser POST para guardar datos
router.post('/ventas/new', generarVenta); 


router.get('/trabajadores', mostrarTrabajadores);
router.get('/trabajador/:id', mostrarTrabajadoresById);
router.post('/registrarTrabajador', registrarTrabajador);
router.delete('/borrarTrabajador/:id', borrarTrabajador);
router.put('/modificarTrabajador/:id', modificarTrabajador);

export default router;
