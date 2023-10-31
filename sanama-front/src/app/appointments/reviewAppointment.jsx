import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Container,
  Paper,
  InputLabel,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import useAppointmentInfo from "./path/to/your/useAppointmentInfo";

const patientFieldsConfig = [
  { name: "codigoSeguro", label: "N° DE SEGURO" },
  { name: "dni", label: "DOCUMENTO DE IDENTIDAD" },
  { name: "tipoSeguro", label: "TIPO DE SEGURO" },
  { name: "nombres", label: "NOMBRES" },
  { name: "apellidoPaterno", label: "PRIMER APELLIDO" },
  { name: "apellidoMaterno", label: "SEGUNDO APELLIDO" },
  { name: "fechaNacimiento", label: "FECHA DE NACIMIENTO" },
  { name: "telefono", label: "TELEFONO" },
  { name: "correo", label: "CORREO" },
];

const camposAtencion = [
  { id: "numero-cita", label: "Número de cita", type: "text" },
  { id: "fecha-atencion", label: "Fecha de atención", type: "date" },
  { id: "hora-atencion", label: "Hora de atención", type: "time" },
  { id: "medico-responsable", label: "Médico responsable", type: "text" },
  { id: "especialidad", label: "Especialidad", type: "text" },
  { id: "dniAcompanhante", label: "DOCUMENTO ACOMPAÑANTE", type: "text" },
  { id: "nombreAcompanhante", label: "NOMBRES ACOMPAÑANTE", type: "text" },
  { id: "estado", label: "Estado", type: "text" },
];

function reviewAppointment(appointmentData) {
  const theme = useTheme();
  const {
    loading,
    error,
    isAppointmentRegistered,
    confirmationMessage,
    handleRegisterAppointment,
  } = useAppointmentInfo();

  const pacienteData = appointmentData.selectedPatientData;
  const doctorResponsable = appointmentData.selectedDoctor;
  const companionData = appointmentData.companionData;
  const nombreDoctor = doctorResponsable
    ? `${doctorResponsable.sexo === "M" ? "Dr." : "Dra."} ${
        doctorResponsable.nombres
      } ${doctorResponsable.apellidoPaterno} ${
        doctorResponsable.apellidoMaterno
      }`
    : "";
  const especialidadNombre =
    doctorResponsable && doctorResponsable.especialidad
      ? doctorResponsable.especialidad.nombre
      : "";
  const horaCita = appointmentData.selectedHour;
  const fechaCita = appointmentData.selectedDate;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Información del paciente
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {patientFieldsConfig.map((campo) => (
            <div key={campo.name}>
              <label
                htmlFor={campo.name}
                className="block text-sm font-medium text-gray-700"
              >
                {campo.label}
              </label>
              <input
                type={campo.type}
                id={campo.name}
                name={campo.name}
                className="mt-1 p-2 w-full border rounded-md"
                defaultValue={pacienteData ? pacienteData[campo.name] : ""}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Información de la atención
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {camposAtencion.map((campo) => (
            <div key={campo.id}>
              <label
                htmlFor={campo.id}
                className="block text-sm font-medium text-gray-700"
              >
                {campo.label}
              </label>
              <input
                type={campo.type}
                id={campo.id}
                name={campo.id}
                className="mt-1 p-2 w-full border rounded-md"
                defaultValue={
                  campo.id === "fecha-atencion"
                    ? appointmentData.selectedDate
                    : campo.id === "hora-atencion"
                    ? appointmentData.selectedHour
                    : campo.id === "medico-responsable"
                    ? nombreDoctor
                    : campo.id === "estado"
                    ? "PENDIENTE"
                    : campo.id === "especialidad"
                    ? especialidadNombre
                    : appointmentData[campo.id]
                }
                readOnly
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="bg-blue-500 text-white p-2 w-full rounded-md"
        onClick={handleRegisterAppointment}
        disabled={loading || isAppointmentRegistered}
      >
        Atender Cita
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isAppointmentRegistered && (
        <p className="text-blue-500 mt-2">{confirmationMessage}</p>
      )}

      <button
        className="bg-blue-500 text-white p-2 w-full rounded-md mt-2"
        disabled={loading || isAppointmentRegistered}
      >
        Reprogramar Cita
      </button>

      <button
        className="bg-red-500 text-white p-2 w-full rounded-md mt-2"
        onClick={handleRegisterAppointment}
        disabled={loading || isAppointmentRegistered}
      >
        Cancelar
      </button>

      <Link href="/AppointmentManagement">
        <href className="bg-gray-500 text-white p-2 w-full rounded-md text-center block mt-2">
          Volver
        </href>
      </Link>
    </div>
  );
}

export default reviewAppointment;
