import React, { useState } from "react";
import SearchDiagnostic from "./searchDiagnostic";
const DiagnosticoMedico = () => {
  const [diagnosticoData, setDiagnosticoData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addDiagnosticoField = (nuevoDiagnostico) => {
    setDiagnosticoData((prevDiagnosticoData) => [
      ...prevDiagnosticoData,
      nuevoDiagnostico,
    ]);
  };

  const removeDiagnosticoField = (index) => {
    setDiagnosticoData((prevDiagnosticoData) => {
      const updatedDiagnostico = [...prevDiagnosticoData];
      updatedDiagnostico.splice(index, 1);
      return updatedDiagnostico;
    });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-8">
      <h4 className="text-lg font-bold text-gray-700 mb-2">
        Diagnóstico Médico
      </h4>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Diagnóstico (CIE-10)
        </label>
        {diagnosticoData.map((diagnose, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={`${diagnose.idCiex} - ${diagnose.ciex}`}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeDiagnosticoField(index)}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleOpenModal}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Search Diagnostic
      </button>

      <SearchDiagnostic
        show={showModal}
        onClose={handleCloseModal}
        onSelect={addDiagnosticoField} // Replace this with the actual onSelect handler
      />
    </div>
  );
};

export default DiagnosticoMedico;
