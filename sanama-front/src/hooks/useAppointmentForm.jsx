"use client"
import { useState } from "react"

const useAppointmentForm = () => {
    const [patientId, setPatientId] = useState({
        idPersona: -1
    })

    const [doctorId, setDoctorId] = useState({
        idPersona: -1
    })

    const [legalResponsibilityForm, setLegalResponsibilityForm] = useState({
        tieneAcompañante: 'No',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dni: '',
        parentesco: '',
    })

    const [schedule, setSchedule] = useState({
        fecha: '',
        hora: '',

    })

    const [triageRequirement, setTriageRequirement] = useState(0)



    return {
        patientId,
        setPatientId,
        doctorId,
        setDoctorId,
        legalResponsibilityForm,
        setLegalResponsibilityForm,
        schedule,
        setSchedule,
        triageRequirement,
        setTriageRequirement,
    }
}

export default useAppointmentForm