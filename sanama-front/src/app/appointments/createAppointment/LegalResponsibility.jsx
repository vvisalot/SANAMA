"use client"

import Dropdown from "@/components/bars/Dropdown"
import DatePicker from "@/components/buttons/DatePicker"
import PickerHider from "@/components/buttons/PickerHider"
import { patientService } from "@/services/patientService"
import { validateNumberInput, validateTextInput } from "@/util/formValidations"
import { TextInput } from "flowbite-react"
import { useState, useEffect } from "react"

const LegalResponsibility = ({ legalResponsibilityForm, setLegalResponsibilityForm }) => {
    const [relationships, setRelationships] = useState([])

    const handleResponsibilityChange = (option) => {
        if (option === 'No') {
            setLegalResponsibilityForm({
                tieneAcompañante: 'No',
                nombres: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                dni: '',
                parentesco: '',
            })
        } else {
            setLegalResponsibilityForm(prev => ({
                ...prev,
                tieneAcompañante: option,
            }))
        }
    }


    const fetchRelationships = async () => {
        try {
            const data = await patientService.listarParentescos()
            console.log(data)
            setRelationships(data)
        } catch (error) {
            console.log("No se pudo obtener el listado de parentescos")
        }
    }

    useEffect(() => {
        fetchRelationships()
    }, [])



    return (

        <section id="section2">
            <h2 className="w-full font-bold break-normal text-gray-700  pb-8 text-2xl">Revision de responsabilidad legal</h2>
            <PickerHider
                text={"¿El paciente es responsable legal?"}
                option1={"Si"} option2={"No"}
                onOptionSelected={handleResponsibilityChange}
                optionSelected={legalResponsibilityForm.tieneAcompañante} />

            {legalResponsibilityForm.tieneAcompañante === "Si" ? <>
                <div className="grid grid-cols-2 ">
                    <div className="relative z-0 w-full pr-6 mb-6 group">
                        <TextInput
                            type="text"
                            name="r_first_name"
                            id="r_first_name"
                            value={legalResponsibilityForm.apellidoPaterno}
                            onChange={(event) => {
                                validateTextInput(event.target)
                                setLegalResponsibilityForm((prev) => ({
                                    ...prev,
                                    apellidoPaterno: event.target.value,
                                }))
                            }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                            placeholder=" " required />
                        <label
                            htmlFor="r_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido paterno
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <TextInput
                            type="text"
                            name="floating_last_name"
                            id="floating_last_name"
                            value={legalResponsibilityForm.apellidoMaterno}
                            onChange={(event) => {
                                validateTextInput(event.target)
                                setLegalResponsibilityForm((prev) => ({
                                    ...prev,
                                    apellidoMaterno: event.target.value,
                                }))
                            }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label
                            htmlFor="floating_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido materno
                        </label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <TextInput
                        type="text"
                        name="floating_name"
                        id="floating_name"
                        value={legalResponsibilityForm.nombres}
                        onChange={(event) => {
                            validateTextInput(event.target)
                            setLegalResponsibilityForm((prev) => ({
                                ...prev,
                                nombres: event.target.value,
                            }))
                        }}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none   "
                        placeholder=" " required />
                    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Nombres
                    </label>
                </div>

                <div className="grid grid-cols-2 items-center">
                    <div className="relative z-0 w-full mb-6 pr-6 group">
                        <TextInput
                            type="text"
                            name="floating_dni"
                            id="floating_dni"
                            maxLength={8}
                            minLength={8}
                            value={legalResponsibilityForm.dni}
                            onChange={(event) => {
                                validateNumberInput(event.target)
                                setLegalResponsibilityForm((prev) => ({
                                    ...prev,
                                    dni: event.target.value,
                                }))
                            }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none   "
                            placeholder=" " required />
                        <label htmlFor="floating_dni"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            DNI
                        </label>
                    </div>


                    <div className="relative z-0 w-full mb-6 group">
                        {/* <TextInput
                            type="text"
                            name="floating_relationship"
                            id="floating_relationship"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none   "
                            value={legalResponsibilityForm.parentesco}
                            onChange={(event) => {
                                validateTextInput(event.target)
                                setLegalResponsibilityForm((prev) => ({
                                    ...prev,
                                    parentesco: event.target.value,
                                }))
                            }}
                            placeholder=" " required /> */}
                        <Dropdown
                            data={relationships}
                            name={"dropdown-parentesco"}
                            defaultText={"Elegir la relacion con el paciente"}
                            text={"descripcion"}
                            defaultValue={""}
                            width={"w-fit"}
                            value={legalResponsibilityForm.parentesco}
                            handleChange={(event) => {
                                setLegalResponsibilityForm((prev) => ({
                                    ...prev,
                                    parentesco: event.target.value,
                                }))
                            }}
                        />
                        <label htmlFor="floating_relationship"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Parentesco
                        </label>
                    </div>
                </div>
            </> : null}


        </section>
    )
}

export default LegalResponsibility