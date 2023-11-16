"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Accordion from "@/components/evaluations/acordeon";
import MainInfoComponent from "@/components/evaluations/MainInfoTab";
import VitalSigns from "@/components/evaluations/vitalSigns";
import ChiefComplaint from "@/components/evaluations/chiefComplaint";
import ExplorationTab from "@/components/evaluations/ExplorationTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";
import usePatientTriageData from "@/hooks/usePatientTriageData";
import useCreateMedicalRecord from "@/hooks/useCreateMedicalRecord";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";

const FormularioMedico = () => {
  const params = useParams();
  const idCita = params.idCita;
  const idHistorialClinico = params.idHistorialClinico; //obtener idHistorialClinico
  const { createMedicalRecord, isSubmitting, submissionError } =
    useCreateMedicalRecord();

  const { patientTriageData, loading, error } = usePatientTriageData(idCita);
  const {
    temperatura = "",
    frecuenciaCardiaca = "",
    frecuenciaRespiratoria = "",
    presionArterial = "",
    saturacionOxigeno = "",
  } = patientTriageData?.triaje ?? {};

  const initialFormData = {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="font-bold text-blue-500 text-6xl p-12">
        Nueva Hoja Médica
      </h1>

      <MainInfoComponent patientTriageData={patientTriageData} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Accordion title="Clinical Tab" id="clinical">
          <VitalSigns
            formData={formData.signosVitales}
            handleInputChange={handleInputChange}
          />
        </Accordion>
        <Accordion title="Motivo de la Consulta" id="triage">
          <ChiefComplaint
            formData={formData.ChiefComplaint}
            handleInputChange={handleInputChange}
          />
        </Accordion>

        <Accordion title="Exploracion Fisica" id="triage">
          <ExplorationTab
            formData={formData.exploracionFisica}
            handleInputChange={handleInputChange}
          />
        </Accordion>
        <Accordion title="Nivel de Consciencia" id="triage">
          <GlasgowComaScale
            formData={formData.estadoMental}
            handleInputChange={handleInputChange}
          />
        </Accordion>
      </form>
      <div className="mb-6 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
          onClick={() => createMedicalRecord(idCita, idHistorialClinico)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Procesando..." : "Continuar"}
        </button>
      </div>
    </div>
  );
};

export default FormularioMedico;
