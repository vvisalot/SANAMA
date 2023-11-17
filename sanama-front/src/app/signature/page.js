"use client";
import { useState } from "react";
import { AddSigDialog } from "@/components/signature/AddSigDialog";
import DraggableSignature from "@/components/signature/DraggableSignature";
import { BigButton } from "@/components/buttons/BigButton";

function signature() {
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
            <BigButton
              marginRight={8}
              title={"Add signature"}
              onClick={() => setSignatureDialogVisible(true)}
            />
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
}

export default signature;
