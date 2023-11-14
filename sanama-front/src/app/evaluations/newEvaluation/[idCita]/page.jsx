"use client";
import React, { useState, useEffect } from "react";
import { appointmentService } from "@/services/appointmentService";
import { patientService } from "@/services/patientService";
import { useParams } from "next/navigation";
import ClinicalTab from "@/components/evaluations/ClinicalTab";
import DiagnosticoMedico from "@/components/evaluations/DiagnosisTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";
import TratamientoYDecisionCita from "@/components/evaluations/TreatmentTab";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import PatientInfo from "@/components/appointments/view/PatientInfo";

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
    appointmentService
      .buscarCita(idCita)
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
        fc: "", // Frecuencia Cardiaca
        fr: "", // Frecuencia Respiratoria
        pa: "", // Presión Arterial
        sat: "", // Saturación de Oxígeno
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
      diagnosticos: [], // tabla CIE - 10
      tratamientos: [], // tabla CIE - 10
    },
    DatosHojaMedica: {
      estadoHojaMedica: "", // Puede ser "Cerrar Hoja" o "Mantener Abierta"
      derivacion: "", // especialidad a la que deberia ir
      proximaCita: "", // fecha tentativa de proxima cita
      atendidoPor: "", // id doctor atendido
      selloYFirma: "", // sello o firma doctor
      crearOrdenDeLaboratorio: "", // Modal que abre los datos para generar la orden
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
      alert("Error al crear la Hoja Médica. Por favor, intente de nuevo."); // Alerta en caso de un error inesperado
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
        Nueva Evaluacion
      </h1>
      <PatientInfo
        pacienteData={appointmentData ? appointmentData.paciente : null}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClinicalTab
            formData={formData.ClinicalTab}
            handleInputChange={handleInputChange}
          ></ClinicalTab>
        </div>
        <DiagnosticoMedico></DiagnosticoMedico>
        <GlasgowComaScale></GlasgowComaScale>
        <LaboratoryModal></LaboratoryModal>
        <TratamientoYDecisionCita></TratamientoYDecisionCita>
      </form>
      <div className="mb-6 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
          onClick={handleCreateMedicalRecord}
        >
          Guardar Hoja médica
        </button>
      </div>
    </div>
  );
};

export default FormularioMedico;
