import React from "react";
import PropTypes from "prop-types";

const CAMPOS_ATENCION = [
  { id: "numero-cita", label: "CODIGO DE CITA", type: "text" },
  { id: "fecha-atencion", label: "FECHA DE ATENCION", type: "date" },
  { id: "hora-atencion", label: "HORA DE ATENCION", type: "time" },
  { id: "medico-responsable", label: "MEDICO RESPONSABLE", type: "text" },
  { id: "especialidad", label: "ESPECIALIDAD", type: "text" },
  { id: "dniAcompanhante", label: "DOCUMENTO ACOMPAÑANTE", type: "text" },
  { id: "nombreAcompanhante", label: "NOMBRES ACOMPAÑANTE", type: "text" },
  { id: "estado", label: "ESTADO", type: "text" },
];

const ESTADOS = ["Atendida", "En Consultorio", "Cancelada", "Pendiente"];

const AppointmentInfo = ({ appointmentData, doctor }) => {
  const getValue = (id) => {
    switch (id) {
      case "medico-responsable":
        return `${doctor.sexo === "M" ? "Dr." : "Dra."} ${doctor.nombres} ${
          doctor.apellidoPaterno
        } ${doctor.apellidoMaterno}`;
      case "especialidad":
        return doctor.especialidad ? doctor.especialidad.nombre : "";
      case "estado":
        return ESTADOS[appointmentData.estado - 1] || "Desconocido";
      default:
        return appointmentData[id];
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        Información de la atención
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {CAMPOS_ATENCION.map(({ id, label, type }) => (
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
              defaultValue={getValue(id)}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};

AppointmentInfo.propTypes = {
  appointmentData: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
};

export default React.memo(AppointmentInfo);
