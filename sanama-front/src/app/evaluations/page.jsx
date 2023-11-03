"use client";
import React, { useState } from "react";
import MainInfoComponent from "./MainInfoTab";
import ClinicalTab from "./ClinicalTab";
import DiagnosticoMedico from "./DiagnosisTab";
import GlasgowComaScale from "./MentalStatusTab";
import TratamientoYDecisionCita from "./TreatmentTab";
const FormularioMedico = () => {
  const [formData, setFormData] = useState({
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
      observaciones: "",
    },
    EstadoMental: {
      glasgow: "",
      eyesOpen: "",
      talkingCorrectly: "",
      ableToMoveBody: "",
    },
    Diagnostico: {
      diagnosticos: [], // tabla CIE - 10
      derivacion: "",
      proximaCita: "",
      atendidoPor: "",
      selloYFirma: "",
    },
    TratamientoYDecision: {
      tratamientos: [], // tabla CIE - 10
      estadoHojaMedica: "", // Puede ser "Cerrar Hoja" o "Mantener Abierta"
      crearOrdenDeLaboratorio: "", // Modal que abre los datos para generar la orden
      tipoOrdenDeLaboratorio: "",
      instruccionesLaboratorio: "",
      indicacionesFinales: "",
      recetaMedica: {
        medicamentosRecetados: "",
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [section]: { ...prevState[section], [field]: value },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleArrayChange = (index, value) => {
    setFormData((prevState) => {
      const updatedDiagnostico = [...prevState.diagnostico];
      updatedDiagnostico[index] = value;
      return { ...prevState, diagnostico: updatedDiagnostico };
    });
  };

  const addDiagnosticoField = () => {
    setFormData((prevState) => ({
      ...prevState,
      diagnostico: [...prevState.diagnostico, ""],
    }));
  };

  const removeDiagnosticoField = (index) => {
    setFormData((prevState) => {
      const updatedDiagnostico = [...prevState.diagnostico];
      updatedDiagnostico.splice(index, 1);
      return { ...prevState, diagnostico: updatedDiagnostico };
    });
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
      </form>
    </div>
  );
};

export default FormularioMedico;
