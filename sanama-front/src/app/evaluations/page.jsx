"use client";
import React, { useState } from "react";
import MainInfoComponent from "./MainInfoTab";
import ClinicalTab from "./ClinicalTab";
import DiagnosticoMedico from "./DiagnosisTab";
import GlasgowComaScale from "./MentalStatusTab";
import TratamientoYDecisionCita from "./TreatmentTab";

const FormularioMedico = () => {
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
      proximaCita: "", // fecha de proxima cita
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInfoComponent
            formData={formData.MainInfo}
            handleInputChange={handleInputChange}
          ></MainInfoComponent>

          <ClinicalTab
            formData={formData.ClinicalTab}
            handleInputChange={handleInputChange}
          ></ClinicalTab>
        </div>
        <DiagnosticoMedico></DiagnosticoMedico>
        <GlasgowComaScale></GlasgowComaScale>
        <TratamientoYDecisionCita></TratamientoYDecisionCita>
        <div className="space-x-4">
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Guardar
          </button>
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioMedico;
