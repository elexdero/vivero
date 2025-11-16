import express from 'express'
import { PORT } from './config.js';

const app = express();

app.listen(PORT);
console.log(`El servidor esta corriendo en http://localhost:${PORT}`);