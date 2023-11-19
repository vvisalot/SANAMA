"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useMedicalRecordForm from "@/hooks/useMedicalRecordForm";
import FormEvaluation from "./FormEvaluation";
import { toast } from "sonner";
import { patientService } from "@/services/patientService";
import Signature from "@/components/evaluations/Signature";

const FormContainerMedicalRecord = ({ defaultTriaje }) => {
  const { medicalRecordData, setMedicalRecordData, validateMedicalRecordForm } =
    useMedicalRecordForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadingRegister = async (data) => {
    await patientService.registrarHojaMedica(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (validateMedicalRecordForm()) {
      console.log("The form is valid. Sending data.");
    } else {
      console.log("Not all fields have been completed correctly.");
      setIsSubmitting(false); // Set submitting to false
      return;
    }

    try {
      toast.promise(() => loadingRegister(medicalRecordData), {
        loading: "Registrando Atencion",
        success: "Atencion registrada",
      });
      console.log(medicalRecordData);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred. Please try again.");
      setIsSubmitting(false); // Set submitting to false in case of error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-max w-full">
      <FormEvaluation
        defaultTriaje={defaultTriaje}
        setMedicalRecordData={setMedicalRecordData}
      />
      <div className="flex flex-row-reverse">
        <Signature setMedicalRecordData={setMedicalRecordData} />

        <button
          type="submit"
          onClick={handleSubmit}
          className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
        >
          Registrar cita
        </button>
      </div>
    </form>
  );
};

export default FormContainerMedicalRecord;
