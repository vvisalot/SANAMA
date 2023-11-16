import React from "react";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";
import useCreateMedicalRecord from "@/hooks/useCreateMedicalRecord";

const MedicalDecision = ({ formData, handleSubmit, idCita }) => {
  const { createMedicalRecord, isSubmitting, submissionError } =
    useCreateMedicalRecord();

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4"></form>
      <div className="mb-6 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
          onClick={() => createMedicalRecord(idCita)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Procesando..." : "Continuar"}
        </button>
      </div>
    </div>
  );
};

export default MedicalDecision;
