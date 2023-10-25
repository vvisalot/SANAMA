"use client"

import PatientInfo from "@/app/patients/profile/[idPatient]/PatientInfo"
import ProfileCard from "@/components/cards/ProfileCard"
import { patientService } from "@/services/patientService"
import { useEffect, useState } from "react"
import LatestLabResults from "./LatestLabResults"
import PatientActions from "./PatientActions"

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
        <article className="flex flex-row justify-between items-start p-10 box-border"
        style={{display: 'flex',}}>
            <section className="box-border overflow-hidden p-10 w-1/3 -m-2.5" 
            style={{flex: 1, }}>
                <ProfileCard
                    name={`${dataPatient.nombres} ${dataPatient.apellidoPaterno} ${dataPatient.apellidoMaterno}`}
                    email={dataPatient.correo}
                    phone={dataPatient.telefono}
                    address={dataPatient.direccion}
                />
                <LatestLabResults />
            </section>      

            <section className="box-border overflow-hidden p-10 w-2/3 -m-2.5" 
            style={{flex: 2, }}>
                <PatientInfo
                    gender={dataPatient.sexo}
                    dni={dataPatient.dni}
                    dateofbirth={dataPatient.fechaNacimiento}
                    patientState={dataPatient.estado}
                    insuranceCode={dataPatient.codigoSeguro}
                    insuranceType={dataPatient.tipoSeguro}
                />
                <PatientActions />
            </section>
        </article>
    )
}

export default PatientProfile
