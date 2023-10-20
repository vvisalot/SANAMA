"use client"
import DoctorTable from "./DoctorsTable"
import { doctorService } from "@/services/doctorService"
import { useEffect, useState } from "react"

const DoctorsPage = () => {
    const [doctorTable, setDoctorTable] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await doctorService.buscarPorFiltro("")
                const tableData = parsePatientTable(data)
                setDoctorTable(tableData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


    return (
        <div className="p-24 font-bold min-h-screen" >
            <h1 className="text-blue-500">Doctores</h1>
            <DoctorTable data={doctorTable}></DoctorTable>
        </div>

    )
}

export default DoctorsPage