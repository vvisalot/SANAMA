import React from "react";

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

const getValue = (appointmentData, id, nombreDoctor, especialidadNombre) => {
  switch (id) {
    case "medico-responsable":
      return nombreDoctor;
    case "especialidad":
      return especialidadNombre;
    default:
      return appointmentData[id];
  }
};

const AppointmentInfo = ({ appointmentData, doctor }) => {
  const nombreDoctor = `${doctor.sexo === "M" ? "Dr." : "Dra."} ${
    doctor.nombres
  } ${doctor.apellidoPaterno} ${doctor.apellidoMaterno}`;
  const especialidadNombre = doctor.especialidad
    ? doctor.especialidad.nombre
    : "";

  return (
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
};

export default AppointmentInfo;
