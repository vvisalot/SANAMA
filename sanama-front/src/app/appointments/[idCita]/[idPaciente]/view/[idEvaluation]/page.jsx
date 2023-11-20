"use client";
import React from "react";
import { useParams } from "next/navigation";
import MainInfoComponent from "@/components/evaluations/MainInfoTab";
import usePatientHojaMedicaData from "@/hooks/usePatientHojaMedicaData";
import ReviewContainerMedicalRecord from "@/components/evaluations/review/ReviewContainerMedicalRecord";
import newMedicalRecord from "@/components/icons/newMedicalRecord";
import TitleWithIcon from "@/components/TitleWithIcon";

const reviewFormularioMedico = () => {
  const params = useParams();
  const idEvaluation = params.idEvaluation;
  const { patientData, hojaMedicaData, loading, error } =
    usePatientHojaMedicaData(idEvaluation);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Ver Hoja Médica"} Icon={newMedicalRecord} />
      <MainInfoComponent patientData={patientData} />
      <ReviewContainerMedicalRecord hojaMedicaData={hojaMedicaData} />
    </section>
  );
};

export default reviewFormularioMedico;
