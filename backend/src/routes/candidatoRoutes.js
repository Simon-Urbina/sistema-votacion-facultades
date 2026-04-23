import { Router } from "express";
import { listCandidatosByFacultad } from "../controllers/candidatoController.js";

const router = Router();

router.get("/facultad/:facultadId", listCandidatosByFacultad);

export default router;