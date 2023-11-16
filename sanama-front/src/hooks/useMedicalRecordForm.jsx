import { useState } from "react";
import { toast } from "sonner";

const useMedicalRecordForm = () => {
  const [errorMessageMedicalRecordForm, setErrorMessageMedicalRecordForm] =
    useState("");

  const validateMedicalRecordForm = (formData) => {
    // Agregar verificaciones aca
    if (formData.fecha === "" || formData.hora === "") {
      setErrorMessageMedicalRecordForm(
        "Please complete all fields to reserve the appointment"
      );
      toast.error("Please complete all fields to reserve the appointment");
      return false;
    }

    // Aditional validation logic for other fields

    setErrorMessageMedicalRecordForm("");
    return true;
  };

  const createMedicalRecord = async (evaluationData) => {
    // esto basicamento parsea
  };

  return {
    validateMedicalRecordForm,
    createMedicalRecord,
  };
};

export default useMedicalRecordForm;
