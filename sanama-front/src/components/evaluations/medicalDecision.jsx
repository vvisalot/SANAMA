import React from "react";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";

const MedicalDecision = ({ formData, handleSubmit, idCita }) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4"></form>
    </div>
  );
};

export default MedicalDecision;
