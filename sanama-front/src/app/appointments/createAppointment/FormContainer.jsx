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
    const [allFormComplete, setAllFormComplete] = useState(false)

    const {
        validatePatientForm,
        patientFormComplete,
        setPatientFormComplete,
        errorMessagePatientForm,
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
        errorMessageAppointmentForm,
        validateAppointmentForm,
        setAppointmentFormComplete,
    } = useAppointmentForm()

    // useEffect(() => {
    //     // console.log(patientForm)
    //     // console.log(fechaNacimiento)
    //     // console.log(sexo)
    //     // console.log(legalResponsibilityForm)
    //     console.log(triageRequirement)
    //     // console.log(schedule)

    // }, [patientForm, fechaNacimiento, sexo, legalResponsibilityForm, triageRequirement, schedule])


    const handleSubmit = async (event) => {
        event.preventDefault()
        const isValid = validateAppointmentForm(fechaNacimiento) && validatePatientForm()

        console.log(validatePatientForm())
        console.log(validateAppointmentForm(fechaNacimiento))

        if (isValid) {
            console.log("El formulario es válido. Enviar datos.")
            setAllFormComplete(true)
        } else {
            console.log("No se han completado correctamente los campos.")
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
                formComplete={patientFormComplete}
                setFormComplete={setPatientFormComplete}
                setPatientId={setPatientId}
                patientForm={patientForm}
                setPatientForm={setPatientForm}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                sexo={sexo}
                setSexo={setSexo} />

            <hr className="bg-gray-600 mt-20" />



            {/* {patientFormComplete && */}
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
            {/* } */}


            {errorMessagePatientForm && (
                <pre className="text-red-500 mt-2">
                    {errorMessagePatientForm}
                </pre>
            )}

            {errorMessageAppointmentForm && (
                <pre className="text-red-500 mt-2">
                    {errorMessageAppointmentForm}
                </pre>
            )}

            {/* Aqui va el boton de submit que valida que ambos formularios esten completos */}

            <div className="flex flex-row-reverse">
                <button type="submit" onClick={handleSubmit}
                    className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center">
                    Registrar cita
                </button>
            </div>

        </form >
    )
}

export default FormContainer