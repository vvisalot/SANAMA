"use client"

import { useEffect, useState } from "react"
import AppointmentTable from "@/components/appointments/AppointmentTable"
import { appointmentService } from "@/services/appointmentService"
import { parseAppointmentTable } from "@/util/appointmentParser"
import SearchBar from "@/components/bars/SearchBar"
import DateRangePicker from "@/components/Date/DateRangePicker"
import DropdownCheckbox from "@/components/Dropdowns/DropdownCheckbox"
import { format } from "date-fns"
import AppointmentIcon from "@/components/icons/AppointmentIcon"
import { useRouter } from "next/navigation"
import TitleWithIcon from "@/components/TitleWithIcon";
import Link from "next/link"

const initialRequest = {
  pn_id_especialidad: null,
  pv_filtro: "",
  pd_fecha_inicio: null,
  pd_fecha_fin: null,
  arregloEstados: [
    {
      estado: null,
    },
  ],
}

const AppointmentPage = () => {
  const [appointmentTable, setAppointmentTable] = useState([])
  const router = useRouter()
  const [statusList, setStatusList] = useState([])
  const [statusState, setStatusState] = useState({})

  const [dateInitial, setDateInitial] = useState(null)
  const [dateFinal, setDateFinal] = useState(null)

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
    } catch (error) {
      console.log("No se pudo obtener la lista de estados")
    }
  }

  const fetchData = async (request) => {
    try {
      const data = await appointmentService.listarCitasFiltro(request)
      const tableData = parseAppointmentTable(data)
      setAppointmentTable(tableData)
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

    const stateArray = Object.entries(statusState)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        return {
          estado: key,
        }
      })
    const request = {
      pn_id_especialidad: null,
      pv_filtro: filtro,
      pd_fecha_inicio: dateInitial ? format(dateInitial, "yyyy-MM-dd") : null,
      pd_fecha_fin: dateFinal ? format(dateFinal, "yyyy-MM-dd") : null,
      arregloEstados: stateArray,
    }
    fetchData(request)
  }

  return (
    <section className="p-4 md:p-14">
      <section className="flex justify-between items-center mb-8">
        <TitleWithIcon name={"Citas"} Icon={AppointmentIcon} />
        <Link
          className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4"
          href="/appointments/createAppointment"
        >
          Crear Nueva Cita
        </Link>
      </section>


      <form className=" flex items-center " onSubmit={handleSubmit}>
        <DropdownCheckbox
          text={"Selecciona el estado de la cita"}
          statusList={statusList}
          statusState={statusState}
          setStatusState={setStatusState}
        />
        <DateRangePicker
          dateInitial={dateInitial}
          setDateInitial={setDateInitial}
          dateFinal={dateFinal}
          setDateFinal={setDateFinal}
        />

        <SearchBar
          name={"search-bar-appointments"}
          width={"w-full"}
          placeholderText={"Buscar por nombre del paciente"}
        />
        <button
          type="submit"
          className="text-white bg-primary-dark-blue hover:bg-primary-dusk-blue focus:ring-4 focus:outline-none focus:ring-primary-light-periwinkle font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Buscar
        </button>
      </form>

      <div className="px-2 py-4">
        Número de resultados: {appointmentTable.length}
      </div>

      <section className="">
        <AppointmentTable data={appointmentTable}></AppointmentTable>
      </section>
    </section>
  )
}

export default AppointmentPage
