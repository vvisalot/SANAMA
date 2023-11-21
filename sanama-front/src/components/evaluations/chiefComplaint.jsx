import React, { useState } from "react";
import SearchMedicalSheet from "./SearchHojaMedica";
import { useParams } from "next/navigation";
import TextAreaField from "../common/TextAreaField";

const ChiefComplaint = ({ setMedicalRecordData }) => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const idPaciente = params.idPaciente;
  const handleOnBlurChange = (e) => {
    const { name, value } = e.target;
    setMedicalRecordData((prevData) => {
      const sections = name.split(".");
      if (sections.length === 2) {
        const section = sections[1];
        return {
          ...prevData,
          evaluacionMedica: {
            ...prevData.evaluacionMedica,
            [section]: value,
          },
        };
      }
      return prevData;
    });
  };

  const addEvaluation = (selectedHoja) => {
    if (selectedHoja && selectedHoja.idHojaMedica) {
      setMedicalRecordData((prevData) => ({
        ...prevData,
        hojaRefencia: { idHojaReferenciada: selectedHoja.idHojaMedica },
      }));
    } else {
      console.error("Hoja Médica seleccionada no válida o sin ID.");
    }
  };

  const removeEvaluation = () => {
    setMedicalRecordData((prevData) => ({
      ...prevData,
      hojaRefencia: null,
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
          name="evaluacionMedica.antecedentes"
          placeholder="Ingresa los antecentes.."
          onBlur={handleOnBlurChange} // Cambio aquí
        />
        <TextAreaField
          label="Motivo de Consulta:"
          name="evaluacionMedica.motivoConsulta"
          placeholder="Ingresa el motivo.."
          onBlur={handleOnBlurChange}
        />
        <TextAreaField
          label="Observaciones Adicionales:"
          name="evaluacionMedica.observaciones"
          placeholder="Ingresa observación.."
          onBlur={handleOnBlurChange}
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
          <button
            type="button"
            onClick={removeEvaluation}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            X
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

export default ChiefComplaint;
