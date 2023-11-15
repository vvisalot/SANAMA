import React from "react";

const ChiefComplaint = ({ handleInputChange }) => {
  return (
    <div className="my-4">
      <h4 className="text-lg font-bold text-gray-700 mb-2">
        Antecedentes y Motivo de Consulta
      </h4>
      <div className="grid grid-cols-1 gap-4">
        <TextAreaField
          label="Antecedentes:"
          name="antecedentes"
          handleInputChange={handleInputChange}
        />
        <TextAreaField
          label="Motivo de Consulta:"
          name="motivoConsulta"
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const TextAreaField = ({ label, name, handleInputChange }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border-gray-300 rounded-md"
        rows={4}
        aria-label={label}
      ></textarea>
    </div>
  );
};

export default ChiefComplaint;
