"use client";
import React, { useState } from "react";
import useMedicalRecordForm from "@/hooks/useMedicalRecordForm";
import FormEvaluation from "./FormEvaluation";
import { toast } from "sonner";
import { patientService } from "@/services/patientService";
import swal from "sweetalert";
import Signature from "@/components/evaluations/Signature";

const FormContainerMedicalRecord = ({
  defaultTriaje,
  idCita,
  updateAppointmentStatus,
}) => {
  const { medicalRecordData, setMedicalRecordData, validateMedicalRecordForm } =
    useMedicalRecordForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadingRegister = async (data) => {
    console.log(data);
    await patientService.registrarHojaMedica(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateMedicalRecordForm()) {
      setIsSubmitting(false);
      return;
    }

    swal({
      title: "¿Estás seguro?",
      text: "Estás a punto de registrar esta atención médica.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willConfirm) => {
      if (willConfirm) {
        setIsSubmitting(true);
        try {
          await loadingRegister(medicalRecordData);
          toast.success("Atención registrada con éxito.");
          await updateAppointmentStatus(idCita, 1); // Suponiendo que '1' es el estado deseado
        } catch (error) {
          console.error("Error:", error);
          toast.error("Error al registrar. Intente de nuevo.");
        }
        setIsSubmitting(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-max w-full">
      <FormEvaluation
        defaultTriaje={defaultTriaje}
        setMedicalRecordData={setMedicalRecordData}
      />
      <div className="flex flex-row-reverse">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
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
