import React from "react";

const VitalSigns = ({ formData, handleInputChange }) => {
  const fields = [
    {
      label: "Temperatura (°C)",
      name: "temperatura",
      value: formData.temperatura,
    },
    {
      label: "Frecuencia Cardiaca",
      name: "frecuenciaCardiaca",
      value: formData.frecuenciaCardiaca,
    },
    {
      label: "Frecuencia Respiratoria",
      name: "frecuenciaRespiratoria",
      value: formData.frecuenciaRespiratoria,
    },
    {
      label: "Presión Arterial",
      name: "presionArterial",
      value: formData.presionArterial,
    },
    {
      label: "Saturación de Oxígeno (%)",
      name: "saturacionOxigeno",
      value: formData.saturacionOxigeno,
    },
  ];

  const renderInputField = (field) => (
    <div key={field.name}>
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>
      <input
        type="text"
        name={field.name}
        defaultValue={field.value}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border-gray-300 rounded-md"
        placeholder={field.label}
      />
    </div>
  );

  return (
    <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {fields.map(renderInputField)}
    </div>
  );
};

export default VitalSigns;
