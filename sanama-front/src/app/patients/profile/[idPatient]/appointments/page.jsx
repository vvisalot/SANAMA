"use client"
import { patientService } from "@/services/patientService"
import { useEffect, useState } from "react"
import PatientAppointmentTable from "./PatientAppointmentTable"
import { parsePatientAppointmentTable } from "@/util/appointmentParser"

const PatientAppointments = ({ params }) => {
    const [patientAppointmentsTable, setPatientAppointmentsTable] = useState([])

    //console.log(params.idPatient)
    const getPatientMedicalRecords = async () => {
        try {
            const data = await patientService.listarCitasPorPaciente(params.idPatient)
            const tableData = parsePatientAppointmentTable(data)
            setPatientAppointmentsTable(tableData)
            console.log(data)
        } catch (error) {
            console.error("Error al obtener las citas del paciente")
        }
    }

    useEffect(() => {
        getPatientMedicalRecords()
    }, [params.idPatient])

    return (
        <>
            <h1 className="font-bold text-blue-500 text-6xl p-12" >Citas del paciente</h1>
            <section className="pl-12 pr-14">
                <PatientAppointmentTable data={patientAppointmentsTable} url={''} />
            </section>
        </>
    )
}

export default PatientAppointments