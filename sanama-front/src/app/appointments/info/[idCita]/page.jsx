import React from "react";
import Link from "next/link";
import useUpdateAppointmentStatus from "@/hooks/useUpdateAppointmentStatus";

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
  { id: "numero-cita", label: "CODIGO DE CITA", type: "text" },
  { id: "fecha-atencion", label: "FECHA DE ATENCION", type: "date" },
  { id: "hora-atencion", label: "HORA DE ATENCION", type: "time" },
  { id: "medico-responsable", label: "MEDICO RESPONSABLE", type: "text" },
  { id: "especialidad", label: "ESPECIALIDAD", type: "text" },
  { id: "dniAcompanhante", label: "DOCUMENTO ACOMPAÑANTE", type: "text" },
  { id: "nombreAcompanhante", label: "NOMBRES ACOMPAÑANTE", type: "text" },
  { id: "estado", label: "ESTADO", type: "text" },
];

const getFullName = (doctor) => {
  return doctor
    ? `${doctor.sexo === "M" ? "Dr." : "Dra."} ${doctor.nombres} ${
        doctor.apellidoPaterno
      } ${doctor.apellidoMaterno}`
    : "";
};

const getSpecialtyName = (doctor) => {
  return doctor && doctor.especialidad ? doctor.especialidad.nombre : "";
};

const PatientInfo = ({ pacienteData }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-semibold mb-4">Información del paciente</h2>
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
            type="text" // Todos los inputs son de tipo texto y readonly
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
);

const AppointmentInfo = ({
  appointmentData,
  nombreDoctor,
  especialidadNombre,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-semibold mb-4">Información de la atención</h2>
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
            defaultValue={getValue(
              appointmentData,
              campo.id,
              nombreDoctor,
              especialidadNombre
            )}
            readOnly
          />
        </div>
      ))}
    </div>
  </div>
);

const getValue = (appointmentData, id, nombreDoctor, especialidadNombre) => {
  switch (id) {
    case "fecha-atencion":
      return appointmentData.selectedDate;
    case "hora-atencion":
      return appointmentData.selectedHour;
    case "medico-responsable":
      return nombreDoctor;
    case "estado":
      return "PENDIENTE";
    case "especialidad":
      return especialidadNombre;
    default:
      return appointmentData[id];
  }
};

const ReviewAppointment = ({ appointmentData }) => {
  const pacienteData = appointmentData.selectedPatientData;
  const doctorResponsable = appointmentData.selectedDoctor;
  const nombreDoctor = getFullName(doctorResponsable);
  const especialidadNombre = getSpecialtyName(doctorResponsable);

  const { idCita, estado } = appointmentData;
  const { updateAppointmentStatus } = useUpdateAppointmentStatus();

  const handleAtenderCita = () => updateAppointmentStatus(idCita, 2);
  const handleCancelarCita = () => updateAppointmentStatus(idCita, 3);
  const handleReprogramarCita = () => {
    /* ... */
  }; // Implementa la lógica necesaria

  return (
    <div className="container mx-auto p-4">
      <PatientInfo pacienteData={pacienteData} />
      <AppointmentInfo
        appointmentData={appointmentData}
        nombreDoctor={nombreDoctor}
        especialidadNombre={especialidadNombre}
      />

      <button
        className="bg-blue-500 text-white p-2 w-full rounded-md"
        onClick={handleAtenderCita}
        disabled={loading || estado === "EN_CONSULTORIO"} // Asegúrate de deshabilitar el botón en el estado correspondiente
      >
        Atender Cita
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isStatusUpdated && (
        <p className="text-blue-500 mt-2">{confirmationMessage}</p>
      )}

      <button
        className="bg-blue-500 text-white p-2 w-full rounded-md mt-2"
        onClick={handleReprogramarCita}
        disabled={loading}
      >
        Reprogramar Cita
      </button>

      <button
        className="bg-red-500 text-white p-2 w-full rounded-md mt-2"
        onClick={handleCancelarCita}
        disabled={loading || estado === "CANCELADA"} // Asegúrate de deshabilitar el botón en el estado correspondiente
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
};

export default ReviewAppointment;
