"use client";
import { useState } from "react";
import { AddSigDialog } from "@/components/signature/AddSigDialog";
import DraggableSignature from "@/components/signature/DraggableSignature";

const Signature = ({ setMedicalRecordData }) => {
  const [signatureURL, setSignatureURL] = useState(null);
  const [signatureDialogVisible, setSignatureDialogVisible] = useState(false);

  const handleCloseDialog = () => setSignatureDialogVisible(false);

  const handleConfirmSignature = (url) => {
    setSignatureURL(url);
    handleCloseDialog();
  };

  const resetSignature = () => setSignatureURL(null);

  return (
    <div className="max-w-screen-md mx-auto mt-2">
      {signatureDialogVisible && (
        <AddSigDialog
          onConfirm={handleConfirmSignature}
          onClose={handleCloseDialog}
        />
      )}

      {!signatureURL && (
        <button
          onClick={() => setSignatureDialogVisible(true)}
          className="m-2 text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 
          font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
        >
          Agregar Firma
        </button>
      )}

      {signatureURL && (
        <DraggableSignature
          url={signatureURL}
          onSet={resetSignature}
          onCancel={resetSignature}
        />
      )}
    </div>
  );
};

export default Signature;
