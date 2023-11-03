"use client";

import React, { useState, useEffect } from "react";
import { patientService } from "@/services/patientService";
import { useParams } from "next/navigation";
import MedicalRecordsTable from "../MedicalRecordsTable"; // Asegúrate de que el nombre del componente esté en PascalCase
import { parseHojaMedicaTable } from "@/util/medicalRecordParser";
import usePatientForm from "@/hooks/usePatientForm";
import { sexParser } from "@/util/patientParser";

const HistorialClinico = () => {
  const params = useParams();
  const idPaciente = params.idmedicalHistory;

  const { patientForm, setPatientForm } = usePatientForm();

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

  const fetchData = async () => {
    try {
      const data = await patientService.mostrarPacienteRegistrado(idPaciente);
      console.log(data.idPersona);

      setPatientForm({
        ...patientForm,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        nombres: data.nombres,
        tipoSeguro: data.tipoSeguro,
        codigoSeguro: data.codigoSeguro,
        dni: data.dni,
        direccion: data.direccion,
        telefono: data.telefono,
        correo: data.correo,
        sexo: sexParser(data.sexo),
        fechaNacimiento: data.fechaNacimiento,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (idPaciente) {
      fetchData();
    }
  }, [idPaciente]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el historial clínico</p>;
  if (!historialClinico) return <p>No se encontró el historial clínico</p>;

  const PatientDataDisplay = ({ patient }) => (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Datos del Paciente:</h2>
      <div className="flex flex-wrap mb-6">
        <div className="flex-1 min-w-1/2">
          <p>
            <strong>Nombre:</strong>{" "}
            {`${patient.nombres} ${patient.apellidoPaterno} ${patient.apellidoMaterno}`}
          </p>
          <p>
            <strong>DNI:</strong> {patient.dni}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong> {patient.fechaNacimiento}
          </p>{" "}
          <p>
            <strong>Sexo:</strong> {patient.sexo}
          </p>{" "}
        </div>

        {/* Columna 2 */}
        <div className="flex-1 min-w-1/2">
          <p>
            <strong>Dirección:</strong> {patient.direccion}
          </p>
          <p>
            <strong>Teléfono:</strong> {patient.telefono}
          </p>
          <p>
            <strong>Correo Electrónico:</strong> {patient.correo}
          </p>
          <p>
            <strong>Tipo de Seguro:</strong> {patient.tipoSeguro}
          </p>
          <p>
            <strong>Código de Seguro:</strong> {patient.codigoSeguro}
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-4">
          Historial Clínico: {historialClinico.codigo}
        </h1>{" "}
        <PatientDataDisplay patient={patientForm} />
      </div>

      {/* Botones de acciones */}
      <div className="mb-6 space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md">
          Atender Nueva Consulta médica
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
        </div>
        <MedicalRecordsTable data={hojasMedicas}></MedicalRecordsTable>
      </div>
    </div>
  );
};

export default HistorialClinico;
