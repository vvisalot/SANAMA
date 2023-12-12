"use client";
import { useState, useRef } from "react";
import useLaboratoryProfile from "@/hooks/useLaboratoryOrder";
import ActionButtonsLab from "@/components/laboratory/ActionButtonsLab";
import LaboratoryInfoSection from "@/components/laboratory/LaboratoryInfoSection";
import LaboratoryExamInfoSection from "@/components/laboratory/LaboratoryExamInfoSection";

const LaboratoryProfile = ({ params }) => {
  const {
    medicos,
    dataLaboratory,
    setDataLaboratory,
    handleSave,
    handleConfirmAnulacion,
    isLoading,
    error,
    handleMedicoChange,
  } = useLaboratoryProfile(params.idLaboratory);

  const hiddenFileInput = useRef(null);
  const charCountRef = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  const [missingFieldsModal, setMissingFieldsModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const downloadFile = (base64, fileName) => {
    const blob = base64ToBlob(base64, "application/pdf");

    const link = document.createElement("a");

    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: mimeType });
  };

  const handleAttendClick = () => {
    setIsEditable(!isEditable);
  };

  const handleCancelClick = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleCancel = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false);
  };

  const handleAcceptModal = () => {
    setShowModal(false);
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="w-full p-10 rounded-lg shadow-md">
      <section className="rounded-lg p-8 mx-auto flex flex-col space-y-6 md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        <ActionButtonsLab
          handleAttendClick={handleAttendClick}
          handleCancelClick={handleCancelClick}
        />

        <LaboratoryInfoSection dataLaboratory={dataLaboratory} />

        <div>
          <div className="grid grid-cols-3">
            <div className="col-span-3 flex justify-end">
              <button
                className="bg-gray-600 text-white hover:bg-blue-600 px-4 py-2 rounded mr-4"
                onClick={handleCancel}
              >
                <i className="fas fa-times mr-2"></i>Cancelar
              </button>
              <button
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
                onClick={handleSave}
              >
                <i className="fas fa-save mr-2"></i>Guardar
              </button>
            </div>
          </div>
        </div>

        {showConfirmPopup && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75"
                aria-hidden="true"
              ></div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Confirmación
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      ¿Está seguro que desea anular el laboratorio?
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleConfirmAnulacion}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
                  >
                    Sí, anular
                  </button>
                  <button
                    onClick={handleClosePopup}
                    className="mr-2 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 focus:outline-none"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5l-1.41 1.42L9 19.84L21.41 7.41L20 6z"></path>
              </svg>
              <p className="text-gray-700 font-semibold">
                Información guardada exitosamente!
              </p>
              <button
                onClick={handleAcceptModal}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        {missingFieldsModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
              </svg>
              <p className="text-gray-700 font-semibold">
                Por favor, completa los siguientes campos antes de guardar:
              </p>
              <ul className="text-gray-600 list-disc pl-5">
                {missingFields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
              <button
                onClick={() => setMissingFieldsModal(false)}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default LaboratoryProfile;
