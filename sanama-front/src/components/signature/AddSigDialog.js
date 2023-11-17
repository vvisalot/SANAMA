import { useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import { ConfirmOrCancel } from "./ConfirmOrCancel";
import { Modal } from "flowbite-react";

export function AddSigDialog({ onConfirm, onClose, autoDate, setAutoDate }) {
  const sigRef = useRef(null);

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
          <ConfirmOrCancel
            onCancel={onClose}
            onConfirm={() => {
              const sigURL = sigRef.current.toDataURL();
              onConfirm(sigURL);
            }}
          />
        </div>
      </Modal>
    </>
  );
}
