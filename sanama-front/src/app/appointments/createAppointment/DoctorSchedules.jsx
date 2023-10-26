"use client"
import Calendar from "@/components/Calendar"
import Dropdown from "@/components/bars/Dropdown"
import { doctorService } from "@/services/doctorService"
import { parseDoctorsDropdown } from "@/util/doctorParser"
import { set } from "date-fns"
import { useEffect, useState } from "react"

const DoctorSchedules = () => {
    const [specialties, setSpecialties] = useState([])
    const [doctors, setDoctors] = useState([])

    const [dropdownValue, setDropdownValue] = useState("")

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
            console.log(data)
        } catch (error) {
            console.log("No se pudo obtener el listado de medicos para esta especialidad")
        }
    }

    useEffect(() => {
        fetchSpecialty()

    }, [])

    const handleDropdownChange = (e) => {
        fetchDoctors("", e.target.value)
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
                value={"nombreCompleto"}
                width={"w-[500px]"}
                handleChange={() => { }}
            />
            <Calendar></Calendar>



        </section>
    )
}

export default DoctorSchedules