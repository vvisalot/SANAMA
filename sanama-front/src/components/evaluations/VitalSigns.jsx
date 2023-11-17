import React, { useState } from "react";

const VitalSigns = ({ defaultTriaje, setMedicalRecordData }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const pattern = fields.find((field) => field.name === name).pattern;
    const regex = new RegExp(pattern);
    const isValid = regex.test(value);

    setMedicalRecordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? !regex.test(value) : false,
    }));
  };

  const fields = [
    {
      type: "number",
      label: "Temperatura (°C)",
      name: "temperatura",
      value: defaultTriaje.temperatura,
      pattern: "^(3[6-9](\\.\\d)?|40(\\.0)?)$", // Asegúrate de escapar los caracteres especiales
    },
    {
      type: "number",
      label: "Frecuencia Cardiaca (FC)",
      name: "frecuenciaCardiaca",
      value: defaultTriaje.frecuenciaCardiaca,
      pattern: "^([6-9]\\d|100)$", // Valores entre 60 y 100
    },
    {
      type: "number",
      label: "Frecuencia Respiratoria (FR)",
      name: "frecuenciaRespiratoria",
      value: defaultTriaje.frecuenciaRespiratoria,
      pattern: "^1[2-9]|20$", // Valores entre 12 y 20
    },
    {
      type: "text",
      label: "Presión Arterial (Sistolica / Diastolica)",
      name: "presionArterial",
      value: defaultTriaje.presionArterial,
      pattern: "^(1[0-2]\\d|130)\\/(6\\d|7[0-9]|80)$", // Formato como "120/80"
    },
    {
      type: "number",
      label: "Saturación de Oxígeno (%)",
      name: "saturacionOxigeno",
      value: defaultTriaje.saturacionOxigeno,
      pattern: "^(9[5-9]|100)$", // Valores entre 95 y 100
    },
  ];

  const renderInputField = (field) => (
    <div key={field.name}>
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>
      <input
        type={field.type}
        name={field.name}
        defaultValue={defaultTriaje[field.name]}
        onChange={handleInputChange}
        className={`mt-1 p-2 w-full border-gray-300 rounded-md ${
          errors[field.name] ? "border-red-500" : ""
        }`}
        placeholder={field.label}
        pattern={field.pattern}
        title={`Ingrese un valor válido para ${field.label}`}
      />
      {errors[field.name] && (
        <p className="text-red-500 text-xs italic">Ingrese un valor válido</p>
      )}
    </div>
  );

  return (
    <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {fields.map(renderInputField)}
    </div>
  );
};

export default VitalSigns;
