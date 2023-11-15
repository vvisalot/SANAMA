import React from "react";

const ClinicalTab = ({ triaje, handleInputChange }) => {
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
        <h4 className="text-lg font-bold text-gray-700 mb-2">Signos Vitales</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInputField(
            "Temperatura (°C)",
            "triaje.temperatura",
            triaje?.temperatura
          )}
          {renderInputField(
            "Frecuencia Cardiaca",
            "triaje.frecuenciaCardiaca",
            triaje?.frecuenciaCardiaca
          )}
          {renderInputField(
            "Frecuencia Respiratoria",
            "triaje.frecuenciaRespiratoria",
            triaje?.frecuenciaRespiratoria
          )}
          {renderInputField(
            "Presión Arterial",
            "triaje.presionArterial",
            triaje?.presionArterial
          )}
          {renderInputField(
            "Saturación de Oxígeno (%)",
            "triaje.saturacionOxigeno",
            triaje?.saturacionOxigeno
          )}
        </div>
      </div>
    </>
  );
};

export default ClinicalTab;
