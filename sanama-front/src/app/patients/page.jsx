"use client"
import { useEffect, useState } from "react"
import PatientTable from "./PatientTable"
import { patientService } from "@/services/patientService"
import { parsePatientTable } from "@/util/patientParser"
import SearchBar from "@/components/bars/SearchBar"
import PatientIcon from "@/components/icons/PatientIcon"
import TitleWithIcon from "@/components/TitleWithIcon";

const PatientPage = () => {
  const [patientTable, setPatientTable] = useState([])

  const fetchData = async (filtro) => {
    try {
      const data = await patientService.buscarPorFiltro(filtro)
      const tableData = parsePatientTable(data)
      console.log(tableData)
      setPatientTable(tableData)
    } catch (error) {
      console.log("No se pudo obtener los datos de los pacientes")
    }
  }

  useEffect(() => {
    fetchData("")
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const filtro = elements.namedItem("patients-search").value
    fetchData(filtro)
  }

  return (
    <section className="w-full px-14 py-6">
      <TitleWithIcon name={"Pacientes"} Icon={PatientIcon} />

      <form className="flex pb-4 items-center" onSubmit={handleSubmit}>
        <SearchBar
          name={"patients-search"}
          width={"w-full"}
          height={"h-12"}
          placeholderText={"Buscar por nombre o DNI"}
        />

        <button
          type="submit"
          className="h-[50px] text-white bg-primary-dark-blue hover:bg-primary-dusk-blue 
          focus:ring-4 focus:outline-none focus:ring-primary-light-periwinkle font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Buscar
        </button>

      </form>

      <div className="py-4">
        Número de resultados: {patientTable.length}
      </div>

      <section className="w-full">
        <PatientTable data={patientTable}></PatientTable>
      </section>
    </section>
  )
}

export default PatientPage
