"use client"
import useAppointmentForm from "@/hooks/useAppointmentForm"
import PatientForm from "./PatientForm"
import usePatientForm from "@/hooks/usePatientForm"
import { useEffect, useState } from 'react'
import AppointementForm from "./AppointementForm"
import { patientService } from "@/services/patientService"
import { appointmentService } from "@/services/appointmentService"
import { useRouter } from "next/navigation"
// Para acceder a los elementos
// elements.namedItem("first_last_name").value

const FormContainer = () => {
    const router = useRouter()
    const [patientFormComplete, setPatientFormComplete] = useState(false)
    const [allFormComplete, setAllFormComplete] = useState(false)

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
        errorMessage,
        validateForm,
        setAppointmentFormComplete,
    } = useAppointmentForm()

    useEffect(() => {
        // console.log(patientForm)
        // console.log(fechaNacimiento)
        // console.log(sexo)
        // console.log(legalResponsibilityForm)
        console.log(triageRequirement)
        // console.log(schedule)

    }, [patientForm, fechaNacimiento, sexo, legalResponsibilityForm, triageRequirement, schedule])


    const handleSubmit = async (event) => {
        event.preventDefault()
        const isValid = validateForm(fechaNacimiento)
        if (isValid) {
            console.log("El formulario es válido. Enviar datos.")
            setAllFormComplete(true)
        } else {
            console.log("Por favor, completa todos los campos obligatorios.")
            setAllFormComplete(false)
            return
        }

        if (patientId.idPersona == -1) {
            console.log('Error')
            try {
                const patientData = {
                    nombres: patientForm.nombres,
                    apellidoPaterno: patientForm.apellidoPaterno,
                    apellidoMaterno: patientForm.apellidoMaterno,
                    dni: patientForm.dni,
                    fechaNacimiento: fechaNacimiento,
                    sexo: sexo.charAt(0),
                    telefono: patientForm.telefono,
                    estado: 1,
                    codigoSeguro: patientForm.codigoSeguro,
                    tipoSeguro: patientForm.tipoSeguro,
                    direccion: patientForm.direccion,
                    correo: patientForm.correo
                }

                const patientResponse = await patientService.registrarPaciente(patientData)

                if (patientResponse !== null) {
                    const newPatientId = patientResponse

                    setPatientId({
                        idPersona: newPatientId
                    })

                    const appointmentFormData = {
                        paciente: {
                            idPersona: newPatientId
                        },
                        medico: doctorId,
                        horaCita: schedule.hora,
                        fechaCita: schedule.fecha,
                        tieneAcompanhante: legalResponsibilityForm.tieneAcompañante === 'Si' ? true : false,
                        nombreAcompanhante: legalResponsibilityForm.tieneAcompañante === 'Si' ? `${legalResponsibilityForm.nombres} ${legalResponsibilityForm.apellidoPaterno} ${legalResponsibilityForm.apellidoMaterno}` : null,
                        dniAcompanhante: legalResponsibilityForm.tieneAcompañante === 'Si' ? legalResponsibilityForm.dni : null,
                        parentezco: legalResponsibilityForm.tieneAcompañante === 'Si' ? legalResponsibilityForm.parentesco : null,
                        requiereTriaje: triageRequirement === 'Si' ? 1 : 0,
                    }
                    let response = await appointmentService.registrarCita(appointmentFormData)
                    console.log(response)
                    router.back()
                    console.log('Paciente registrado y cita registrada')
                } else {
                    console.log('Error al registrar paciente y cita')
                }
            } catch (error) {
                console.log('Error en la respuesta del servidor para registrar un paciente y cita')
            }
        } else {
            try {
                const appointmentFormData = {
                    paciente: patientId,
                    medico: doctorId,
                    horaCita: schedule.hora,
                    fechaCita: schedule.fecha,
                    tieneAcompanhante: legalResponsibilityForm.tieneAcompañante === 'Si' ? true : false,
                    nombreAcompanhante: legalResponsibilityForm.tieneAcompañante === 'Si' ? `${legalResponsibilityForm.nombres} ${legalResponsibilityForm.apellidoPaterno} ${legalResponsibilityForm.apellidoMaterno}` : null,
                    dniAcompanhante: legalResponsibilityForm.tieneAcompañante === 'Si' ? legalResponsibilityForm.dni : null,
                    parentezco: legalResponsibilityForm.tieneAcompañante === 'Si' ? legalResponsibilityForm.parentesco : null,
                    requiereTriaje: triageRequirement === 'Si' ? 1 : 0,
                }

                let response = await appointmentService.registrarCita(appointmentFormData)
                console.log(response)
                router.back()
            } catch (error) {
                console.log('Error al registrar cita para un paciente existente')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-10 w-full" >
            <PatientForm
                setFormComplete={setPatientFormComplete}
                setPatientId={setPatientId}
                patientForm={patientForm}
                setPatientForm={setPatientForm}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                sexo={sexo}
                setSexo={setSexo} />

            <hr className="bg-gray-600 mt-20" />

            {patientFormComplete &&
                <>
                    <AppointementForm
                        setFormComplete={setAppointmentFormComplete}
                        legalResponsibilityForm={legalResponsibilityForm}
                        setLegalResponsibilityForm={setLegalResponsibilityForm}
                        setDoctorId={setDoctorId}
                        schedule={schedule}
                        setSchedule={setSchedule}
                        triageRequirement={triageRequirement}
                        setTriageRequirement={setTriageRequirement}
                        allFormComplete={allFormComplete}
                        setAllFormComplete={setAllFormComplete}
                        handleSubmit={handleSubmit}
                    />
                </>
            }

            {errorMessage && (
                <pre className="text-red-500 mt-2">
                    {errorMessage}
                </pre>
            )}

        </form >
    )
}

export default FormContainer