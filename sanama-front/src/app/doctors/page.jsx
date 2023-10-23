"use client"
import DoctorTable from "./DoctorsTable"
import { doctorService } from "@/services/doctorService"
import { useEffect, useState } from "react"
import SearchBarDropdown from "@/components/bars/SearchBarDropdown"

const DoctorsPage = () => {
    const [doctorTable, setDoctorTable] = useState([])
    const [filtro, setFiltro] = useState("")

    const fetchData = async (filtro) => {
        try {
            const data = await doctorService.buscarPorFiltro(filtro)
            // Nota: Deberías tener una función similar a 'parsePatientTable' pero para doctores
            // const tableData = parseDoctorTable(data)
            // setDoctorTable(tableData)
            setDoctorTable(data) // Esto es solo un placeholder, deberías reemplazarlo con el código anterior
        } catch (error) {
            console.log("No se pudo obtener los datos de los médicos")
        }
    }

    useEffect(() => {
        fetchData("")
    }, [])

    return (
        <section className="p-10">
            <h1 className="font-bold text-blue-500 text-6xl pb-8" >Gestión de Médicos</h1>
            <SearchBarDropdown />
            <DoctorTable data={doctorTable}></DoctorTable>
        </section>

    )
}

export default DoctorsPage