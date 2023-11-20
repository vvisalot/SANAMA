import React from "react";
import Accordion from "@/components/evaluations/acordeon";
import viewVitalSigns from "./viewVitalSigns";

const ReviewFormEvaluation = ({ hojaMedicaData }) => {
  return (
    <>
      <Accordion title="Ultimo Triaje" id="triage">
        <viewVitalSigns defaultTriaje={hojaMedicaData.signosVitales} />
      </Accordion>
    </>
  );
};

export default ReviewFormEvaluation;
