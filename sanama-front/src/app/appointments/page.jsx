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

    const handleSubmit = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const filtro = elements.namedItem("search-bar-cita").value
        fetchData(filtro)
    }

    return (
        <>
            <section className="flex items-center">
                <h1 className="font-bold text-blue-500 text-6xl p-12" >Citas</h1>
                <Link href='appointments/createAppointment'>
                    <button className=" text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                        Crear cita
                    </button>
                </Link>
            </section>


            <form className="flex pl-8 pr-10 pb-4" onSubmit={handleSubmit}>
                <SearchBar name={"search-bar-cita"} width={"w-full"} />
            </form>


            <section className="pl-12 pr-14">
                <AppointmentTable data={appointmentTable} ></AppointmentTable>
            </section>
        </>
    )
}

export default AppointmentPage