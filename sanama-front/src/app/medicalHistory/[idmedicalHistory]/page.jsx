"use client";

import React, { useState, useEffect } from "react";
import { patientService } from "@/services/patientService";
import { useParams } from "next/navigation";
import MedicalRecordsTable from "../MedicalRecordsTable"; // Asegúrate de que el nombre del componente esté en PascalCase

const HistorialClinico = () => {
  const params = useParams();
  const idPaciente = params.idmedicalHistory;

  const [historialClinico, setHistorialClinico] = useState(null);
  const [hojasMedicas, setHojasMedicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await patientService.buscarHistorialClinico(idPaciente);
        setHistorialClinico({
          idHistorialClinico: data.idHistorialClinico,
          codigo: data.codigo,
          idMedicoCreador: data.idMedicoCreador,
        });
        setHojasMedicas(data.hojasMedicas);
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
  if (!historialClinico) return <p>No se encontró el historial clínico</p>;

  return (
    <div>
      <h3>Historial Clínico: {historialClinico.codigo}</h3>
      <ul>
        {hojasMedicas.map((hoja) => (
          <li key={hoja.idHojaMedica}>
            {hoja.codigo} {hoja.idMedicoCreador}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialClinico;
