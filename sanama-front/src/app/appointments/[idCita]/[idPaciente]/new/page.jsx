"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import MainInfoComponent from "@/components/evaluations/MainInfoTab";
import usePatientTriageData from "@/hooks/usePatientTriageData";
import FormContainerMedicalRecord from "@/components/evaluations/FormContainerMedicalRecord";
import newMedicalRecord from "@/components/icons/newMedicalRecord";
import TitleWithIcon from "@/components/TitleWithIcon";

const newFormularioMedico = () => {
  const params = useParams();
  const idCita = params.idCita;
  const { patientTriageData, loading, error } = usePatientTriageData(idCita);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Nueva Hoja Médica"} Icon={newMedicalRecord} />
      <MainInfoComponent patientTriageData={patientTriageData} />
      <FormContainerMedicalRecord
        idCita={idCita}
        patientTriageData={patientTriageData}
      />
    </section>
  );
};

export default newFormularioMedico;
