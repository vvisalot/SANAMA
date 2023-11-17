import React, { useState } from "react";
import SearchMedicalSheet from "./SearchHojaMedica";
import { useParams } from "next/navigation";

const ChiefComplaint = ({ setEvaluationData }) => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const idPaciente = params.idPaciente;

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setEvaluationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addEvaluation = (selectedHoja) => {
    if (selectedHoja && selectedHoja.idHojaMedica) {
      setEvaluationData((prevData) => ({
        ...prevData,
        hojaRefencia: { idHojaReferenciada: selectedHoja.idHojaMedica },
      }));
    } else {
      console.error("Hoja Médica seleccionada no válida o sin ID.");
    }
  };

  const removeEvaluation = (selectedHoja) => {
    setEvaluationData((prevData) => ({
      ...prevData,
      hojaRefencia: null, // Change here
    }));
  };

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
          onBlur={handleBlur} // Cambio aquí
        />
        <TextAreaField
          label="Motivo de Consulta:"
          name="motivoConsulta"
          placeholder="Ingresa el motivo.."
          onBlur={handleBlur}
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
          onSelect={addEvaluation}
        />
      </div>
    </div>
  );
};

const TextAreaField = ({ label, name, onBlur, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        onBlur={onBlur} // Usar el prop onBlur aquí
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
