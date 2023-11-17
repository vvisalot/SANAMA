"use client";
import { useState } from "react";
import { Modal } from "flowbite-react";
import { useMedicalSheets } from "@/hooks/useMedicalSheets";

const SearchMedicalSheet = ({ idpaciente, show, onClose, onSelect }) => {
  const [especialidadId, setEspecialidadId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const {
    searchFilters,
    setSearchFilters,
    searchResults,
    loading,
    selectedMedicalSheet,
    handleMedicalSheetSelect,
    resetData,
  } = useMedicalSheets();

  const handleSubmit = () => {
    setSearchFilters({
      pn_id_paciente: idpaciente,
      pn_id_especialidad: especialidadId || null,
      pd_fecha_inicio: fechaInicio || null,
      pd_fecha_fin: fechaFin || null,
    });
  };

  const handleConfirm = () => {
    if (selectedMedicalSheet) {
      onSelect(selectedMedicalSheet);
      onClose();
      resetData();
    }
  };

  return (
    <Modal show={show} size="6xl" popup onClose={onClose}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <h3 className="p-4 mb-6 text-2xl font-bold text-gray-900">
          Buscar Hoja existente
        </h3>
        <div className="space-y-2 ">
          <div className="relative">
            <div className="flex gap-4 rounded-md m-2">
              <div className="flex-1 min-w-[200px]">
                <label
                  htmlFor="especialidadId"
                  className="block text-sm font-medium text-gray-700"
                >
                  ID de Especialidad
                </label>
                <input
                  type="text"
                  id="especialidadId"
                  value={especialidadId}
                  onChange={(e) => setEspecialidadId(e.target.value)}
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
                  placeholder="Ingrese ID de Especialidad"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label
                  htmlFor="fechaInicio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  id="fechaInicio"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label
                  htmlFor="fechaFin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Fin
                </label>
                <input
                  type="date"
                  id="fechaFin"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  Buscar
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-400"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
          {searchResults.length > 0 && searchFilters && (
            <div className="w-full max-h-screen overflow-y-auto rounded-md bg-white px-4 pt-3">
              {searchResults.map((result) => (
                <div
                  key={result.idDiagnostico}
                  onClick={() => handleMedicalSheetSelect(result)}
                  className="cursor-pointer py-2 px-3 hover:bg-slate-100 rounded"
                >
                  <p className="text-sm font-medium text-black">
                    {result.ciex}
                  </p>
                </div>
              ))}
              {loading && (
                <div className="py-2 px-3">
                  <p className="text-sm text-gray-500">
                    Cargando resultados...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex">
          {selectedMedicalSheet && (
            <div className="flex flex-col">
              <div className="py-2 px-3">
                <p className="text-m font-semibold text-black">
                  Código de Hoja Médica: {selectedMedicalSheet.codigo}
                </p>
                <p className="text-sm text-black">
                  Especialidad:{" "}
                  {selectedMedicalSheet.citaMedica.medico.especialidad.nombre}
                </p>
                <p className="text-sm text-black">
                  Doctor: {selectedMedicalSheet.citaMedica.medico.nombres}{" "}
                  {selectedMedicalSheet.citaMedica.medico.apellidoPaterno}{" "}
                  {selectedMedicalSheet.citaMedica.medico.apellidoMaterno}
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchMedicalSheet;