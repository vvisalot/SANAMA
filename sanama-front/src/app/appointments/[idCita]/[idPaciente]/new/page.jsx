"use client";
import React, { useState } from "react";
import { attentionService } from "@/services/attentionService";
import { useParams } from "next/navigation";
import Accordion from "@/components/evaluations/acordeon";
import MainInfoComponent from "@/components/evaluations/MainInfoTab";
import VitalSigns from "@/components/evaluations/vitalSigns";
import ChiefComplaint from "@/components/evaluations/chiefComplaint";
import ExplorationTab from "@/components/evaluations/ExplorationTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";
import usePatientTriageData from "@/hooks/usePatientTriageData";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";

const FormularioMedico = () => {
  const params = useParams();
  const idCita = params.idCita;
  const idHistorialClinico = 10;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { patientTriageData, loading, error } = usePatientTriageData(idCita);

  const initialFormData = {
    signosVitales: {
      temperatura: "",
      fc: "",
      fr: "",
      pa: "",
      sat: "",
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

  const handleCreateMedicalRecord = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate.toTimeString().split(" ")[0];

    const newMedicalRecord = {
      idHistorialClinico: idHistorialClinico,
      hojasMedicas: [
        {
          idCitaMedica: idCita,
          hojaRefencia: null,
          horaAtencion: formattedTime.slice(0, 5),
          fechaAtencion: formattedDate,
        },
      ],
    };

    try {
      const response = await patientService.registrarHojaMedica(
        newMedicalRecord
      );
      if (response && response !== -1) {
        alert("¡Nueva Hoja Médica creada con éxito!");
        console.log("New Medical Record created successfully:", response);
      } else {
        alert("Error al crear la Hoja Médica. Respuesta no exitosa.");
        console.error(
          "Failed to create the new medical record: Response was not successful."
        );
      }
    } catch (error) {
      alert("Error al crear la Hoja Médica. Por favor, intente de nuevo.");
      console.error("Error:", error);
    }
  };

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
            formData={patientTriageData ? patientTriageData.triaje : null}
            handleInputChange={handleInputChange}
          />
        </Accordion>
        <Accordion title="Motivo de la Consulta" id="triage">
          <ChiefComplaint
            formData={ChiefComplaint.ClinicalTab}
            handleInputChange={handleInputChange}
          />
        </Accordion>

        <Accordion title="Exploracion Fisica" id="triage">
          <ExplorationTab
            formData={formData.ClinicalTab}
            handleInputChange={handleInputChange}
          />
        </Accordion>
        <Accordion title="Nivel de Consciencia" id="triage">
          <GlasgowComaScale></GlasgowComaScale>
        </Accordion>
      </form>
      <div className="mb-6 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
          onClick={handleCreateMedicalRecord}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default FormularioMedico;
