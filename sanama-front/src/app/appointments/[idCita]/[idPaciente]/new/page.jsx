"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import MainInfoComponent from "@/components/evaluations/MainInfoTab";
import usePatientTriageData from "@/hooks/usePatientTriageData";
import FormContainerMedicalRecord from "@/components/evaluations/FormContainerMedicalRecord";

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
    <div className="px-20">
      <h1 className="font-bold text-blue-500 text-6xl p-12">
        Nueva Hoja Médica
      </h1>

      <MainInfoComponent patientTriageData={patientTriageData} />
      <FormContainerMedicalRecord initialData={formData} />
    </div>
  );
};

export default newFormularioMedico;
