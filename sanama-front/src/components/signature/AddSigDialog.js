import React, { useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import { Modal } from "flowbite-react";
import swal from "sweetalert";
import { toast } from "sonner";

export function AddSigDialog({ onConfirm, onClose, autoDate, setAutoDate }) {
  const sigRef = useRef(null);

  const handleConfirm = () => {
    swal({
      title: "¿Confirmar firma?",
      text: "Esto guardará la firma actual.",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willConfirm) => {
      if (willConfirm) {
        const sigURL = sigRef.current.toDataURL();
        toast.promise(
          onConfirm(sigURL), // Asegúrate de que onConfirm retorna una promesa
          {
            loading: "Guardando firma...",
            success: "Firma guardada exitosamente",
            error: "Error al guardar la firma",
          }
        );
        onClose(); // Cerrar el modal después de confirmar
      }
    });
  };

  return (
    <>
      <Modal onClose={onClose} show={true}>
        <Modal.Header className="bg-blue-700 text-white p-2 flex justify-between items-center">
          {"Firma del Doctor"}
        </Modal.Header>
        <div className="p-4 bg-white">
          <div>
            <div className="text-sm font-medium text-gray-900">
              Dibuja tu firma abajo:
            </div>
            <div className="inline-block border border-blue-700">
              <ReactSignatureCanvas
                velocityFilterWeight={1}
                ref={sigRef}
                canvasProps={{
                  width: "600",
                  height: 200,
                  className: "sigCanvas",
                }}
              />
              <div className="flex justify-between text-blue-500 mt-2 mx-auto w-96">
                <div>
                  Auto date/time{" "}
                  <input
                    type={"checkbox"}
                    checked={autoDate}
                    onChange={(e) => setAutoDate(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleConfirm}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
