import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import { router as proyectRoutes } from './routes/proyectRoutes.js';
import { router as userRoutes } from './routes/userRoutes.js';

const app = express();
app.use(express.json()) /* Sirve para poder leer archivos JSON del request */

dotenv.config();
connectDB()

// Routing
app.use("/api/usuarios", userRoutes )
app.use("/api/proyectos", proyectRoutes )

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
});
