import React, { useState } from "react";
import SearchDiagnostic from "./searchDiagnostic";
const DiagnosticoMedico = () => {
  const [diagnosticoData, setDiagnosticoData] = useState({
    diagnostico: [],
    selloYFirma: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleArrayChange = (index, value) => {
    setDiagnosticoData((prevState) => {
      const updatedDiagnostico = [...prevState.diagnostico];
      updatedDiagnostico[index] = value;
      return { ...prevState, diagnostico: updatedDiagnostico };
    });
  };

  const addDiagnosticoField = () => {
    setDiagnosticoData((prevState) => ({
      ...prevState,
      diagnostico: [...prevState.diagnostico, ""],
    }));
  };

  const handleDiagnosticSelect = (selectedPatient) => {
    setSelectedPatient(selectedPatient);
    console.log(selectedPatient);
  };

  const removeDiagnosticoField = (index) => {
    setDiagnosticoData((prevState) => {
      const updatedDiagnostico = [...prevState.diagnostico];
      updatedDiagnostico.splice(index, 1);
      return { ...prevState, diagnostico: updatedDiagnostico };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiagnosticoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        {diagnosticoData.diagnostico.map((diagnose, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={diagnose}
              onChange={(e) => handleArrayChange(index, e.target.value)}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              placeholder={`Diagnóstico ${index + 1}`}
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
        <button
          type="button"
          onClick={addDiagnosticoField}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Añadir Diagnóstico
        </button>
      </div>
      <button
        type="button"
        onClick={handleOpenModal}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Search Diagnostic
      </button>

      {/* Render the SearchDiagnostic component */}
      <SearchDiagnostic
        show={showModal}
        onClose={handleCloseModal}
        onSelect={handleDiagnosticSelect} // Replace this with the actual onSelect handler
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sello y Firma
        </label>
        <input
          type="text"
          name="selloYFirma"
          value={diagnosticoData.selloYFirma}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default DiagnosticoMedico;
