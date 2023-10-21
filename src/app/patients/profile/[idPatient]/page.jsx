"use client"
import PatientInfo from "@/app/patients/profile/[idPatient]/PatientInfo"
import ProfileCard from "@/components/cards/ProfileCard"
import { patientService } from "@/services/patientService"
import { useEffect, useState } from "react"

const PatientProfile = ({ params }) => {
    const [dataPatient, setDataPatient] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await patientService.buscarPorFiltro(params.idPatient)
                console.log(data[0])
                setDataPatient(data[0])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="flex p-20">
            <div className="p-10">
                <ProfileCard
                    name={`${dataPatient.nombres} ${dataPatient.apellidoPaterno} ${dataPatient.apellidoMaterno}`}
                    email={dataPatient.correo}
                    phone={dataPatient.telefono}
                    address={dataPatient.direccion}
                />
            </div>
            <div className="p-10">
                <PatientInfo />
            </div>
        </div>
    )
}

export default PatientProfile