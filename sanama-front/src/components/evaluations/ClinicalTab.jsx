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

  const renderTextArea = (label, name, value, rows = 3) => {
    return (
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          rows={rows}
        ></textarea>
      </div>
    );
  };

  return (
    <>
      {/* Signos Vitales */}
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
          {renderInputField(
            "Peso (kg)",
            "ClinicalTab.signosVitales.peso",
            clinicalData?.signosVitales?.peso,
            "number"
          )}
          {renderInputField(
            "Talla (cm)",
            "ClinicalTab.signosVitales.talla",
            clinicalData?.signosVitales?.talla,
            "number"
          )}
        </div>
      </div>
      {/* Datos de la Consulta */}
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Datos de la Consulta
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderTextArea(
            "Antecedentes",
            "ClinicalTab.antecedentes",
            clinicalData?.antecedentes
          )}
          {renderTextArea(
            "Motivo de Consulta",
            "ClinicalTab.motivoConsulta",
            clinicalData?.motivoConsulta
          )}
        </div>
      </div>
      {/* Exploración Física */}
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Exploración Física
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderTextArea(
            "Examen General",
            "ClinicalTab.exploracionFisica.exGeneral",
            clinicalData?.exploracionFisica?.exGeneral
          )}
          {renderTextArea(
            "Piel y Faneras",
            "ClinicalTab.exploracionFisica.pielYFaneras",
            clinicalData?.exploracionFisica?.pielYFaneras
          )}
          {renderTextArea(
            "Cabeza y Cuello",
            "ClinicalTab.exploracionFisica.cabezaYCuello",
            clinicalData?.exploracionFisica?.cabezaYCuello
          )}
          {renderTextArea(
            "Torax y Pulmones",
            "ClinicalTab.exploracionFisica.toraxYPulmones",
            clinicalData?.exploracionFisica?.toraxYPulmones
          )}
          {renderTextArea(
            "Cardiovascular",
            "ClinicalTab.exploracionFisica.cardiovascular",
            clinicalData?.exploracionFisica?.cardiovascular
          )}
          {renderTextArea(
            "Abdomen",
            "ClinicalTab.exploracionFisica.abdomen",
            clinicalData?.exploracionFisica?.abdomen
          )}
          {renderTextArea(
            "Urogenital",
            "ClinicalTab.exploracionFisica.urogenital",
            clinicalData?.exploracionFisica?.urogenital
          )}
          {renderTextArea(
            "Extremidades",
            "ClinicalTab.exploracionFisica.extremidades",
            clinicalData?.exploracionFisica?.extremidades
          )}
          {renderTextArea(
            "SNC (Sistema Nervioso Central)",
            "ClinicalTab.exploracionFisica.snc",
            clinicalData?.exploracionFisica?.snc
          )}
        </div>
      </div>
      {renderTextArea(
        "Observaciones",
        "ClinicalTab.observaciones",
        clinicalData?.observaciones
      )}
    </>
  );
};

export default ClinicalTab;
