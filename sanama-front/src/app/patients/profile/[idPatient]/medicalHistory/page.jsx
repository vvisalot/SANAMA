"use client"

import React, { useState, useEffect } from "react"
import { patientService, createMedicalRecord } from "@/services/patientService"
import { useParams } from "next/navigation"
import MedicalRecordsTable from "@/components/MedicalRecordsTable"
import { parseHojaMedicaTable } from "@/util/medicalRecordParser"
import usePatientForm from "@/hooks/usePatientForm"
import { sexParser } from "@/util/patientParser"
import TitleWithIcon from "@/components/TitleWithIcon"
import iconoHistorial from "@/components/icons/iconoHistorial"

const HistorialClinico = ({ params }) => {
  const { patientForm, setPatientForm } = usePatientForm()

  const [historialClinico, setHistorialClinico] = useState({
    idHistorialClinico: "",
    codigo: "",
    estadoHojaMedica: true,
  })
  const [hojasMedicas, setHojasMedicas] = useState([])


  const fetchHistorial = async () => {
    try {
      const data = await patientService.buscarHistorialClinico(params.idPatient)
      const tableData = parseHojaMedicaTable(data.hojasMedicas)
      setHistorialClinico({
        idHistorialClinico: data.idHistorialClinico,
        codigo: data.codigo,
        estadoHojaMedica: true,
      })
      console.log(historialClinico.codigo)
      setHojasMedicas(tableData)
      console.log(tableData)
    } catch (error) {
      console.log("Error al obtener el historial clinico")
    }
  }

  const fetchData = async () => {
    try {
      const data = await patientService.mostrarPacienteRegistrado(params.idPatient)

      setPatientForm({
        ...patientForm,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        nombres: data.nombres,
        tipoSeguro: data.tipoSeguro,
        codigoSeguro: data.codigoSeguro,
        dni: data.dni,
        direccion: data.direccion,
        telefono: data.telefono,
        correo: data.correo,
        sexo: sexParser(data.sexo),
        fechaNacimiento: data.fechaNacimiento,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchHistorial()
  }, [params.idPatient])


  const PatientDataDisplay = ({ patient }) => (
    <div className="flex flex-wrap mb-2 space-x-32 px-4">
      <div className="flex-1 min-w-1/2">
        <p className="flex justify-between">
          <strong className="mr-2">Nombre:</strong>
          <span>{`${patient.nombres} ${patient.apellidoPaterno} ${patient.apellidoMaterno}`}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">DNI:</strong>
          <span>{patient.dni}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Fecha de Nacimiento:</strong>
          <span>{patient.fechaNacimiento}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Sexo:</strong>
          <span>{patient.sexo}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Código de Seguro:</strong>
          <span>{patient.codigoSeguro}</span>
        </p>
      </div>

      <div className="flex-1 min-w-1/2">
        <p className="flex justify-between">
          <strong className="mr-2">Dirección:</strong>
          <span>{patient.direccion}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Teléfono:</strong>
          <span>{patient.telefono}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Correo Electrónico:</strong>
          <span>{patient.correo}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Tipo de Seguro:</strong>
          <span>{patient.tipoSeguro}</span>
        </p>
      </div>
    </div>
  )


  const options = [
    {
      text: "Ver cita",
      link: "/info",
    },

    {
      text: "Ver resultados",
      link: "/historyLabResults",
    }
  ]

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Ver Historial"} Icon={iconoHistorial} />
      <div className="container mx-auto p-4">
        <div className="bg-gray-100 min-h-screen p-4 md:p-8">
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4">
              Historial Clínico: {historialClinico.codigo}
            </h1>
            <PatientDataDisplay patient={patientForm} />
          </div>

          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              Hojas Medicas Existentes:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-600">
                  Desde:
                </label>
                <input className="border rounded p-2 w-full" type="date" />
              </div>
            </div>
            <MedicalRecordsTable data={hojasMedicas} options={options} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistorialClinico
