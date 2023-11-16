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
import medicalDecision from "@/components/evaluations/medicalDecision";

const FormularioMedico = () => {
  const params = useParams();
  const idCita = params.idCita;
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
  const [step, setStep] = useState(1); // Initialize step to 1 for the first part

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    // Move to the next step
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    // Move to the previous step
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 h-max">
      <h1 className="font-bold text-blue-500 text-6xl p-12">
        Nueva Hoja Médica
      </h1>

      <MainInfoComponent patientTriageData={patientTriageData} />

      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4 h-max">
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
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
              onClick={handlePrevStep}
              disabled={step === 1}
            >
              Anterior
            </button>
            <button
              className="bg-blue-500 hover.bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
              onClick={handleNextStep}
            >
              Siguiente
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <medicalDecision
          formData={formData}
          handleInputChange={handleInputChange}
          createMedicalRecord={createMedicalRecord}
          idCita={idCita}
        />
      )}
    </div>
  );
};

export default FormularioMedico;
