import React from "react";
import Accordion from "@/components/evaluations/acordeon";
import VitalSigns from "@/components/evaluations/vitalSigns";
import ChiefComplaint from "@/components/evaluations/chiefComplaint";
import ExplorationTab from "@/components/evaluations/ExplorationTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";

const FormEvaluation = ({ evaluationData, handleInputChange }) => {
  return (
    <>
      <Accordion title="Clinical Tab" id="clinical">
        <VitalSigns
          formData={evaluationData.signosVitales}
          handleInputChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Motivo de la Consulta" id="triage">
        <ChiefComplaint
          formData={evaluationData.ChiefComplaint}
          handleInputChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Exploracion Fisica" id="triage">
        <ExplorationTab
          formData={evaluationData.exploracionFisica}
          handleInputChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Nivel de Consciencia" id="triage">
        <GlasgowComaScale
          formData={evaluationData.estadoMental}
          handleInputChange={handleInputChange}
        />
      </Accordion>
    </>
  );
};

export default FormEvaluation;
