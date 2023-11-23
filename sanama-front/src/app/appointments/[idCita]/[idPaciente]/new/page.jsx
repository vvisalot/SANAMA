"use client";
import React from "react";
import { useParams } from "next/navigation";
import MainInfoComponent from "@/components/evaluations/MainInfoTab";
import usePatientTriageData from "@/hooks/usePatientTriageData";
import FormContainerMedicalRecord from "@/components/evaluations/FormContainerMedicalRecord";
import newMedicalRecord from "@/components/icons/newMedicalRecord";
import TitleWithIcon from "@/components/TitleWithIcon";
import useUpdateAppointmentStatus from "@/hooks/useUpdateAppointmentStatus";
import Signature from "@/components/evaluations/Signature";
const newFormularioMedico = () => {
  const params = useParams();
  const idCita = params.idCita;
  const { patientTriageData, loading, error } = usePatientTriageData(idCita);
  const { updateAppointmentStatus } = useUpdateAppointmentStatus();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const defaultTriaje = {
    temperatura: "",
    frecuenciaCardiaca: "",
    frecuenciaRespiratoria: "",
    presionArterial: "",
    saturacionOxigeno: "",
  };

  const signosVitales = {
    ...defaultTriaje,
    ...patientTriageData?.triaje,
  };

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Nueva Hoja Médica"} Icon={newMedicalRecord} />
      <MainInfoComponent patientTriageData={patientTriageData} />
      <FormContainerMedicalRecord
        defaultTriaje={signosVitales}
        idCita={idCita}
        updateAppointmentStatus={updateAppointmentStatus}
      />
      <Signature />
    </section>
  );
};

export default newFormularioMedico;
