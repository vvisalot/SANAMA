import React, { useState } from "react";
import SearchMedicalSheet from "./SearchHojaMedica";
const ChiefComplaint = ({ formData, setEvaluationData }) => {
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="my-4 ml-4">
      <div className="grid grid-cols-1 gap-4">
        <TextAreaField
          label="Antecedentes:"
          name="antecedentes"
          placeholder="Ingresa los antecentes.."
          setEvaluationData={setEvaluationData}
        />
        <TextAreaField
          label="Motivo de Consulta:"
          name="motivoConsulta"
          placeholder="Ingresa el motivo.."
          setEvaluationData={setEvaluationData}
        />
        <button
          type="button"
          onClick={handleOpenModal}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Asociar Hoja Medica
        </button>

        <SearchMedicalSheet show={showModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

const TextAreaField = ({ label, name, setEvaluationData, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        onChange={setEvaluationData}
        className="resize-none mt-1 p-2 w-full border-gray-300 rounded-md"
        placeholder={placeholder}
        rows={4}
        aria-label={label}
        maxLength="255"
      ></textarea>
    </div>
  );
};

export default ChiefComplaint;
