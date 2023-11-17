import React from "react";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";
import Signature from "@/components/evaluations/Signature";
const MedicalDecision = ({ evaluationData, handleSubmit, allFormComplete }) => {
  return (
    <div>
      <DiagnosticoMedico></DiagnosticoMedico>
      <TratamientoYDecisionCita></TratamientoYDecisionCita>
      <Signature />
    </div>
  );
};

export default MedicalDecision;
