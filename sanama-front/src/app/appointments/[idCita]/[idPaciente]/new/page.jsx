"use client";
import React, { useState, useEffect } from "react";
import { attentionService } from "@/services/attentionService";
import { useParams } from "next/navigation";
import MainInfoComponent from "@/components/evaluations/MainInfoTab";
import ClinicalTab from "@/components/evaluations/ClinicalTab";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import ExplorationTab from "@/components/evaluations/ExplorationTab";
import usePatientTriageData from "@/hooks/usePatientTriageData";
import Accordion from "@/components/evaluations/acordeon";
import ChiefComplaint from "@/components/evaluations/chiefComplaint";

const FormularioMedico = () => {
  const params = useParams();
  const idCita = params.idCita;
  const idHistorialClinico = 10;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { patientTriageData, loading, error } = usePatientTriageData(idCita);

  const initialFormData = {
    MainInfo: {
      nombre: "",
      dni: "",
      genero: "",
      edad: "",
      peso: "",
      talla: "",
      personaResponsable: {
        nombre: "",
        dni: "",
      },
      fechaUltimaAtencion: "",
      horaUltimaAtencion: "",
    },
    ClinicalTab: {
      signosVitales: {
        temperatura: "",
        fc: "",
        fr: "",
        pa: "",
        sat: "",
      },
      antecedentes: "",
      motivoConsulta: "",
      observaciones: "",
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
    },
    DiagnosticoYTratamientos: {
      diagnosticos: [],
      tratamientos: [],
    },
    DatosHojaMedica: {
      estadoHojaMedica: "",
      derivacion: "",
      proximaCita: "",
      atendidoPor: "",
      selloYFirma: "",
      crearOrdenDeLaboratorio: "",
      tipoOrdenDeLaboratorio: "",
      instruccionesLaboratorio: "",
      resultado: "",
      recetaMedica: {
        indicacionesFinales: "",
        medicamentosRecetados: [],
      },
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleCreateMedicalRecord = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd
    const formattedTime = currentDate.toTimeString().split(" ")[0]; // hh:mm:ss

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
          <ClinicalTab
            triaje={patientTriageData ? patientTriageData.triaje : null}
            handleInputChange={handleInputChange}
          />
        </Accordion>
        <Accordion title="Motivo de la Consulta" id="triage">
          <ChiefComplaint handleInputChange={handleInputChange} />
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
