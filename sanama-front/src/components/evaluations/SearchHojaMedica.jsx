import { Modal } from "flowbite-react";
import { useMedicalSheets } from "@/hooks/useMedicalSheets";
import SearchMedicalRecord from "./SearchMedicalRecord";

const SearchMedicalSheet = ({ idpaciente, show, onClose, onSelect }) => {
  const {
    searchFilters,
    setSearchFilters,
    searchResults,
    loading,
    selectedMedicalSheet,
    handleMedicalSheetSelect,
    resetData,
  } = useMedicalSheets();

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
            <div className="flex rounded-md m-2 bg-white shadow shadow-black/20">
              <SearchMedicalRecord
                idpaciente={idpaciente}
                onSearch={(filters) => {
                  setSearchFilters(filters);
                }}
              />
              <button
                type="button"
                onClick={handleConfirm}
                className=" inline-flex cursor-pointer items-center rounded-r text-white bg-green-500 px-2 py-2 hover:bg-green-400"
              >
                Confirmar
              </button>
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
