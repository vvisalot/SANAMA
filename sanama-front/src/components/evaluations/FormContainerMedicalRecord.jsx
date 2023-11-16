"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useMedicalRecordForm from "@/hooks/useMedicalRecordForm";
import FormEvaluation from "./FormEvaluation";
import MedicalDecision from "./MedicalDecision"; // Import the missing component
import { toast } from "sonner";
import { patientService } from "@/services/patientService";

const FormContainerMedicalRecord = ({ idCita, initialData }) => {
  const router = useRouter();
  const [allFormComplete, setAllFormComplete] = useState(false);
  const { errorMessageMedicalRecordForm, validateMedicalRecordForm } =
    useMedicalRecordForm();

  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for submitting

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loadingRegister = async (data) => {
    console.log(data);
    await patientService.registrarHojaMedica(data);
    router.push("/appointments");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Set submitting to true

    if (validateMedicalRecordForm(formData)) {
      console.log("The form is valid. Sending data.");
      setAllFormComplete(true);
    } else {
      console.log("Not all fields have been completed correctly.");
      setIsSubmitting(false); // Set submitting to false
      return;
    }

    try {
      const EvaluationFormData = await createMedicalRecord(formData);
      toast.promise(() => loadingRegister(EvaluationFormData), {
        loading: "Registrando cita",
        success: "Cita registrada",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred. Please try again.");
      setIsSubmitting(false); // Set submitting to false in case of error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-max">
      <FormEvaluation
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <MedicalDecision
        formData={formData}
        handleSubmit={handleSubmit}
        idCita={idCita}
      />
      <div className="mb-6 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
          onClick={() => createMedicalRecord(idCita)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Continue"}
        </button>
      </div>
    </form>
  );
};

export default FormContainerMedicalRecord;
