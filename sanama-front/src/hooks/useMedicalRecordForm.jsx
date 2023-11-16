import { useState } from "react";
import { toast } from "sonner";

const useMedicalRecordForm = () => {
  const [errorMessageMedicalRecordForm, setErrorMessageMedicalRecordForm] =
    useState("");

  const validateMedicalRecordForm = (formData) => {
    // Add your validation logic here based on formData
    // Example validation:
    if (formData.fecha === "" || formData.hora === "") {
      setErrorMessageMedicalRecordForm(
        "Please complete all fields to reserve the appointment"
      );
      toast.error("Please complete all fields to reserve the appointment");
      return false;
    }

    // Additional validation logic for other fields

    setErrorMessageMedicalRecordForm("");
    return true;
  };

  return {
    errorMessageMedicalRecordForm,
    validateMedicalRecordForm,
  };
};

export default useMedicalRecordForm;
