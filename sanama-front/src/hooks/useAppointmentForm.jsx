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

    const [triageRequirement, setTriageRequirement] = useState('Si')
    const [appointmentFormComplete, setAppointmentFormComplete] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const validateForm = (fechaNacimiento) => {
        const scheduleFormValues = Object.values(schedule)

        if (scheduleFormValues.includes("")) {
            setErrorMessage("Por favor, elige un horario de cita")
            setAppointmentFormComplete(false)
            return false
        }

        if (legalResponsibilityForm.tieneAcompañante === "Si") {
            const legalResponsibilityFormValues = Object.values(legalResponsibilityForm)
            if (legalResponsibilityFormValues.includes("")) {
                setErrorMessage("Por favor, completa todos los campos de responsabilidad legal.")
                setAppointmentFormComplete(false)
                return false
            }
        }
        setErrorMessage("")
        setAppointmentFormComplete(true)
        return true
    }

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
        appointmentFormComplete,
        setAppointmentFormComplete,
        errorMessage,
        validateForm,

    }
}

export default useAppointmentForm