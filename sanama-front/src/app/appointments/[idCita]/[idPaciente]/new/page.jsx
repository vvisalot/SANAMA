"use client";
import React, { useState, useEffect } from "react";
import { patientService } from "@/services/patientService";
import { useParams } from "next/navigation";
import MainInfoComponent from "@/components/evaluations/MainInfoTab";
import ClinicalTab from "@/components/evaluations/ClinicalTab";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import TriageTab from "@/components/evaluations/TriageTab";

const FormularioMedico = () => {
  const params = useParams();
  const idCita = params.idCita;
  const idHistorialClinico = 10;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idCita) return;
    setLoading(true);
    patientService
      .buscarTriageCitaHojaMedica(idCita)
      .then((data) => {
        if (data) {
          setAppointmentData(data);
        } else {
          setError(`No se encontraron datos de la cita con el ID ${idCita}`);
        }
      })
      .catch((error) => {
        setError("Ocurrió un error al cargar los datos de la cita");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idCita]);

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
    const newMedicalRecord = {
      idHistorialClinico: idHistorialClinico,
      hojasMedicas: [
        {
          idCitaMedica: 4,
          hojaRefencia: null,
          horaAtencion: "18:00",
          fechaAtencion: "2023-11-09",
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

  return (
    <div className="p-8">
      <h1 className="font-bold text-blue-500 text-6xl p-12">
        Nueva Hoja Médica
      </h1>
      <MainInfoComponent appointmentData={appointmentData} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <ClinicalTab
          formData={formData.ClinicalTab}
          handleInputChange={handleInputChange}
        ></ClinicalTab>
        <TriageTab
          formData={formData.ClinicalTab}
          handleInputChange={handleInputChange}
        ></TriageTab>
        <exploracionFisica></exploracionFisica>
        <GlasgowComaScale></GlasgowComaScale>
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
