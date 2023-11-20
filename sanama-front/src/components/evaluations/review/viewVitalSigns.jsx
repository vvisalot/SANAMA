import React from "react";

const viewVitalSigns = ({ defaultTriaje }) => {
  const fields = [
    {
      label: "Temperatura (°C)",
      value: defaultTriaje.temperatura,
    },
    {
      label: "Frecuencia Cardiaca (FC)",
      value: defaultTriaje.frecuenciaCardiaca,
    },
    {
      label: "Frecuencia Respiratoria (FR)",
      value: defaultTriaje.frecuenciaRespiratoria,
    },
    {
      label: "Presión Arterial (Sistolica / Diastolica)",
      value: defaultTriaje.presionArterial,
    },
    {
      label: "Saturación de Oxígeno (%)",
      value: defaultTriaje.saturacionOxigeno,
    },
  ];

  const renderDataField = (field) => (
    <div key={field.label} className="p-2 border-b border-gray-300">
      <div className="text-sm font-medium text-gray-700">{field.label}</div>
      <div className="text-lg text-gray-900">{field.value || "N/A"}</div>
    </div>
  );

  return (
    <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {fields.map(renderDataField)}
    </div>
  );
};

export default viewVitalSigns;
