import axiosClient from "./axiosClient";

export const getCandidatosByFacultadRequest = async (facultadId) => {
  const response = await axiosClient.get(`/candidatos/facultad/${facultadId}`);
  return response.data;
};