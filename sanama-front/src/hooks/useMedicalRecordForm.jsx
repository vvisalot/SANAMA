import { useState } from "react";
import { toast } from "sonner";

const useMedicalRecordForm = () => {
  const [errorMessageMedicalRecordForm, setErrorMessageMedicalRecordForm] =
    useState("");

  const validateEvaluationForm = (formData) => {
    // Agregar verificaciones aca los datos de la evaluacion
    if (formData.fecha === "") {
      setErrorMessageMedicalRecordForm(
        "Please complete all fields to reserve the appointment"
      );
      toast.error("Please complete all fields to reserve the appointment");
      return false;
    }
    //  Validaciones adicionales pendientes...
    setErrorMessageMedicalRecordForm("");
    return true;
  };

  const createMedicalRecord = async (idCita, evaluationData) => {
    // esto basicamento parsea los datos de evalution data para
  };

  return {
    validateEvaluationForm,
    createMedicalRecord,
  };
};

export default useMedicalRecordForm;
