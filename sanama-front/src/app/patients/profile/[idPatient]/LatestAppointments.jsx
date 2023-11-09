import { patientService } from "@/services/patientService"
import Link from "next/link"
import { useEffect, useState } from "react"

const LatestAppointments = ({ id }) => {
    const [latestAppointments, setLatestAppointments] = useState([])

    const fetchLatestAppointments = async () => {
        try {
            const data = await patientService.listarCitasPorPaciente(id)
            console.log(data)
            setLatestAppointments(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchLatestAppointments()
    }, [])

    return (
        <section className="my-10 ml-4 p-6 w-full h-full  bg-white border border-gray-200 rounded-xl shadow">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg pb-1"> Últimas citas realizadas</h1>
                <Link href={`/patients/profile/${id}/appointments`}
                    className="text-blue-700 hover:text-white border 
                         hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
                        dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    Ver todos
                </Link>
            </div>

            <div className="">
                {latestAppointments.slice(0, 3).map((appointment, index) => (
                    <div key={index} className="px-4 py-2  mb-4 rounded-lg text-sm border border-gray shadow-sm">
                        <p>
                            <strong className="text-gray-500 pr-3">Fecha y hora:
                            </strong>
                            {appointment.fechaCita}
                        </p>
                        <p>
                            <strong className="text-gray-500 pr-3">Hora:
                            </strong> {appointment.horaCita}
                        </p>
                        <p>
                            <strong className="text-gray-500 pr-3">Médico:
                            </strong> {`${appointment.medico.nombres} ${appointment.medico.apellidoPaterno} ${appointment.medico.apellidoMaterno}`}
                        </p>
                        <p>
                            <strong className="text-gray-500 pr-3">Especialidad:
                            </strong> {appointment.medico.especialidad.nombre}
                        </p>
                    </div>
                ))
                }
            </div >



        </section >
    )
}

export default LatestAppointments