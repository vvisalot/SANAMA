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
  const {
    temperatura = "",
    frecuenciaCardiaca = "",
    frecuenciaRespiratoria = "",
    presionArterial = "",
    saturacionOxigeno = "",
  } = patientTriageData?.triaje ?? {};

  const initialFormData = {
    idCita: idCita,
    signosVitales: {
      temperatura,
      frecuenciaCardiaca,
      frecuenciaRespiratoria,
      presionArterial,
      saturacionOxigeno,
    },
    ChiefComplaint: {
      antecedentes: "",
      motivoConsulta: "",
      observaciones: "",
    },
    exploracionFisica: {
      exGeneral: "",
      pielYFaneras: "",
      cabezaYCuello: "",
      toraxYPulmones: "",
      cardiovascular: "",
      abdomen: "",
      urogenital: "",
      extremidades: "",
      snc: "",
    },
    estadoMental: {
      glasgow: "",
      eyesOpen: "",
      talkingCorrectly: "",
      ableToMoveBody: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Nueva Hoja Médica"} Icon={newMedicalRecord} />
      <MainInfoComponent patientTriageData={patientTriageData} />
      <FormContainerMedicalRecord initialData={formData} />
    </section>
  );
};

export default newFormularioMedico;
