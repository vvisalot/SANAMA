"use client"
import DatePicker from "@/components/buttons/DatePicker"
import Picker from "@/components/buttons/Picker"
import { useState, useEffect } from 'react'
import { validateNumberInput, validateSecurityCode, validateTextInput } from "@/util/formValidations"
import SearchPatientModal from "./SearchPatientModal"
import { TextInput } from "flowbite-react"
import { patientService } from "@/services/patientService"
import { sexParser } from "@/util/patientParser"
const PatientForm = ({ formComplete, setFormComplete, patientId, setPatientId, patientForm, fechaNacimiento, setFechaNacimiento, sexo, setSexo, setPatientForm }) => {
    const [errorMessage, setErrorMessage] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [isFormEnabled, setIsFormEnabled] = useState(false)
    const [cancelButton, setCancelButton] = useState(false)
    const [obtainedPatientId, setObtainedPatientId] = useState("")

    const validateForm = () => {
        const patientFormValues = Object.values(patientForm)
        if (patientFormValues.includes("") || !fechaNacimiento || !sexo) {
            setErrorMessage("Todos los campos deben estar llenos")
        } else {
            setErrorMessage("")
            setFormComplete(true)
        }
    }


    const handleRegister = () => {
        if (!isFormEnabled) {
            // Habilitar el formulario y cambiar el texto y color del botón
            setIsFormEnabled(true)
            setCancelButton(true)
        } else {
            // Deshabilitar el formulario y cambiar el texto y color del botón
            setIsFormEnabled(false)
            setCancelButton(false)
        }
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handlePatientSelect = (selectedPatient) => {
        console.log('Paciente seleccionado:', selectedPatient.idPersona)
        setObtainedPatientId(selectedPatient.idPersona)
    }


    const fetchData = async (filtro) => {
        try {
            const data = await patientService.buscarPacienteModal(filtro)
            setPatientForm({
                ...patientForm,
                apellidoPaterno: data.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno,
                nombres: data.nombres,
                tipoSeguro: data.tipoSeguro,
                codigoSeguro: data.codigoSeguro,
                dni: data.dni,
                direccion: data.direccion,
                telefono: data.telefono,
            })
            setFechaNacimiento(data.fechaNacimiento)
            setSexo(sexParser(data.sexo))
            // console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        console.log(obtainedPatientId)
        if (obtainedPatientId) {
            fetchData(obtainedPatientId)
        }
    }, [obtainedPatientId])



    return (
        <section id='section1'>
            <div className="pb-8 flex justify-between items-center">
                <h2 className="font-sans font-bold break-normal text-gray-700  text-2xl">Informacion del paciente</h2>
                <div>
                    <button
                        type="button"
                        onClick={handleRegister}
                        className={`m-2 text-white ${cancelButton ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-400 hover:bg-orange-500'
                            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center`}
                    >
                        {cancelButton ? 'Cancelar' : 'Nuevo paciente'}
                    </button>
                    <button
                        type="button"
                        disabled={isFormEnabled}
                        onClick={handleOpenModal}
                        className={`m-2 text-white ${isFormEnabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center ${isFormEnabled ? 'text-gray-700' : '' // Color apagado cuando está deshabilitado
                            }`}
                    >Buscar paciente
                    </button>
                </div>

                <SearchPatientModal
                    show={showModal}
                    onClose={handleCloseModal}
                    onSelect={handlePatientSelect} />
            </div>

            <fieldset disabled={!isFormEnabled}>
                <legend></legend>

                <div className="grid grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <TextInput
                            type="text"
                            name="first_last_name"
                            id="first_last_name"
                            minLength={3}
                            maxLength={255}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
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
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                            Apellido paterno
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <TextInput type="text"
                            name="second_last_name"
                            id="second_last_name"
                            minLength={3}
                            maxLength={255}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
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
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                            Apellido materno
                        </label>
                    </div>

                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <TextInput
                        type="text"
                        name="names"
                        id="names"
                        minLength={3}
                        maxLength={255}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
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
                        <TextInput
                            type="text"
                            minLength={3}
                            maxLength={255}
                            name="tipo_seguro"
                            id="tipo_seguro"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
                            placeholder=" "
                            value={patientForm.tipoSeguro}
                            onChange={(event) =>
                                setPatientForm({
                                    ...patientForm,
                                    tipoSeguro: event.target.value
                                })}
                            required />
                        <label htmlFor="tipo_seguro"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Tipo seguro
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <TextInput type="text"
                            name="security_number"
                            id="security_number"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
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
                        <label htmlFor="security_number"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Codigo seguro
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <TextInput
                            type="text"
                            name="dni"
                            id="dni"
                            minLength={3}
                            maxLength={8}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
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
                        <label htmlFor="dni"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            DNI
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <TextInput type="text"
                            name="address"
                            id="address"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                            placeholder=" "
                            autoComplete="off"
                            value={patientForm.direccion}
                            onChange={(event) => setPatientForm({
                                ...patientForm,
                                direccion: event.target.value
                            })}
                            required />
                        <label htmlFor="address"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 ">
                            Direccion
                        </label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <TextInput type="text"
                        name="phone"
                        minLength={3}
                        maxLength={9}
                        id="phone"
                        autoComplete="off"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
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
                    <label htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">
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
            </fieldset>

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