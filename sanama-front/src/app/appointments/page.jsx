//Listado de citas
"use client"

import SearchBar from "@/components/bars/SearchBar"
import { useEffect, useState } from "react"
import AppointmentTable from "./AppointmentTable"
import { appointmentService } from "@/services/appointmentService"
import Link from "next/link"
import { parseAppointmentTable } from "@/util/appointmentParser"

const AppointmentPage = () => {
    // const [filtro, setFiltro] = useState("")
    const [appointmentTable, setAppointmentTable] = useState([])

    const fetchData = async () => {
        try {
            const data = await appointmentService.listar()
            const tableData = parseAppointmentTable(data)
            setAppointmentTable(tableData)
            console.log(data)
        } catch (error) {
            console.log("No se pudo obtener la lista de las citas")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <section className="p-10">
            <h1 className="font-bold text-blue-500 text-6xl pb-8" >Citas</h1>
            <div className="flex items-center">
                <SearchBar width={"w-full"} />
                <Link href='appointments/createAppointment'>
                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1">
                        Crear cita
                    </button>
                </Link>
            </div>
            <AppointmentTable data={appointmentTable} ></AppointmentTable>
        </section>
    )
}

export default AppointmentPage