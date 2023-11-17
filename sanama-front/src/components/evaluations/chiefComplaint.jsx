import React, { useState } from "react";
import SearchMedicalSheet from "./SearchHojaMedica";
import { useParams } from "next/navigation";

const ChiefComplaint = ({ formData, setEvaluationData }) => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const idPaciente = params.idPaciente;
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
        <div className="flex flex-row-reverse">
          <button
            type="button"
            className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
            onClick={handleOpenModal}
          >
            Asociar Hoja Medica Existente
          </button>
        </div>
        <SearchMedicalSheet
          idPaciente={idPaciente}
          show={showModal}
          onClose={handleCloseModal}
        />
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
