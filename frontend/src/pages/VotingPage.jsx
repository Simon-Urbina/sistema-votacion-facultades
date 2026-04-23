import { useEffect, useState } from "react";
import { getSedesRequest } from "../api/sedeApi";
import { getFacultadesBySedeRequest } from "../api/facultadApi";
import { getCandidatosByFacultadRequest } from "../api/candidatoApi";
import { createVoteRequest } from "../api/votoApi";

import SedeSelect from "../components/SedeSelect";
import FacultadSelect from "../components/FacultadSelect";
import CandidateCard from "../components/CandidateCard";
import VoteForm from "../components/VoteForm";

export default function VotingPage() {
  const [sedes, setSedes] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [candidatos, setCandidatos] = useState([]);

  const [sedeId, setSedeId] = useState("");
  const [facultadId, setFacultadId] = useState("");
  const [candidatoId, setCandidatoId] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const data = await getSedesRequest();
        setSedes(data);
      } catch {
        setMessage("Error al cargar las sedes");
      }
    };

    fetchSedes();
  }, []);

  const handleSedeChange = async (e) => {
    const selectedSedeId = e.target.value;
    setSedeId(selectedSedeId);
    setFacultadId("");
    setCandidatoId("");
    setCandidatos([]);
    setMessage("");

    if (!selectedSedeId) {
      setFacultades([]);
      return;
    }

    try {
      const data = await getFacultadesBySedeRequest(selectedSedeId);
      setFacultades(data);
    } catch {
      setMessage("Error al cargar las facultades");
    }
  };

  const handleFacultadChange = async (e) => {
    const selectedFacultadId = e.target.value;
    setFacultadId(selectedFacultadId);
    setCandidatoId("");
    setMessage("");

    if (!selectedFacultadId) {
      setCandidatos([]);
      return;
    }

    try {
      const data = await getCandidatosByFacultadRequest(selectedFacultadId);
      setCandidatos(data);
    } catch {
      setMessage("Error al cargar los candidatos");
    }
  };

  const handleVote = async () => {
    try {
      const payload = {
        votante_identificacion: identificacion,
        sede_id: Number(sedeId),
        facultad_id: Number(facultadId),
        candidato_id: Number(candidatoId),
      };

      const response = await createVoteRequest(payload);
      setMessage(response.message);

      setIdentificacion("");
      setSedeId("");
      setFacultadId("");
      setCandidatoId("");
      setFacultades([]);
      setCandidatos([]);
    } catch (error) {
      setMessage(error.response?.data?.message || "No fue posible registrar el voto");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Sistema de Votación</h1>
        <p>Seleccione la sede, la facultad y el candidato de su preferencia.</p>
      </div>

      <div className="selectors">
        <SedeSelect sedes={sedes} value={sedeId} onChange={handleSedeChange} />

        <FacultadSelect
          facultades={facultades}
          value={facultadId}
          onChange={handleFacultadChange}
          disabled={!sedeId}
        />
      </div>

      <div className="candidates-grid">
        {candidatos.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            selected={Number(candidatoId) === Number(candidate.id)}
            onSelect={setCandidatoId}
          />
        ))}
      </div>

      <VoteForm
        identificacion={identificacion}
        onChange={(e) => setIdentificacion(e.target.value)}
        onSubmit={handleVote}
        disabled={!identificacion || !sedeId || !facultadId || !candidatoId}
      />

      {message && <div className="message-box">{message}</div>}
    </div>
  );
}