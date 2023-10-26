"use client"
import Calendar from "@/components/Calendar"
import Dropdown from "@/components/bars/Dropdown"
import { doctorService } from "@/services/doctorService"
import { parseDoctorsDropdown } from "@/util/doctorParser"
import { format, set } from "date-fns"
import { useEffect, useState } from "react"

const DoctorSchedules = () => {
    //Para los dropdowns
    const [specialties, setSpecialties] = useState([])
    const [doctors, setDoctors] = useState([])

    //Para el calendario
    const [selectedDate, setSelectedDate] = useState(new Date())

    const fetchSpecialty = async () => {
        try {
            const data = await doctorService.listarEspecialidades()
            //console.log(data)
            setSpecialties(data)
        } catch (error) {
            console.log("No se pudo obtener el listado de especialidades")
        }
    }

    const fetchDoctors = async (filtro, especialidad) => {
        try {
            const data = await doctorService.buscarPorMedicoEspecialidad(filtro, especialidad)
            const drop = parseDoctorsDropdown(data)
            setDoctors(drop)
            console.log(drop)
        } catch (error) {
            console.log("No se pudo obtener el listado de medicos para esta especialidad")
        }
    }

    const fetchAvailableHours = async (date, doctorId) => {
        try {
            const data = await doctorService.buscarHorariosMedicoFecha(date, doctorId)
            console.log(data)
        } catch (error) {
            console.log("No se pudo obtener el listado de medicos para esta especialidad")
        }
    }

    useEffect(() => {
        fetchSpecialty()
    }, [])

    const handleDropdownChange = (e) => {
        document.getElementById("dropdown-doctor").value = ""
        fetchDoctors("", e.target.value)
    }


    //Pasar por props
    const createHandleDateClick = (date) => () => {
        console.log(format(date, 'yyyy-MM-dd'))
        setSelectedDate(date)
        const doctorId = document.getElementById("dropdown-doctor").value
        console.log(doctorId)
        fetchAvailableHours(format(date, 'yyyy-MM-dd'), doctorId)

        // Con la fecha y la especialidad obtener los horarios
        // [   
        //     {         
        //         "idDoctor": 1,
        //         "nombre": "Jose Pipa",
        //         "horarios":[
        //             "10:00",
        //             "11:00"
        //         ]
        //     },
        //     {
        //         "idDoctor": 2,
        //         "nombre": "Pablo Popa",
        //         "horarios":[
        //             "11:00",
        //             "12:00",
        //             "13:00"
        //         ],
        //     }
        // ]
    }



    return (
        <section id='section3' className="mt-6 bg-transparent">
            <h2 className="font-sans font-bold break-normal text-gray-700 mb-4 text-2xl">
                Medicos y horarios disponibles
            </h2>

            <Dropdown
                data={specialties}
                name={"dropdown-specialty"}
                defaultText={"Selecciona una especialidad"}
                text={"nombre"}
                defaultValue={""}
                value={"nombre"}
                width={"w-[500px]"}
                handleChange={handleDropdownChange}
            />

            <Dropdown
                data={doctors}
                name={"dropdown-doctor"}
                defaultText={"Selecciona un medico"}
                text={"nombreCompleto"}
                defaultValue={""}
                value={"idPersona"}
                width={"w-[500px]"}
                handleChange={() => { }}
            />
            <Calendar
                selectedDate={selectedDate}
                createHandleDateClick={createHandleDateClick}
            ></Calendar>



        </section>
    )
}

export default DoctorSchedules