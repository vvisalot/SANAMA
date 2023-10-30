"use client"
import DatePicker from "@/components/buttons/DatePicker"
import Picker from "@/components/buttons/Picker"
import useAppointmentForm from "@/hooks/useAppointmentForm"

const PatientForm = () => {
    const { patientForm, setPatientForm, fechaNacimiento, setFechaNacimiento, sexo, setSexo } = useAppointmentForm()


    return (
        <section id='section1'>
            <h2 className="font-sans font-bold break-normal text-gray-700  pb-8 text-2xl">Informacion del paciente</h2>
            <div className="grid grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="first_last_name"
                        id="first_last_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={patientForm.apellidoPaterno}
                        //TODO LO MISMO PARA LOS DEMAS INPUTS
                        onChange={(event) => setPatientForm((prev) => ({
                            ...prev,
                            apellidoPaterno: event.target.value,
                        }))}

                        required />
                    <label htmlFor="first_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Apellido paterno
                    </label>
                </div>
                {/* <div className="relative z-0 w-full mb-6 group">
                    <input type="text"
                        name="second_last_name"
                        id="second_last_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={patientForm.apellidoMaterno}
                        onChange={(event) => setPatientForm({
                            ...patientForm,
                            apellidoMaterno: event.target.value

                        })}
                        required />
                    <label htmlFor="second_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Apellido materno
                    </label>
                </div> */}

            </div>
            {/* <div className="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="names"
                    id="names"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={patientForm.nombres}
                    onChange={(event) => setPatientForm({
                        ...patientForm,
                        nombres: event.target.value
                    })}
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
                        name="first_last_name"
                        id="first_last_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={patientForm.tipoSeguro}
                        onChange={(event) => setPatientForm({
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
                        value={patientForm.codigoSeguro}
                        onChange={(event) => setPatientForm({
                            ...patientForm,
                            codigoSeguro: event.target.value
                        })}
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={patientForm.dni}
                        onChange={(event) => setPatientForm({
                            ...patientForm,
                            dni: event.target.value
                        })}
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
            </div> */}

            {/* 

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
            </div> */}
        </section >
    )
}

export default PatientForm