import React from "react";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";

const MedicalDecision = ({ evaluationData, handleSubmit, allFormComplete }) => {
  return (
    <div>
      <LaboratoryModal></LaboratoryModal>
      <DiagnosticoMedico></DiagnosticoMedico>
      <TratamientoYDecisionCita></TratamientoYDecisionCita>
    </div>
  );
};

export default MedicalDecision;
