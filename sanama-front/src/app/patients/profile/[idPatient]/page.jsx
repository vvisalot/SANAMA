"use client"

import PatientInfo from "@/app/patients/profile/[idPatient]/PatientInfo"
import ProfileCard from "@/components/cards/ProfileCard"
import { patientService } from "@/services/patientService"
import { useEffect, useState } from "react"
import PatientActions from "./PatientActions"
import LatestAppointments from "./LatestAppointments"
import LatestLabResults from "./LatestLabResults"

const PatientProfile = ({ params }) => {
    const [dataPatient, setDataPatient] = useState({
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        correo: "",
        telefono: "",
        direccion: "",
        sexo: "",
        dni: "",
        fechaNacimiento: "",
        estado: "",
        codigoSeguro: "",
        tipoSeguro: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await patientService.buscarPorFiltro(params.idPatient)
                setDataPatient(data[0])
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [params.idPatient])

    return (
        <article className="flex flex-row justify-between items-start p-10 box-border">
            <section className="box-border overflow-hidden p-4 w-1/3 -m-2.5">
                <ProfileCard
                    name={`${dataPatient.nombres} ${dataPatient.apellidoPaterno} ${dataPatient.apellidoMaterno}`}
                    email={dataPatient.correo}
                    phone={dataPatient.telefono}
                    address={dataPatient.direccion}
                />
                <PatientActions id={params.idPatient} />
            </section>

            <section className="box-border overflow-hidden p-4 w-2/3 -m-2.5">
                <PatientInfo
                    gender={dataPatient.sexo}
                    dni={dataPatient.dni}
                    dateofbirth={dataPatient.fechaNacimiento}
                    patientState={dataPatient.estado}
                    insuranceCode={dataPatient.codigoSeguro}
                    insuranceType={dataPatient.tipoSeguro}
                />
                <div className="flex">
                    <LatestLabResults id={params.idPatient} />
                    <LatestAppointments id={params.idPatient} />

                </div>

            </section>


        </article>

    )
}

export default PatientProfile
