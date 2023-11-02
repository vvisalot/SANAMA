"use client";

import React, { useState, useEffect } from "react";
import { patientService } from "@/services/patientService";
import { useParams } from "next/navigation";
import MedicalRecordsTable from "../MedicalRecordsTable"; // Asegúrate de que el nombre del componente esté en PascalCase
import { parseHojaMedicaTable } from "@/util/medicalRecordParser";
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
        const tableData = parseHojaMedicaTable(data.hojasMedicas);
        setHistorialClinico({
          idHistorialClinico: data.idHistorialClinico,
          codigo: data.codigo,
        });
        setHojasMedicas(tableData);
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
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      {/* Barra de navegación en la parte superior */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h1 className="text-xl font-bold mb-4">Nueva Atención Médica</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              N° de Atención:
            </label>
            <span>{historialClinico.codigo}</span>
          </div>
          {/* ... (otros campos similares) */}
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="mb-6 space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md">
          Atender Nueva Consulta médica
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md">
          Solicitar Orden de Laboratorio
        </button>
      </div>

      {/* Sección de Hojas Médicas Existentes */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          Hojas Medicas Existentes:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-600">Desde:</label>
            <input className="border rounded p-2 w-full" type="date" />
          </div>
          {/* ... (otros campos similares) */}
        </div>
        <MedicalRecordsTable data={hojasMedicas}></MedicalRecordsTable>
      </div>
    </div>
  );
};

export default HistorialClinico;
