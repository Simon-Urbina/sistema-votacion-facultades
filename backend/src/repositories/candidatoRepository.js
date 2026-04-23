import { supabase } from "../config/supabase.js";

export const findCandidatosByFacultadId = async (facultadId) => {
  const { data, error } = await supabase
    .from("candidatos")
    .select("*")
    .eq("facultad_id", facultadId)
    .order("nombre", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const findCandidatoById = async (candidatoId) => {
  const { data, error } = await supabase
    .from("candidatos")
    .select("*")
    .eq("id", candidatoId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};