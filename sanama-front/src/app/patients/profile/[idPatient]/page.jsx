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
        <div className="min-h-screen p-10 bg-slate-200">
            <div className="flex min-h bg-slate-100 p-10">
                <div className="w-1/3 h-1/3 flex-row px-5">
                    <div className="py-10">
                        <ProfileCard
                            name={`${dataPatient.nombres} ${dataPatient.apellidoPaterno} ${dataPatient.apellidoMaterno}`}
                            email={dataPatient.correo}
                            phone={dataPatient.telefono}
                            address={dataPatient.direccion}
                        />
                    </div>

                    <div className="bg-slate-500">
                        HOLA
                    </div>
                </div>

                <div className="w-2/3 h-1/3 flex-row px-10">
                    <div className="py-10">
                        <PatientInfo
                            gender={dataPatient.sexo}
                            dni={dataPatient.dni}
                            dateofbirth={dataPatient.fechaNacimiento}
                            patientState={dataPatient.estado}
                            insuranceCode={dataPatient.codigoSeguro}
                            insuranceType={dataPatient.tipoSeguro}
                        />
                    </div>
                </div>



            </div>


        </div>
    )
}

export default PatientProfile