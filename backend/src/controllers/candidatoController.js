import { getCandidatosPorFacultad } from "../services/candidatoService.js";

export const listCandidatosByFacultad = async (req, res) => {
  try {
    const { facultadId } = req.params;
    const candidatos = await getCandidatosPorFacultad(facultadId);
    return res.status(200).json(candidatos);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};