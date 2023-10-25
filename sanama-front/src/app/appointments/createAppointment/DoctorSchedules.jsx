"use client"
import Calendar from "@/components/Calendar"
import Dropdown from "@/components/bars/Dropdown"
import { doctorService } from "@/services/doctorService"
import { useEffect, useState } from "react"

const DoctorSchedules = () => {
    const [specialties, setSpecialties] = useState([])
    const [dropdownValue, setDropdownValue] = useState("")

    const fetchSpecialty = async () => {
        try {
            const data = await doctorService.listarEspecialidades()
            console.log(data)
            setSpecialties(data)
        } catch (error) {
            console.log("No se pudo obtener el listado de especialidades")
        }
    }
    useEffect(() => {
        fetchSpecialty()
    }, [])

    return (
        <section id='section3' className="mt-6 bg-transparent">
            <h2 className="font-sans font-bold break-normal text-gray-700 mb-4 text-2xl">
                Seleccionar medico y horarios disponibles
            </h2>

            <Dropdown
                data={specialties}
                defaultText={"Selecciona una especialidad"}
                text={"nombre"}
                defaultValue={""}
                value={"nombre"}
                setDropdownValue={setDropdownValue}
                width={"w-[500px]"}
            />

            <Calendar></Calendar>



        </section>
    )
}

export default DoctorSchedules