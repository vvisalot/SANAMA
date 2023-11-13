import React from "react";

const patientFieldsConfig = [
  { name: "dni", label: "DOCUMENTO DE IDENTIDAD" },
  { name: "nombres", label: "NOMBRES" },
  { name: "apellidoPaterno", label: "PRIMER APELLIDO" },
  { name: "apellidoMaterno", label: "SEGUNDO APELLIDO" },
];

const PatientInfo = ({ pacienteData }) => {
  return pacienteData ? (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Información del paciente</h2>
      <div className="grid grid-cols-4 gap-4">
        {patientFieldsConfig.map((campo) => (
          <div key={campo.name}>
            <label
              htmlFor={campo.name}
              className="block text-sm font-medium text-gray-700"
            >
              {campo.label}
            </label>
            <input
              type="text"
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
  ) : null;
};

export default PatientInfo;
