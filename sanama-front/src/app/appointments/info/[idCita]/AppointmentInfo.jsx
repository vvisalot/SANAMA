import React, { useMemo } from "react";

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

const getValue = (
  id,
  appointmentData,
  nombreDoctor,
  especialidadNombre,
  status
) => {
  switch (id) {
    case "medico-responsable":
      return nombreDoctor;
    case "especialidad":
      return especialidadNombre;
    case "estado":
      return status;
    default:
      return appointmentData[id];
  }
};

const getStatus = (estado) => {
  switch (estado) {
    case 1:
      return "Atendida";
    case 2:
      return "En Consultorio";
    case 3:
      return "Cancelada";
    case 4:
      return "Pendiente";
    default:
      return "Desconocido";
  }
};

const AppointmentInfo = ({
  appointmentData: { estado, ...appointmentData },
  doctor,
}) => {
  const nombreDoctor = useMemo(
    () =>
      `${doctor.sexo === "M" ? "Dr." : "Dra."} ${doctor.nombres} ${
        doctor.apellidoPaterno
      } ${doctor.apellidoMaterno}`,
    [doctor]
  );
  const especialidadNombre = useMemo(
    () => (doctor.especialidad ? doctor.especialidad.nombre : ""),
    [doctor]
  );
  const status = useMemo(() => getStatus(estado), [estado]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        Información de la atención
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {camposAtencion.map(({ id, label, type }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              className="mt-1 p-2 w-full border rounded-md"
              defaultValue={getValue(
                id,
                appointmentData,
                nombreDoctor,
                especialidadNombre,
                status
              )}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentInfo;
