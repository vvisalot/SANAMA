"use client";

import React, { useState, useEffect } from "react";
import { patientService } from "@/services/patientService";
import { useParams } from "next/navigation";

const HistorialClinico = () => {
  const params = useParams();
  const idPaciente = params.idmedicalHistory;

  const [historial, setHistorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await patientService.buscarHistorialClinico(idPaciente);
        setHistorial(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (idPaciente) {
      fetchHistorial();
    }
  }, [idPaciente]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el historial clínico</p>;
  if (!historial) return <p>No se encontró el historial clínico</p>;

  return (
    <div>
      <h3>Historial Clínico: {historial.codigo}</h3>
      <ul>
        {historial.hojasMedicas.map((hoja) => (
          <li key={hoja.idHojaMedica}>{hoja.codigo}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialClinico;
