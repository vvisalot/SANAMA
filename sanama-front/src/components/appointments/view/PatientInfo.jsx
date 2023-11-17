import React from "react";

const CAMPOS = [
  { id: "nombres", label: "PACIENTE", type: "text" },
  { id: "dni", label: "DOCUMENTO DE IDENTIDAD", type: "text" },
  { id: "fecha-atencion", label: "FECHA DE ATENCION", type: "date" },
  { id: "hora-atencion", label: "HORA DE ATENCION", type: "time" },
  { id: "medico-responsable", label: "MEDICO RESPONSABLE", type: "text" },
  { id: "especialidad", label: "ESPECIALIDAD", type: "text" },
  { id: "nombreAcompanhante", label: "ACOMPAÑANTE", type: "text" },
  { id: "dniAcompanhante", label: "DNI ACOMPAÑANTE", type: "text" },
  { id: "estado", label: "ESTADO", type: "text" },
];

const ESTADOS = [
  "Atendida",
  "En Consultorio",
  "Cancelada",
  "Pendiente",
  "En Triaje",
];

const PatientInfo = ({ pacienteData, appointmentData, doctor }) => {
  const getValue = (id) => {
    switch (id) {
      case "nombres":
        return `${pacienteData.nombres} ${pacienteData.apellidoPaterno} ${pacienteData.apellidoMaterno}`;
      case "dni":
        return pacienteData.dni;
      case "fecha-atencion":
        return appointmentData.fechaCita;
      case "hora-atencion":
        return appointmentData.horaCita;
      case "medico-responsable":
        return `${doctor.nombres} ${doctor.apellidoPaterno} ${doctor.apellidoMaterno}`;
      case "especialidad":
        return doctor.especialidad ? doctor.especialidad.nombre : "";
      case "dniAcompanhante":
        return appointmentData.dniAcompanhante || "No especificado";
      case "nombreAcompanhante":
        return appointmentData.nombreAcompanhante || "No especificado";
      case "estado":
        return ESTADOS[appointmentData.estado - 1] || "Desconocido";
      default:
        return "Desconocido";
    }
  };

  return pacienteData ? (
    <>
      <div className="flex items-center space-x-2 w-full">
        <h2 className="text-2xl font-bold mb-4 text-primary-dusk-blue">{`${appointmentData.codigoCita}`}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {CAMPOS.map(({ id, label, type }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-primary-dusk-blue"
            >
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              className="mt-1 p-2 w-full border rounded-md"
              value={getValue(id)}
              readOnly
            />
          </div>
        ))}
      </div>
    </>
  ) : null;
};

export default PatientInfo;
