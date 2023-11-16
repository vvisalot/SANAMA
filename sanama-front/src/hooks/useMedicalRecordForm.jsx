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

  const validateMedicalRecordForm = (formData) => {
    // Agregar verificaciones aca de la misma hoja (receta etc)
    setErrorMessageMedicalRecordForm("");
    return true;
  };

  const createMedicalRecord = async (evaluationData, medicalRecordsData) => {
    // esto basicamento parsea los datos de evalution data para
  };

  return {
    validateEvaluationForm,
    validateMedicalRecordForm,
    createMedicalRecord,
  };
};

export default useMedicalRecordForm;
