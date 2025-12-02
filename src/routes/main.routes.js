import ROUTER  from 'express'
import { iniciarSesion, registrarUsuario } from "../controllers/main.controller.js";

const router = ROUTER();

router.post('/register', registrarUsuario)
router.post('/login', iniciarSesion)