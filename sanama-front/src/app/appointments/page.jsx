//Listado de citas
"use client"

import SearchBar from "@/components/bars/SearchBar"
import { useState } from "react"
import AppointmentTable from "./AppointmentTable"

const AppointmentPage = () => {
    const [filtro, setFiltro] = useState("")
    const [appointmentTable, setAppointmentTable] = useState([])


    return (
        <section className="  p-10">
            <h1 className="font-bold text-blue-500 text-6xl pb-8" >Citas</h1>
            <SearchBar />
            <AppointmentTable data={appointmentTable}></AppointmentTable>
        </section>
    )
}

export default AppointmentPage