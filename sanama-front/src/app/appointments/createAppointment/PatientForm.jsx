"use client"
import DatePicker from "@/components/buttons/DatePicker"
import Picker from "@/components/buttons/Picker"
import { useState } from 'react'
import { validateNumberInput, validateSecurityCode, validateTextInput } from "@/util/formValidations"
import AppointementForm from "./AppointementForm"
import useAppointmentForm from "@/hooks/useAppointmentForm"
import SearchPatientModal from "./SearchPatientModal"
const PatientForm = ({ formComplete, setFormComplete, patientForm, fechaNacimiento, setFechaNacimiento, sexo, setSexo, setPatientForm }) => {
    const [errorMessage, setErrorMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const validateForm = () => {
        const patientFormValues = Object.values(patientForm)
        if (patientFormValues.includes("") || !fechaNacimiento || !sexo) {
            setErrorMessage("Todos los campos deben estar llenos")
        } else {
            setErrorMessage("")
            setFormComplete(true)
        }
    }

    return (
        <section id='section1'>
            <div className="pb-8 flex justify-between items-center">
                <h2 className="font-sans font-bold break-normal text-gray-700  text-2xl">Informacion del paciente</h2>
                <button
                    type="button"
                    onClick={handleOpenModal}
                    className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
                >Buscar paciente
                </button>
                <SearchPatientModal show={showModal} onClose={handleCloseModal} />
            </div>

            <div>
                <div className="grid grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="first_last_name"
                            id="first_last_name"
                            minLength={3}
                            maxLength={255}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={patientForm.apellidoPaterno}
                            onChange={(event) => {
                                validateTextInput(event.target)
                                setPatientForm((prev) => ({
                                    ...prev,
                                    apellidoPaterno: event.target.value,
                                }))
                            }}

                            required />
                        <label htmlFor="first_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido paterno
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text"
                            name="second_last_name"
                            id="second_last_name"
                            minLength={3}
                            maxLength={255}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={patientForm.apellidoMaterno}
                            onChange={(event) => {
                                validateTextInput(event.target)
                                setPatientForm({
                                    ...patientForm,
                                    apellidoMaterno: event.target.value

                                })
                            }}
                            required />
                        <label htmlFor="second_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido materno
                        </label>
                    </div>

                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="names"
                        id="names"
                        minLength={3}
                        maxLength={255}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={patientForm.nombres}
                        onChange={(event) => {
                            validateTextInput(event.target)
                            setPatientForm({
                                ...patientForm,
                                nombres: event.target.value
                            })
                        }}
                        required />
                    <label htmlFor="names"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Nombres
                    </label>
                </div>

                <div className="grid grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            minLength={3}
                            maxLength={255}
                            name="first_last_name"
                            id="first_last_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={patientForm.tipoSeguro}
                            onChange={(event) =>
                                setPatientForm({
                                    ...patientForm,
                                    tipoSeguro: event.target.value
                                })}
                            required />
                        <label htmlFor="first_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Tipo seguro
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text"
                            name="second_last_name"
                            id="second_last_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            minLength={3}
                            maxLength={6}
                            value={patientForm.codigoSeguro}
                            onChange={(event) => {
                                validateSecurityCode(event.target)
                                setPatientForm({
                                    ...patientForm,
                                    codigoSeguro: event.target.value
                                })
                            }}
                            required />
                        <label htmlFor="second_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Codigo seguro
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="first_last_name"
                            id="first_last_name"
                            minLength={3}
                            maxLength={8}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={patientForm.dni}
                            onChange={(event) => {
                                validateNumberInput(event.target)
                                setPatientForm({
                                    ...patientForm,
                                    dni: event.target.value
                                })
                            }}
                            required />
                        <label htmlFor="first_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            DNI
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text"
                            name="second_last_name"
                            id="second_last_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={patientForm.direccion}
                            onChange={(event) => setPatientForm({
                                ...patientForm,
                                direccion: event.target.value
                            })}
                            required />
                        <label htmlFor="second_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Direccion
                        </label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="text"
                        name="phone"
                        minLength={3}
                        maxLength={9}
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={patientForm.telefono}
                        onChange={(event) => {
                            validateNumberInput(event.target)
                            setPatientForm({
                                ...patientForm,
                                telefono: event.target.value
                            })
                        }}
                        required />
                    <label htmlFor="second_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Telefono
                    </label>
                </div>


                <div className="grid grid-cols-2 md:gap-6">
                    <DatePicker
                        name={"fecha-nacimiento-paciente"}
                        value={fechaNacimiento}
                        setValue={setFechaNacimiento}
                    />
                    <Picker
                        name1={"masculino"}
                        name2={"femenino"}
                        text={"Elegir genero:"}
                        option1={"Masculino"}
                        option2={"Femenino"}
                        value={sexo}
                        setValue={setSexo}
                    />
                </div>
            </div>


            <hr></hr>

            <div className="flex flex-row-reverse">
                <button
                    type="button"
                    className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center" onClick={validateForm}>Siguiente
                </button>
            </div>


            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section >
    )
}

export default PatientForm