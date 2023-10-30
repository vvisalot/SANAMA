"use client"
import { useState } from "react"

const useAppointmentForm = () => {
    const [patientForm, setPatientForm] = useState({
        id: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        tipoSeguro: '',
        codigoSeguro: '',
        dni: '',
        direccion: ''
    })

    const today = new Date()
    const [fechaNacimiento, setFechaNacimiento] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`)
    const [sexo, setSexo] = useState('')
    const [doctorForm, setDoctorForm] = useState({
        id: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
    })

    const [companionForm, setCompanionForm] = useState({
        tiene: false,
        nombre: '',
        dni: '',
        parentesco: ''
    })

    const [triageRequirement, setTriageRequirement] = useState(false)

    const [appointmentDateTime, setAppointmentDateTime] = useState({
        fecha: null,
        hora: null
    })

    return {
        patientForm,
        setPatientForm,
        doctorForm,
        setDoctorForm,
        companionForm,
        setCompanionForm,
        triageRequirement,
        setTriageRequirement,
        appointmentDateTime,
        setAppointmentDateTime,
        fechaNacimiento,
        setFechaNacimiento,
        sexo,
        setSexo
    }
}

export default useAppointmentForm