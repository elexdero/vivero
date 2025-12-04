import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config.js';

// --- CAMBIO AQUÍ: Importa SOLO tu archivo main.routes.js ---
import mainRoutes from './routes/main.routes.js'; 

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', mainRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

app.listen(PORT || 4000);
console.log(`Servidor corriendo en http://localhost:${PORT || 4000}`);