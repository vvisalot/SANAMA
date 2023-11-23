"use client"
import DatePicker from "@/components/Date/DatePicker"
import useDoctorData from "@/hooks/useDoctorData"
import { doctorService } from "@/services/doctorService"
import { sexParser } from "@/util/patientParser"
import { parse } from "date-fns"
import { TextInput } from "flowbite-react"
import { useEffect } from "react"
import { toast } from "sonner"

const ModificarDoctor = ({ params }) => {
    const idDoctor = params.idDoctor
    console.log(idDoctor)
    const { doctorData, setDoctorData } = useDoctorData()

    //Servicio hecho pal pico, te manda un arreglo en vez de solo a un wn
    const fetchDoctorData = async (idDoctor) => {
        try {
            const data = await doctorService.buscarPorNombre(idDoctor)
            const doctor = data[0] //hence this
            console.log(doctor)
            setDoctorData({
                apellidoPaterno: doctor.apellidoPaterno,
                apellidoMaterno: doctor.apellidoMaterno,
                nombres: doctor.nombres,
                dni: doctor.dni,
                fechaNacimiento: doctor.fechaNacimiento,
                sexo: sexParser(doctor.sexo),
                telefono: doctor.telefono,
                correo: doctor.correoElectronico,
                area: doctor.area,
                cmp: doctor.cmp,
                especialidad: doctor.especialidad.nombre,
                fotoPerfil: `data:image/png;base64,${doctor.foto}`
            })

        } catch (error) {
            console.log(error)
            toast.error("Error al buscar los datos del doctor")
        }
    }


    const putData = async (data) => {
        try {
            const response = await doctorService.modificarDoctor(data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const partes = doctorData.fotoPerfil.split("data:image/")[1].split(";base64,")
        const base64Data = partes[1]

        const dataToUpdate = {
            "idPersona": idDoctor,
            "telefono": doctorData.telefono,
            "correoElectronico": doctorData.correo,
            "foto": base64Data
        }
        putData(dataToUpdate)
    }

    const handleCancel = (e) => {
        console.log("A")
    }
    const handleImagenChange = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        const fileName = file.name
        const fileExtension = fileName.split('.').pop().toLowerCase();;
        if (fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "jpg") {
            if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    const imageData = reader.result
                    setDoctorData((prev) => ({
                        ...prev,
                        fotoPerfil: imageData
                    }))
                }
                reader.readAsDataURL(file)
            }
        } else {
            toast.error(`No se permite imagen con extensión .${fileExtension}. Por favor usar imágenes con extensión .jpg, .jpeg o .png.`)
        }
    }

    useEffect(() => {
        fetchDoctorData(idDoctor)
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-4xl w-full py-10 font-semibold">Modificar datos del doctor</h1>
            <div className="flex ">
                <div className="w-2/3">
                    <div className="grid grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="dniMedico" className="text-gray-500">
                                DNI
                            </label>
                            <TextInput
                                type="text"
                                name="dni"
                                id="dni"
                                value={doctorData.dni}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                                disabled
                            />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-gray-500">
                                CMP
                            </label>

                            <TextInput
                                type="text"
                                name="cmp-doctor"
                                id="cmp-doctor"
                                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                                value={doctorData.cmp} //Pendiente: Parsear esto.
                                disabled
                            />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-gray-500">
                                Fecha de nacimiento
                            </label>

                            <TextInput
                                type="text"
                                name="fecha-nacimiento"
                                id="fecha-nacimiento"
                                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                                value={doctorData.fechaNacimiento} //Pendiente: Parsear esto.
                                disabled
                            />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-gray-500">
                                Sexo
                            </label>

                            <TextInput
                                type="text"
                                name="sexo-doctor"
                                id="sexo-doctor"
                                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                                value={doctorData.sexo} //Pendiente: Parsear esto.
                                disabled
                            />
                        </div>


                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-gray-500">
                                Especialidad
                            </label>

                            <TextInput
                                type="text"
                                name="especialidad-doctor"
                                id="especialidad-doctor"
                                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                                value={doctorData.especialidad} //Pendiente: Parsear esto.
                                disabled
                            />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-gray-500">
                                Area
                            </label>

                            <TextInput
                                type="text"
                                name="area-doctor"
                                id="area-doctor"
                                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                                value={doctorData.area} //Pendiente: Parsear esto.
                                disabled
                            />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-gray-500">
                                Correo electrónico
                            </label>
                            <TextInput
                                type="text"
                                name="correo"
                                minLength={3}
                                maxLength={255}
                                id="correo"
                                autoComplete="off"
                                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                                value={doctorData.correo}
                                //PENDIENTE: HANDLE DISABLED PQ AL INICIO NO DEBERIA
                                onChange={(event) => setDoctorData((prev) => ({
                                    ...prev,
                                    correo: event.target.value
                                }))}
                            />
                        </div>


                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-gray-500">
                                Teléfono
                            </label>
                            <TextInput
                                type="text"
                                name="telefono"
                                minLength={3}
                                maxLength={9}
                                id="telefono"
                                autoComplete="off"
                                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                                placeholder=" "
                                value={doctorData.telefono}
                                onChange={(event) => setDoctorData((prev) => ({
                                    ...prev,
                                    telefono: event.target.value
                                }))}
                                required
                            />
                        </div>
                    </div>
                </div>



                <div className="w-1/3 flex flex-col items-center">
                    <label htmlFor="fotoPerfil" className=" text-gray-500 text-3xl font-bold">
                        {doctorData.nombres} {doctorData.apellidoPaterno} {doctorData.apellidoMaterno}
                    </label>

                    <div className="py-10">
                        <img
                            src={doctorData.fotoPerfil}
                            aria-label="Foto de perfil del doctor"
                            className="rounded-full w-60 h-60 object-cover"
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        id="fotoPerfil"
                        onChange={handleImagenChange}
                        className="block w-fit text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none" // Agregamos mx-auto para centrar horizontalmente
                    />
                    <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG.</p>
                </div>
            </div >

            <button type="button" onClick={handleCancel}>
                Cancelar
            </button>
            <button type="submit" >
                Registrar datos
            </button>
        </form>
    )
}

export default ModificarDoctor