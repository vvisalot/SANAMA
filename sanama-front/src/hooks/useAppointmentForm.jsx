"use client"
import { useState } from "react"

const useAppointmentForm = () => {
    const [patientId, setPatientId] = useState({
        idPaciente: ''
    })

    const [doctorId, setDoctorId] = useState({
        idDoctor: ''
    })

    const [legalResponsibilityForm, setLegalResponsibilityForm] = useState({
        tieneAcompañante: '',
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

    const [triageRequirement, setTriageRequirement] = useState({
        requiereTriaje: ''
    })



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