"use client"
import { useEffect, useState } from "react"
import LaboratoryTable from "./LaboratoryTable"
import { laboratoryService } from "@/services/laboratoryService"
import { parseLaboratoryTable } from "@/util/laboratoryParser"
import SearchBar from "@/components/bars/SearchBar"

const LaboratoryPage = () => {
    const [laboratoryTable, setLaboratoryTable] = useState([])
    const [filtro, setFiltro] = useState("")

    const fetchData = async (filtro) => {
        try {
            const data = await laboratoryService.buscarPorFiltro(filtro)
            const tableData = parseLaboratoryTable(data)
            console.log(tableData)
            setLaboratoryTable(tableData)
        } catch (error) {
            console.log("No se pudo obtener los datos de los laboratorios")
        }
    }

    useEffect(() => {
        fetchData("")
    }, [])

    return (
        <section className="p-10">
            <h1 className="font-bold text-blue-500 text-6xl pb-8" >Gestión de Laboratorios</h1>
            <SearchBar filtro={filtro} setFiltro={setFiltro} fetchData={fetchData} />
            <LaboratoryTable data={laboratoryTable}></LaboratoryTable>
        </section>
    )
}

export default LaboratoryPage   