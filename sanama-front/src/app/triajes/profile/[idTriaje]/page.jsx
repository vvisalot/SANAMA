"use client"

import { useEffect, useState } from "react"
import { triajeService } from "@/services/triajeService"

const TriajeProfile = ({ params }) => {
    const [dataTriaje, setDataTriaje] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await triajeService.buscarPorFiltro(params.idTriaje)
                console.log(data)
                setDataTriaje(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <article className="flex flex-row justify-between items-start p-10 bg-gray-100 rounded-lg shadow-md">
            <section className="bg-white rounded-lg p-8 w-2/3 -m-2.5">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Información del Triaje</h2>
                    <p className="mb-4">
                    <strong className="text-gray-600">Nombres y apellidos:</strong> 
                        {dataTriaje?.paciente && `${dataTriaje?.paciente.nombres} ${dataTriaje?.paciente.apellidoPaterno} ${dataTriaje?.paciente.apellidoMaterno}`}
                    </p>
                    <p className="mb-4"><strong className="text-gray-600">Edad:</strong> {dataTriaje?.edad}</p>
                    <p className="mb-4"><strong className="text-gray-600">Sexo:</strong> {dataTriaje?.sexo}</p>
                    <p className="mb-4"><strong className="text-gray-600">DNI:</strong> {dataTriaje?.dni}</p>
                    <p className="mb-4"><strong className="text-gray-600">Talla:</strong> {dataTriaje?.talla}</p>
                    <p className="mb-4"><strong className="text-gray-600">Peso:</strong> {dataTriaje?.peso}</p>
                    <p className="mb-4"><strong className="text-gray-600">Temperatura:</strong> {dataTriaje?.temperatura}</p>
                    <p className="mb-4"><strong className="text-gray-600">Presión arterial:</strong> {dataTriaje?.presionArterial}</p>
                    <p className="mb-4"><strong className="text-gray-600">Frecuencia cardíaca:</strong> {dataTriaje?.frecuenciaCardiaca}</p>
                    <p className="mb-4"><strong className="text-gray-600">Frecuencia respiratoria:</strong> {dataTriaje?.frecuenciaRespiratoria}</p>
                    <p className="mb-4"><strong className="text-gray-600">Saturación de oxígeno:</strong> {dataTriaje?.saturacionOxigeno}</p>
                    <p className="mb-4"><strong className="text-gray-600">Nivel de conciencia:</strong> {dataTriaje?.nivelConciencia}</p>
                    <p className="mb-4"><strong className="text-gray-600">Nivel de dolor:</strong> {dataTriaje?.nivelDolor}</p>
                    <p className="mb-4"><strong className="text-gray-600">Motivo:</strong> {dataTriaje?.motivo}</p>
                    <p className="mb-4"><strong className="text-gray-600">Condiciones preexistentes:</strong> {dataTriaje?.condicionesPreexistentes}</p>
                </div>
            </section>
        </article>
    )
}

export default TriajeProfile
