"use client"
import useAppointmentForm from "@/hooks/useAppointmentForm"
import PatientForm from "./PatientForm"
import usePatientForm from "@/hooks/usePatientForm"
import { useEffect, useState } from 'react'
import AppointementForm from "./AppointementForm"
import { patientService } from "@/services/patientService"
import { appointmentService } from "@/services/appointmentService"

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


    const registrarPaciente = async () => {
        try {
            const response = await patientService.registrarPaciente({
                nombres: patientForm.nombres,
                apellidoPaterno: patientForm.apellidoPaterno,
                apellidoMaterno: patientForm.apellidoMaterno,
                dni: patientForm.dni,
                fechaNacimiento: fechaNacimiento,
                sexo: sexo,
                telefono: patientForm.telefono,
                estado: 1,
                codigoSeguro: patientForm.codigoSeguro,
                tipoSeguro: patientForm.tipoSeguro,
                direccion: patientForm.direccion,
            })

        } catch (error) {
            console.log(response)
        }
    }

    const registrarCita = async (params) => {
        try {
            const response = await appointmentService.registrarCita({
                paciente: {
                    idPersona: patientId
                },
                medico: {
                    idPersona: doctorId
                },
                horaCita: appointmentData.selectedHour,
                fechaCita: appointmentData.selectedDate,
                tieneAcompanhante: legalResponsibilityForm.tieneAcompañante,
                nombreAcompanhante: legalResponsibilityForm.nombres + ' ' + legalResponsibilityForm.apellidoPaterno + ' ' + legalResponsibilityForm.apellidoMaterno,
                dniAcompanhante: legalResponsibilityForm.dni,
                parentezco: companionData.relationship,
                requiereTriaje: triageRequirement.requiereTriaje ? 1 : 0,
            })
        } catch (error) {
            console.log(response)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!patientId) {
            try {
                const patientData = {
                    nombres: patientForm.nombres,
                    apellidoPaterno: patientForm.apellidoPaterno,
                    apellidoMaterno: patientForm.apellidoMaterno,
                    dni: patientForm.dni,
                    fechaNacimiento: fechaNacimiento,
                    sexo: sexo,
                    telefono: patientForm.telefono,
                    estado: 1,
                    codigoSeguro: patientForm.codigoSeguro,
                    tipoSeguro: patientForm.tipoSeguro,
                    direccion: patientForm.direccion,
                }

                const patientResponse = await patientService.registrarPaciente(patientFormData)

                if (patientResponse && patientResponse.idPersona) {
                    const newPatientId = patientResponse.idPersona
                    setPatientId(newPatientId)

                    const appointmentFormData = {
                        idPaciente: newPatientId, // Cambia idPaciente por el ID del paciente recién registrado
                        idMedico: doctorId,
                        horaCita: schedule.selectedHour, // Ajusta el campo según tu formulario de cita
                        fechaCita: schedule.selectedDate, // Ajusta el campo según tu formulario de cita
                        tieneAcompanhante: legalResponsibilityForm.tieneAcompañante,
                        nombreAcompanhante: `${legalResponsibilityForm.nombres} ${legalResponsibilityForm.apellidoPaterno} ${legalResponsibilityForm.apellidoMaterno}`,
                        dniAcompanhante: legalResponsibilityForm.dni,
                        parentezco: companionData.relationship, // Ajusta el campo según tu formulario de cita
                        requiereTriaje: triageRequirement.requiereTriaje ? 1 : 0,
                    }

                    await appointmentService.registrarCita(appointmentFormData)
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
                    idPaciente: patientId,
                    idMedico: doctorId,
                    horaCita: schedule.hora,
                    fechaCita: schedule.fecha,
                    tieneAcompanhante: legalResponsibilityForm.tieneAcompañante === 'Si' ? true : false,
                    nombreAcompanhante: `${legalResponsibilityForm.nombres} ${legalResponsibilityForm.apellidoPaterno} ${legalResponsibilityForm.apellidoMaterno}`,
                    dniAcompanhante: legalResponsibilityForm.dni,
                    parentezco: legalResponsibilityForm.parentesco,
                    requiereTriaje: triageRequirement.requiereTriaje ? 1 : 0,
                }

                await appointmentService.registrarCita(appointmentFormData)
                console.log('YUPI')
                console.log(appointmentFormData)
            } catch (error) {
                console.log('Error al registrar cita para un paciente existente')
            }
        }
    }



    useEffect(() => {
        // console.log(patientForm)
        // console.log(fechaNacimiento)
        // console.log(sexo)
        // console.log(legalResponsibilityForm)
        // console.log(triageRequirement)
        // console.log(schedule)

    }, [patientForm, fechaNacimiento, sexo, legalResponsibilityForm, triageRequirement, schedule])

    const [patientFormComplete, setPatientFormComplete] = useState(false)
    const [appointmentFormComplete, setAppointmentFormComplete] = useState(false)
    const [allFormComplete, setAllFormComplete] = useState(false)


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
                    />
                </>
            }
        </form >
    )
}

export default FormContainer