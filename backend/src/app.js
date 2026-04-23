import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sedeRoutes from "./routes/sedeRoutes.js";
import facultadRoutes from "./routes/facultadRoutes.js";
import candidatoRoutes from "./routes/candidatoRoutes.js";
import votoRoutes from "./routes/votoRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://sistema-votacion-facultades-production.up.railway.app/', 'http://localhost:5173']
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend del sistema de votación activo" });
});

app.use("/api/sedes", sedeRoutes);
app.use("/api/facultades", facultadRoutes);
app.use("/api/candidatos", candidatoRoutes);
app.use("/api/votos", votoRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});