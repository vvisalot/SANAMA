//Listado de citas
"use client"

import { useEffect, useState } from "react"
import AppointmentTable from "./AppointmentTable"
import { appointmentService } from "@/services/appointmentService"
import { parseAppointmentTable } from "@/util/appointmentParser"
import Link from "next/link"
import SearchBar from "@/components/bars/SearchBar"
import DateRangePicker from "@/components/Date/DateRangePicker"
import DropdownCheckbox from "@/components/Dropdowns/DropdownCheckbox"
import { format } from "date-fns"


const initialRequest = {
  "pn_id_especialidad": null,
  "pv_filtro": "",
  "pd_fecha_inicio": null,
  "pd_fecha_fin": null,
  "arregloEstados":
    [
      {
        "estado": null
      }
    ]
}

const AppointmentPage = () => {
  const [appointmentTable, setAppointmentTable] = useState([])

  const [statusList, setStatusList] = useState([])
  const [statusState, setStatusState] = useState({})

  const [dateInitial, setDateInitial] = useState(new Date())
  const [dateFinal, setDateFinal] = useState(new Date())

  const fetchStateList = async () => {
    try {
      const data = await appointmentService.listarEstados()
      setStatusList(data)
      let initialValues = {}
      data.forEach((status) => {
        initialValues[status.idValue] = false
      })
      console.log(initialValues)
      setStatusState(initialValues)
      //console.log(data)
    } catch (error) {
      console.log("No se pudo obtener la lista de estados")
    }
  }

  const fetchData = async (request) => {
    try {
      const data = await appointmentService.listarCitasFiltro(request)
      const tableData = parseAppointmentTable(data)
      setAppointmentTable(tableData)
      //console.log(data);
    } catch (error) {
      console.log("No se pudo obtener la lista de las citas")
    }
  }

  useEffect(() => {
    fetchStateList()
    fetchData(initialRequest)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const filtro = elements.namedItem("search-bar-appointments").value

    const stateArray = Object.entries(statusState).filter(([key, value]) => value).map(([key, value]) => {
      return {
        "estado": key
      }
    })
    //console.log(stateArray)
    const request = {
      "pn_id_especialidad": null,
      "pv_filtro": filtro,
      "pd_fecha_inicio": format(dateInitial, 'yyyy-MM-dd'),
      "pd_fecha_fin": format(dateFinal, 'yyyy-MM-dd'),
      "arregloEstados": stateArray
    }
    fetchData(request)
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


      <form className="flex items-center p-4 justify-between" onSubmit={handleSubmit}>
        <DateRangePicker
          dateInitial={dateInitial}
          setDateInitial={setDateInitial}
          dateFinal={dateFinal}
          setDateFinal={setDateFinal} />
        <DropdownCheckbox
          text={"Estado"}
          // stateOptions={stateOptions}
          statusList={statusList}
          statusState={statusState}
          setStatusState={setStatusState}
        />
        <SearchBar name={"search-bar-appointments"} width={"w-[950px]"} placeholderText={"Buscar por nombre del paciente"} />
      </form>

      <section className="p-4">
        <AppointmentTable data={appointmentTable}></AppointmentTable>
      </section>
    </section>
  )
}

export default AppointmentPage
