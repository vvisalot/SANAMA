"use client";
import { useState } from "react";
import { AddSigDialog } from "@/components/signature/AddSigDialog";
import DraggableSignature from "@/components/signature/DraggableSignature";

const Signature = ({ setMedicalRecordData }) => {
  const [autoDate, setAutoDate] = useState(true);
  const [signatureURL, setSignatureURL] = useState(null);
  const [signatureDialogVisible, setSignatureDialogVisible] = useState(false);

  return (
    <div>
      {signatureDialogVisible ? (
        <AddSigDialog
          autoDate={autoDate}
          setAutoDate={setAutoDate}
          onClose={() => setSignatureDialogVisible(false)}
          onConfirm={(url) => {
            setSignatureURL(url);
            setSignatureDialogVisible(false);
          }}
        />
      ) : null}

      <div className="max-w-screen-md mx-auto mt-2">
        <div>
          {!signatureURL ? (
            <button
              onClick={() => setSignatureDialogVisible(true)}
              className=" m-2 text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 
            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
            >
              Registrar cita
            </button>
          ) : null}
        </div>
        <div>
          {signatureURL ? (
            <DraggableSignature
              url={signatureURL}
              onSet={async () => {
                setSignatureURL(null);
              }}
              onCancel={() => {
                setSignatureURL(null);
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Signature;
