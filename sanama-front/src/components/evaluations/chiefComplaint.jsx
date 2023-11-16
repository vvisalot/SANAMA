import React from "react";

const ChiefComplaint = ({ formData, handleInputChange }) => {
  return (
    <div className="my-4">
      <div className="grid grid-cols-1 gap-4">
        <TextAreaField
          label="Antecedentes:"
          name="antecedentes"
          placeholder="Ingresa los antecentes.."
          handleInputChange={handleInputChange}
        />
        <TextAreaField
          label="Motivo de Consulta:"
          name="motivoConsulta"
          placeholder="Ingresa el motivo.."
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const TextAreaField = ({ label, name, handleInputChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        onChange={handleInputChange}
        className="resize-none mt-1 p-2 w-full border-gray-300 rounded-md"
        placeholder={placeholder}
        rows={4}
        aria-label={label}
        maxlength="255"
      ></textarea>
    </div>
  );
};

export default ChiefComplaint;
