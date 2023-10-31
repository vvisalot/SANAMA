"use client"
import useAppointmentForm from "@/hooks/useAppointmentForm"
import PatientForm from "./PatientForm"
import usePatientForm from "@/hooks/usePatientForm"
import { useEffect, useState } from 'react'
import AppointementForm from "./AppointementForm"

// Para acceder a los elementos
// elements.namedItem("first_last_name").value

const FormContainer = () => {
    const {
        patientForm,
        setPatientForm,
        fechaNacimiento,
        setFechaNacimiento,
        sexo,
        setSexo,
    } = usePatientForm()

    const {
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
    } = useAppointmentForm()

    const [formComplete, setFormComplete] = useState(false)

    const handleSubmit = async (event) => {

        //Evitar que el boton me rompa la pagina
        event.preventDefault()
        //Recuperar datos del formulario
        // console.log(patientForm)

        //llamar al servicio

        //const response = await patientService.registrarPaciente(patientForm)
        // const response = await citasService.citar({
        //     paciente: { idPersona: pacienteData.idPersona },
        //     medico: { idPersona: doctorResponsable.idPersona },
        //     horaCita: appointmentData.selectedHour,
        //     fechaCita: appointmentData.selectedDate,
        //     tieneAcompanhante: companionData ? true : false,
        //     nombreAcompanhante: companionData.nombres,
        //     dniAcompanhante: companionData.documentoIdentidad,
        //     parentezco: companionData.relationship,
        //     requiereTriaje: selectedTriage ? 1 : 0,
        //     estado: 1,
        // })
    }

    useEffect(() => {
        console.log(patientForm)
        console.log(fechaNacimiento)
        console.log(sexo)
        console.log(legalResponsibilityForm)
        console.log(triageRequirement)
        console.log(schedule)

    }, [patientForm, fechaNacimiento, sexo, legalResponsibilityForm, triageRequirement, schedule])

    return (
        <form onSubmit={handleSubmit} className="p-10 w-full" >
            <PatientForm
                formComplete={formComplete}
                setFormComplete={setFormComplete}
                patientId={patientId}
                setPatientId={setPatientId}
                patientForm={patientForm}
                setPatientForm={setPatientForm}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                sexo={sexo}
                setSexo={setSexo} />

            <hr className="bg-gray-600 mt-20" />

            {formComplete &&
                <AppointementForm
                    legalResponsibilityForm={legalResponsibilityForm}
                    setLegalResponsibilityForm={setLegalResponsibilityForm}
                    doctorId={doctorId}
                    setDoctorId={setDoctorId}
                    schedule={schedule}
                    setSchedule={setSchedule}
                    triageRequirement={triageRequirement}
                    setTriageRequirement={setTriageRequirement}
                />
            }
        </form >
    )
}

export default FormContainer