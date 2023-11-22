"use client"
import React, { useState } from "react"
import MainInfoComponent from "@/components/evaluations/MainInfoTab"
import VitalSigns from "@/components/evaluations/VitalSigns"


const FormularioMedico = () => {
  const initialFormData = {
    MainInfo: {
      nombre: "",
      dni: "",
      genero: "",
      edad: "",
      peso: "",
      talla: "",
      fechaNacimiento: "",
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
  }

  const [formData, setFormData] = useState(initialFormData)
  //Y LA DATA DE DONDE SALE?????

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="p-8">
      <h1 className="font-bold text-blue-500 text-6xl p-12">
        Evaluacion Existente
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInfoComponent
            formData={formData.MainInfo} //Grave error de concepto
          ></MainInfoComponent>

          <VitalSigns
            defaultTriaje={formData.ClinicalTab}
            setMedicalRecordData={handleInputChange}
          ></VitalSigns>
        </div>
      </form>
    </div>
  )
}

export default FormularioMedico
