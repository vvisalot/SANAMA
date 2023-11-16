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

  const createMedicalRecord = async (idCita, formData) => {
    // Implement the logic to create a new medical record using the formData
    // Example:
    try {
      const response = await patientService.registrarHojaMedica(
        idCita,
        formData
      );
      return response; // Return the response from the API call
    } catch (error) {
      console.error("Error:", error);
      return null; // Handle the error as needed
    }
  };

  return {
    validateMedicalRecordForm,
    createMedicalRecord,
  };
};

export default useMedicalRecordForm;
