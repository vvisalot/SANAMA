import { useRef } from "react";
import { Dialog } from "./Dialog";
import ReactSignatureCanvas from "react-signature-canvas";
import { ConfirmOrCancel } from "./ConfirmOrCancel";
import { primary45 } from "@/util/colors";

export function AddSigDialog({ onConfirm, onClose, autoDate, setAutoDate }) {
  const sigRef = useRef(null);

  return (
    <Dialog
      isVisible={true}
      title={"Add signature"}
      onClose={onClose}
      body={
        <div>
          <div className="justify-center">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Dibuja tu firma abajo:
            </span>
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
      }
    />
  );
}
