"use client"

import usePatientForm from "@/hooks/usePatientForm"
import { patientService } from "@/services/patientService"
import { TextInput } from "flowbite-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const EditPatientData = ({ params }) => {
    //console.log(params.idPatient)
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    console.log("Is editing", isEditing)
    const {
        patientForm,
        setPatientForm,
    } = usePatientForm()

    const fetchData = async (filtro) => {
        try {
            const data = await patientService.mostrarPacienteRegistrado(filtro)
            console.log(data)

            setPatientForm({
                ...patientForm,
                apellidoPaterno: data.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno,
                nombres: data.nombres,
                direccion: data.direccion,
                telefono: data.telefono,
                correo: data.correo
            })

        } catch (error) {
            console.log(error)
        }
    }

    const putData = async (data) => {
        try {
            console.log("Enviando datos", data)
            const response = await patientService.modificarPaciente(data)
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataToUpdate = {
            "pn_id_paciente": params.idPatient,
            "pv_telefono": patientForm.telefono,
            "pv_correo": patientForm.correo,
            "pv_direccion": patientForm.direccion
        }

        try {
            await putData(dataToUpdate)
            router.back()
        } catch (error) {
            console.log("Error al actualizar datos")
        }
    }

    useEffect(() => {
        if (params.idPatient !== null) {
            fetchData(params.idPatient)
        }

    }, [params.idPatient])

    return (
        <form className="p-20" onSubmit={handleSubmit}>
            <legend className="text-2xl font-bold tracking-wider pb-10">Editar datos del paciente</legend>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="names" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres </label>
                    <TextInput
                        type="text"
                        id="names"
                        name="names"
                        minLength={3}
                        maxLength={255}
                        value={patientForm.nombres}
                        className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        disabled />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                    <TextInput
                        id="last_name"
                        name="last_name"
                        minLength={3}
                        maxLength={255}
                        value={patientForm.apellidoPaterno + ' ' + patientForm.apellidoMaterno}
                        className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        disabled />
                </div>

                {/* Campos editables */}
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electronico</label>
                    <TextInput
                        id="email"
                        name="email"
                        minLength={3}
                        maxLength={255}
                        value={patientForm.correo}
                        onChange={(event) =>
                            setPatientForm({
                                ...patientForm,
                                correo: event.target.value
                            })}
                        className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
                    <TextInput
                        id="phone"
                        name="phone"
                        minLength={9}
                        maxLength={9}
                        value={patientForm.telefono}
                        onChange={(event) =>
                            setPatientForm({
                                ...patientForm,
                                telefono: event.target.value
                            })
                        }
                        className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        disabled={!isEditing}
                        required />
                </div>


            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Direccion</label>
                <TextInput
                    type="text"
                    id="address"
                    name="address"
                    minLength={3}
                    maxLength={255}
                    value={patientForm.direccion}
                    onChange={(event) =>
                        setPatientForm({
                            ...patientForm,
                            direccion: event.target.value
                        })}
                    className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled={!isEditing}
                    required />
            </div>


            <div className="my-4 px-16 justify-end flex">
                <button type="button"
                    className="mr-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cancelar
                </button>

                {isEditing ? (
                    <button
                        type="submit"
                        className="mr-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Guardar
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setIsEditing(true)
                        }}
                        className="mr-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Modificar
                    </button>
                )}
            </div>
        </form>




    )
}

export default EditPatientData