import React from "react";

const MainInfoComponent = ({ appointmentData }) => {
  if (!appointmentData) {
    return <p>Loading appointment data...</p>; // Or any other loading state representation
  }

  const { paciente, triaje } = appointmentData;
  return (
    <>
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Información del Paciente
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Paciente"
            value={`${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`}
            disabled
          />
          <InputField
            label="Fecha de Nacimiento"
            value={`${paciente.fechaNacimiento}`}
            disabled
          />
          <InputField label="Paciente" value={`${paciente.sexo}`} disabled />
        </div>
      </div>

      {triaje && (
        <div className="col-span-2">
          <h4 className="text-lg font-bold text-gray-700 mb-2">
            Información del Medica
          </h4>
          <InputField label="Peso" value={triaje.peso} disabled />
          <InputField label="Talla" value={triaje.talla} disabled />
          <InputField label="Temperatura" value={triaje.temperatura} disabled />
        </div>
      )}
    </>
  );
};

const InputField = ({ label, value, disabled, type = "text" }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        className="mt-1 p-2 w-full border-gray-300 rounded-md"
      />
    </div>
  );
};

export default MainInfoComponent;
