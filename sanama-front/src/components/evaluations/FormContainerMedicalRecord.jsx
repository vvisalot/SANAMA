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
  const {
    validateEvaluationForm,
    validateMedicalRecordForm,
    createMedicalRecord,
  } = useMedicalRecordForm();

  const [evaluationData, setEvaluationData] = useState(initialData);
  const [medicalRecordsData, setMedicalRecordsData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for submitting

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvaluationData((prevState) => ({
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

    if (validateEvaluationForm(evaluationData)) {
      console.log("The form is valid. Sending data.");
      setAllFormComplete(true);
    } else {
      console.log("Not all fields have been completed correctly.");
      setIsSubmitting(false); // Set submitting to false
      return;
    }

    if (validateMedicalRecordForm(medicalRecordsData)) {
      console.log("The form is valid. Sending data.");
      setAllFormComplete(true);
    } else {
      console.log("Not all fields have been completed correctly.");
      setIsSubmitting(false); // Set submitting to false
      return;
    }

    try {
      const MedicalRecordData = await createMedicalRecord(
        evaluationData,
        medicalRecordsData
      );
      toast.promise(() => loadingRegister(MedicalRecordData), {
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
        evaluationData={evaluationData}
        handleInputChange={handleInputChange}
      />
      <MedicalDecision
        evaluationData={evaluationData} //se hace un review de lo que se tiene hasta ahora
        medicalRecordsData={medicalRecordsData}
        allFormComplete={allFormComplete}
      />
      <div className="flex flex-row-reverse">
        <button
          type="submit"
          onClick={handleSubmit}
          disable={!isSubmitting}
          className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
        >
          Registrar Evaluacion
        </button>
      </div>
    </form>
  );
};

export default FormContainerMedicalRecord;
