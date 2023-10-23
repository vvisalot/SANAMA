"use client"
import SearchBar from "@/components/bars/SearchBar"
import DoctorTable from "./DoctorsTable"
import { doctorService } from "@/services/doctorService"
import { useEffect, useState } from "react"
import SpecialtyDropdown from "./SpecialtyDropdown"
import SearchBarDropdown from "@/components/bars/SearchBarDropdown"

const DoctorsPage = () => {
    const [doctorTable, setDoctorTable] = useState([])
    const [filtro, setFiltro] = useState("")

    // const fetchData = async (filtro) => {
    //     try {
    //         const data = await doctorService.buscarPorFiltro(filtro)
    //         const tableData = parseDoctorTable(data)
    //         setDoctorTable(tableData)
    //     } catch (error) {
    //         console.log("No se pudo obtener los datos de los doctores")
    //     }
    // }

    // useEffect(() => {
    //     fetchData("")
    // }, [])

    return (
        <section className="p-10">
            <h1 className="font-bold tracking-wide text-blue-950 text-6xl pb-8" >Doctores</h1>
            <SearchBarDropdown />
            {/* <DoctorTable data={doctorTable}></DoctorTable> */}
        </section>

    )
}

export default DoctorsPage