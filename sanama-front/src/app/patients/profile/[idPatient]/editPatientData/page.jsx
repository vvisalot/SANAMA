"use client"

import usePatientForm from "@/hooks/usePatientForm"
import { patientService } from "@/services/patientService"
import { TextInput } from "flowbite-react"
import { useEffect } from "react"

const EditPatientData = ({ params }) => {
    //console.log(params.idPatient)

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


    useEffect(() => {
        if (params.idPatient !== null) {
            fetchData(params.idPatient)
        }
    }, [params.idPatient])

    return (
        <form className="p-20">
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
                        placeholder="" disabled />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                    <TextInput
                        type="text"
                        id="last_name"
                        name="last_name"
                        minLength={3}
                        maxLength={255}
                        value={patientForm.apellidoPaterno + ' ' + patientForm.apellidoMaterno}
                        className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" disabled />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electronico</label>
                    <TextInput
                        type="email"
                        id="email"
                        name="email"
                        minLength={3}
                        maxLength={255}
                        value={patientForm.correo}
                        className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
                    <TextInput
                        type="tel"
                        id="phone"
                        name="phone"
                        minLength={9}
                        maxLength={9}
                        value={patientForm.telefono}
                        className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
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
                    className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required />
            </div>

            <div className="justify-end flex">
                <button type="submit"
                    className="mr-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cancelar
                </button>
                <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Guardar
                </button>
            </div>

        </form>

    )
}

export default EditPatientData