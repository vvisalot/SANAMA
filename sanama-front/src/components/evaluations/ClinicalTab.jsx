import React from "react";

const ClinicalTab = ({ clinicalData, handleInputChange }) => {
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
            "ClinicalTab.signosVitales.temperatura",
            clinicalData?.signosVitales?.temperatura
          )}
          {renderInputField(
            "Frecuencia Cardiaca",
            "ClinicalTab.signosVitales.fc",
            clinicalData?.signosVitales?.fc
          )}
          {renderInputField(
            "Frecuencia Respiratoria",
            "ClinicalTab.signosVitales.fr",
            clinicalData?.signosVitales?.fr
          )}
          {renderInputField(
            "Presión Arterial",
            "ClinicalTab.signosVitales.pa",
            clinicalData?.signosVitales?.pa
          )}
          {renderInputField(
            "Saturación de Oxígeno (%)",
            "ClinicalTab.signosVitales.sat",
            clinicalData?.signosVitales?.sat
          )}
        </div>
      </div>
    </>
  );
};

export default ClinicalTab;
