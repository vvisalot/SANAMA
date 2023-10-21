"use client"
import { useEffect, useState } from "react"
import PatientTable from "./PatientTable"
import { patientService } from "@/services/patientService"
import { parsePatientTable } from "@/util/patientParser"
import SearchBar from "@/components/bars/SearchBar"


const PatientPage = () => {
    const [patientTable, setPatientTable] = useState([])
    const [filtro, setFiltro] = useState("")

    const fetchData = async (filtro) => {
        try {
            const data = await patientService.buscarPorFiltro(filtro)
            const tableData = parsePatientTable(data)
            setPatientTable(tableData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData("")
    }, [])


    return (
        <main>
            <div className=" font-bold min-h-screen p-5 bg-slate-200">
                <div className=" font-bold min-h-screen bg-slate-100 p-10">
                    <h1 className="text-blue-500 text-6xl pb-8" >Pacientes</h1>

                    <SearchBar filtro={filtro} setFiltro={setFiltro} fetchData={fetchData} />

                    <div className="pt-10" >
                        <PatientTable data={patientTable}></PatientTable>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PatientPage