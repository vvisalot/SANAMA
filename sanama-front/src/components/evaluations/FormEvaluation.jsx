import React from "react";
import Accordion from "@/components/evaluations/acordeon";
import VitalSigns from "@/components/evaluations/VitalSigns";
import ChiefComplaint from "@/components/evaluations/chiefComplaint";
import ExplorationTab from "@/components/evaluations/ExplorationTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";
import Signature from "@/components/evaluations/Signature";
const FormEvaluation = ({ evaluationData, handleInputChange }) => {
  return (
    <>
      <Accordion title="Ultimo Triaje" id="triage">
        <VitalSigns
          formData={evaluationData.signosVitales}
          handleInputChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Motivo de la Consulta" id="consulta">
        <ChiefComplaint
          formData={evaluationData.ChiefComplaint}
          handleInputChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Exploracion Fisica" id="expfisica">
        <ExplorationTab
          formData={evaluationData.exploracionFisica}
          handleInputChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Nivel de Consciencia" id="glasgow">
        <GlasgowComaScale
          formData={evaluationData.estadoMental}
          handleInputChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Diagnostico" id="glasgow">
        <DiagnosticoMedico></DiagnosticoMedico>
      </Accordion>
      <Accordion title="Receta Medica" id="glasgow">
        <TratamientoYDecisionCita></TratamientoYDecisionCita>
      </Accordion>

      <Accordion title="Firma" id="glasgow">
        <Signature />
      </Accordion>
    </>
  );
};

export default FormEvaluation;
