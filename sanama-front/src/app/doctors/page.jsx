"use client"
import DoctorTable from "./DoctorsTable"
import { doctorService } from "@/services/doctorService"
import { useEffect, useState } from "react"
import { parseDoctorsTable } from "@/util/doctorParser"
import Dropdown from "@/components/Dropdowns/Dropdown"
import SearchBar from "@/components/bars/SearchBar"
import DoctorIcon from "@/components/icons/DoctorIcon"
import { useRouter } from "next/navigation"
import TitleWithIcon from "@/components/TitleWithIcon";
import Link from "next/link"

const DoctorsPage = () => {
  const router = useRouter()
  const [doctorTable, setDoctorTable] = useState([])
  const [specialties, setSpecialties] = useState([])
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(
    "Todas las especialidades"
  )
  const fetchData = async (filtro, especialidad) => {
    try {
      const data = await doctorService.buscarPorMedicoEspecialidad(
        filtro,
        especialidad
      )
      const tableData = parseDoctorsTable(data)
      //console.log(tableData)
      setDoctorTable(tableData)
    } catch (error) {
      console.log("No se pudo obtener los datos de los doctores")
    }
  }

  const fetchSpecialty = async () => {
    try {
      const data = await doctorService.listarEspecialidades()
      setSpecialties(data)
      //console.log(data)
    } catch (error) {
      console.log("No se pudo obtener los datos de las especialidades")
    }
  }

  useEffect(() => {
    fetchData("", "")
    fetchSpecialty()
  }, [])

  // useEffect(() => {
  //     fetchData("", especialidadSeleccionada)
  // }, [especialidadSeleccionada])

  const handleSubmit = (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const dropdownValue = elements.namedItem("speciality-dropdown").value
    const filtro = elements.namedItem("doctor-search").value
    fetchData(filtro, dropdownValue)
  }

  return (
    <section className="w-full px-14 py-6">
      <section className="flex justify-between items-center mb-8 ">
        <TitleWithIcon name={"Doctores"} Icon={DoctorIcon} />
        <Link
          className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4"
          href="/doctors/newDoctor"
        >
          Agregar doctor
        </Link>

      </section>

      <form className="flex pb-4 items-center" onSubmit={handleSubmit}>
        <Dropdown
          data={specialties}
          defaultText={"Todas las especialidades"}
          text={"nombre"}
          defaultValue={""}
          value={"nombre"}
          name={"speciality-dropdown"}
          width={"w-[400px]"}
          height={"h-[50px]"}
          handleChange={(event) => {
            setEspecialidadSeleccionada(event.target.value)
          }}
        ></Dropdown>

        <SearchBar
          name={"doctor-search"}
          width={"w-full"}
          height={"h-[50px]"}
          placeholderText={"Buscar por Nombre o CMP"}
        ></SearchBar>

        <button
          type="submit"
          className="h-[50px] text-white bg-primary-dark-blue hover:bg-primary-dusk-blue 
          focus:ring-4 focus:outline-none focus:ring-primary-light-periwinkle font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Buscar
        </button>
      </form>

      <div className="py-4">
        Número de resultados: {doctorTable.length}
      </div>

      <section className="w-full">
        <DoctorTable data={doctorTable}></DoctorTable>
      </section>
    </section>
  )
}

export default DoctorsPage
