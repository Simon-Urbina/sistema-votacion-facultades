import { findCandidatosByFacultadId } from "../repositories/candidatoRepository.js";

export const getCandidatosPorFacultad = async (facultadId) => {
  if (!facultadId) {
    throw new Error("El id de la facultad es obligatorio");
  }

  return await findCandidatosByFacultadId(facultadId);
};