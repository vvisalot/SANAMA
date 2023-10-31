"use client"
import useAppointmentForm from "@/hooks/useAppointmentForm"
import DoctorSchedules from "./DoctorSchedules"
import LegalResponsibility from "./LegalResponsibility"
import PatientForm from "./PatientForm"
import TriageForm from "./TriageForm"
import usePatientForm from "@/hooks/usePatientForm"
import { useEffect } from 'react'

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
        legalResponsibility,
        setLegalResponsibility,
        schedule,
        setSchedule,
        triageRequirement,
        setTriageRequirement,
    } = useAppointmentForm()

    const handleSubmit = async (event) => {

        //Evitar que el boton me rompa la pagina
        event.preventDefault()
        //Recuperar datos del formulario
        // console.log(patientForm)
        // console.log(legalResponsibility)
        // console.log(triageForm)
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
        // console.log(patientForm) 
        // console.log(fechaNacimiento)
        // console.log(sexo)
        // console.log(legalResponsibility)
        // console.log(triageRequirement)
        console.log(schedule)
        console.log(doctorId)
    }, [patientForm, fechaNacimiento, sexo, legalResponsibility, triageRequirement, doctorId, schedule])

    return (
        <form onSubmit={handleSubmit} className="p-10 w-4/5" >
            <PatientForm
                patientForm={patientForm}
                setPatientForm={setPatientForm}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                sexo={sexo}
                setSexo={setSexo} />
            <hr className="bg-gray-600 mt-20" />

            <LegalResponsibility
                legalResponsibility={legalResponsibility}
                setLegalResponsibility={setLegalResponsibility}
            />

            <hr className="bg-gray-600 mt-10" />
            <DoctorSchedules
                doctorId={doctorId}
                setDoctorId={setDoctorId}
                schedule={schedule}
                setSchedule={setSchedule}
            />

            <hr className="bg-gray-600 mt-20" />
            <TriageForm
                triageForm={triageRequirement}
                setTriageForm={setTriageRequirement}

            ></TriageForm>


            <div className="flex flex-row-reverse">
                <button
                    type="submit"
                    className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center">Registrar cita
                </button>
            </div>

        </form >
    )
}

export default FormContainer