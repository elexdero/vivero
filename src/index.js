import express from 'express';
import morgan from 'morgan';
import { PORT } from './config.js';
import plantasRoutes from './routes/plantas.routes.js';
import trabajadoresRoutes from './routes/trabajadores.routes.js';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(plantasRoutes, trabajadoresRoutes);


app.listen(PORT);
console.log(`El servidor esta corriendo en http://localhost:${PORT}`);