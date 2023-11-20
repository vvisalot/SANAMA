import React from "react";
import Accordion from "@/components/evaluations/acordeon";
import VitalSigns from "@/components/evaluations/VitalSigns";
import ChiefComplaint from "@/components/evaluations/chiefComplaint";
import ExplorationTab from "@/components/evaluations/ExplorationTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";

const ReviewFormEvaluation = ({ hojaMedicaData }) => {
  return (
    <>
      <Accordion title="Ultimo Triaje" id="triage">
        <VitalSigns defaultTriaje={defaultTriaje} />
      </Accordion>
      <Accordion title="Motivo de la Consulta" id="consulta">
        <ChiefComplaint />
      </Accordion>
      <Accordion title="Exploracion Fisica" id="expfisica">
        <ExplorationTab />
      </Accordion>
      <Accordion title="Nivel de Consciencia" id="glasgow">
        <GlasgowComaScale />
      </Accordion>
      <Accordion title="Diagnostico" id="glasgow">
        <DiagnosticoMedico />
      </Accordion>
      <Accordion title="Receta Medica" id="glasgow">
        <TratamientoYDecisionCita />
      </Accordion>
    </>
  );
};

export default ReviewFormEvaluation;
