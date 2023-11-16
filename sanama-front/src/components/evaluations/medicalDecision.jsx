import React from "react";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";

const MedicalDecision = ({ evaluationData, handleSubmit, allFormComplete }) => {
  return (
    <div>
      <DiagnosticoMedico></DiagnosticoMedico>
      <TratamientoYDecisionCita></TratamientoYDecisionCita>
    </div>
  );
};

export default MedicalDecision;
