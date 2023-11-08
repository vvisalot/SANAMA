//Listado de citas
"use client"

import SearchAndAddBar from "@/components/bars/SearchAndAddBar"
import { useEffect, useState } from "react"
import AppointmentTable from "./AppointmentTable"
import { appointmentService } from "@/services/appointmentService"
import { parseAppointmentTable } from "@/util/appointmentParser"
import Link from "next/link"
import SearchBar from "@/components/bars/SearchBar"
import DateRangePicker from "@/components/Date/DateRangePicker"

const AppointmentPage = () => {
  const [appointmentTable, setAppointmentTable] = useState([])


  const fetchData = async () => {
    try {
      const data = await appointmentService.listar()
      const tableData = parseAppointmentTable(data)
      setAppointmentTable(tableData)
      //console.log(data);
    } catch (error) {
      console.log("No se pudo obtener la lista de las citas")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const elements = e.target.elements
    const filtro = elements.namedItem("filtro").value
    try {
      const data = await appointmentService.buscar(filtro)
      const tableData = parseAppointmentTable(data)
      setAppointmentTable(tableData)
    } catch (error) {
      console.log("Error al buscar las citas:", error)
    }
  }

  return (
    <section className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-blue-500 text-6xl pb-8">Citas</h1>
        <Link
          className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          href="/appointments/createAppointment">
          Crear nueva cita
        </Link>
      </div>


      <form className="flex items-center pb-4" onSubmit={handleSubmit}>
        <DateRangePicker></DateRangePicker>
        <SearchBar name={"search-bar-appointments"} width={"w-full"} placeholderText={"Buscar por nombre o dni"} />
      </form>

      {/* <SearchAndAddBar
        linkHref="appointments/createAppointment"
        onSubmit={handleSubmit}
        permitirGenerarNuevaCita={true}
      /> */}
      <AppointmentTable data={appointmentTable}></AppointmentTable>
    </section>
  )
}

export default AppointmentPage
