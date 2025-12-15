import { Router } from 'express';
import { mostrarPlantas, mostrarPlantasById, añadirPlanta, eliminarPlanta, modificarPlanta } from '../controllers/planta.controllers.js';
// Asegúrate de que estos archivos existan y exporten las funciones:
import { obtenerServicios, obtenerServicioById, crearServicio, actualizarServicio, eliminarServicio } from '../controllers/servicios.controller.js';
import { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } from '../controllers/productos.controller.js';
import { mostrarVentas, generarVenta } from "../controllers/ventas.controller.js"; 
import {mostrarTrabajadores, mostrarTrabajadoresById, registrarTrabajador, borrarTrabajador, modificarTrabajador} from '../controllers/trabajadores.controller.js'
import {mostrarProveedores, mostrarProveedorById, modificarProveedor, eliminarProveedor, añadirProveedor} from '../controllers/proveedores.controller.js'
import  {mostrarInscritosById, mostrarinscritosCurso, inscribirClientes, eliminarInscripcion} from '../controllers/inscripciones.controller.js'
import {mostrarEventos, mostrarEventosById, crearEvento, borrarEvento, modificarEvento} from '../controllers/eventos.controller.js'
import { mostrarClientes, crearCliente, mostrarClienteById, actualizarCliente} from "../controllers/clientes.controller.js";
import { obtenerMantenimientos, crearMantenimiento, eliminarMantenimiento } from '../controllers/mantenimiento.controller.js';
import { obtenerPedidos, crearPedido, actualizarEstadoPedido } from '../controllers/pedidos.controller.js';

const router = Router();

// --- PLANTAS ---
router.get('/plantas', mostrarPlantas);
router.get('/planta/:id', mostrarPlantasById);
router.post('/plantas/new', añadirPlanta); 
router.delete('/deletePlanta/:id', eliminarPlanta);
router.put('/plantas/edit/:id', modificarPlanta);

// --- OTROS SERVICIOS ---
router.get('/servicios', obtenerServicios);
router.get('/servicios/:id', obtenerServicioById);
router.post('/servicios', crearServicio);
router.put('/servicios/:id', actualizarServicio);
router.delete('/servicios/:id', eliminarServicio);

// --- PRODUCTOS ---
router.get('/productos', obtenerProductos);
router.get('/productos/:id', obtenerProducto);
router.post('/productos', crearProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

// --- VENTAS ---
router.get('/ventas', mostrarVentas);
router.post('/ventas', generarVenta); 

//--- PROVEEDORES ---
router.get('/proveedores', mostrarProveedores);
router.post('/proveedores/new', añadirProveedor);
router.get('/proveedores/:id', mostrarProveedorById);
router.delete('/proveedores/delete/:id', eliminarProveedor);
router.put('/proveedores/edit/:id', modificarProveedor);

//--- TRABAJADORES ---
router.get('/trabajadores', mostrarTrabajadores);
router.get('/trabajador/:id', mostrarTrabajadoresById);
router.post('/registrarTrabajador', registrarTrabajador);
router.delete('/borrarTrabajador/:id', borrarTrabajador);
router.put('/modificarTrabajador/:id', modificarTrabajador);

//--- INSCRIPCIONES A CURSOS ----
router.get('/inscripciones/:id_evento', mostrarinscritosCurso);
router.get('/inscripciones/detalle/:id', mostrarInscritosById);
router.post('/inscripciones/new', inscribirClientes);
router.delete('/inscripciones/delete/:id', eliminarInscripcion);

//----EVENTOS -----
console.log("Cargando rutas de eventos...");
router.get('/eventos', mostrarEventos);
router.get('/eventos/:id', mostrarEventosById);
router.post('/eventos/new', crearEvento);
router.delete('/eventos/delete/:id', borrarEvento);
router.put('/eventos/edit/:id', modificarEvento);

//--- CLIENTES ---
router.get('/clientes', mostrarClientes);
router.get('/clientes/:id', mostrarClienteById);
router.post('/clientes', crearCliente);
router.put('/clientes/:id', actualizarCliente);

//--- MANTENIMIENTO ---
router.get('/mantenimientos', obtenerMantenimientos);
router.post('/mantenimientos', crearMantenimiento);
router.delete('/mantenimientos/:id', eliminarMantenimiento); 

//--- PEDIDOS ---
router.get('/pedidos', obtenerPedidos);
router.post('/pedidos', crearPedido);
router.put('/pedidos/:id/recibir', actualizarEstadoPedido);


export default router;

