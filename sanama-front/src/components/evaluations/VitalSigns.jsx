import React from "react";

const VitalSigns = ({ formData, handleInputChange }) => {
  const renderInputField = (label, name, value, type = "text") => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder={label}
        />
      </div>
    );
  };
  return (
    <>
      <div className="col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInputField(
            "Temperatura (°C)",
            "formData.temperatura",
            formData.temperatura
          )}
          {renderInputField(
            "Frecuencia Cardiaca",
            "formData.frecuenciaCardiaca",
            formData.frecuenciaCardiaca
          )}
          {renderInputField(
            "Frecuencia Respiratoria",
            "formData.frecuenciaRespiratoria",
            formData.frecuenciaRespiratoria
          )}
          {renderInputField(
            "Presión Arterial",
            "formData.presionArterial",
            formData.presionArterial
          )}
          {renderInputField(
            "Saturación de Oxígeno (%)",
            "formData.saturacionOxigeno",
            formData.saturacionOxigeno
          )}
        </div>
      </div>
    </>
  );
};

export default VitalSigns;
