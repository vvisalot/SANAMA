"use client"
import Calendar from "@/components/Calendar"
import Dropdown from "@/components/bars/Dropdown"
import { doctorService } from "@/services/doctorService"
import { parseDoctorsDropdown } from "@/util/doctorParser"
import { format, parse } from "date-fns"
import { useEffect, useState } from "react"
import ScheduleChip from "./ScheduleChip"
import { TextInput } from "flowbite-react"

const DoctorSchedules = ({ doctorId, setDoctorId, schedule, setSchedule }) => {
    //Para los dropdowns
    const [specialties, setSpecialties] = useState([])
    const [doctors, setDoctors] = useState([])

    //Para el calendario
    const [selectedDate, setSelectedDate] = useState(null)
    const [availableHours, setAvailableHours] = useState([])
    const [selectedHour, setSelectedHour] = useState(null)
    const [disabled, setDisabled] = useState(true)

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
            //console.log(drop)
        } catch (error) {
            console.log("No se pudo obtener el listado de medicos para esta especialidad")
        }
    }

    const fetchAvailableHours = async (date, doctorId) => {
        try {
            const data = await doctorService.buscarHorariosMedicoFecha(date, doctorId)
            console.log(data)
            setAvailableHours(data)
        } catch (error) {
            console.log("No se pudo obtener el listado de medicos para esta especialidad")
        }
    }

    const formatHour = (hour) => {
        try {
            const [hours, minutes, seconds] = hour.split(':')
            if (!hours || !minutes || !seconds) throw new Error('Formato de hora inválido')
            const date = new Date()
            date.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10))
            return format(date, 'HH:mm')
        } catch (error) {
            console.error('Error al formatear la hora:', error)
            return hour // Devuelve la hora original en caso de error
        }
    }


    useEffect(() => {
        fetchSpecialty()
    }, [])

    //Handles insanos
    const handleSpecialityChange = (e) => {
        document.getElementById("dropdown-doctor").value = ""
        setDisabled(true)
        setAvailableHours([])
        setSelectedHour(null)
        setSelectedDate(null)
        fetchDoctors("", e.target.value)
    }

    const handleDoctorChange = (e) => {
        const selectedDoctorId = e.target.value
        setDoctorId({ doctorId: selectedDoctorId })
        //console.log(e.target.value)
        setAvailableHours([])
        setSelectedHour(null)
        setSelectedDate(null)
        if (e.target.value === "") {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    const handleDateClick = (date) => () => {
        //console.log(format(date, 'yyyy-MM-dd'))
        setSelectedDate(date)
        setSchedule({ ...schedule, fecha: format(date, 'yyyy-MM-dd') })
        const selectedDoctor = document.getElementById("dropdown-doctor").value
        //console.log(doctorId)
        fetchAvailableHours(format(date, 'yyyy-MM-dd'), selectedDoctor)

    }

    const handleHourSelect = (hour) => {
        // console.log(hour)
        setSelectedHour(hour)
        setSchedule({ ...schedule, hora: hour })
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
                handleChange={handleSpecialityChange}
            />

            <Dropdown
                data={doctors}
                name={"dropdown-doctor"}
                defaultText={"Selecciona un medico"}
                text={"nombreCompleto"}
                defaultValue={""}
                value={"idPersona"}
                width={"w-[500px]"}
                handleChange={handleDoctorChange}
            />

            <div className="flex">
                <Calendar
                    selectedDate={selectedDate}
                    handleDateClick={handleDateClick}
                    disabled={disabled}
                ></Calendar>

                {/* TODO: QUE NO ME DEJE BUSCAR HORARIOS DEL CALENDARIO CUANDO TODAVIA NO SE HA SELECCIONADO EL DOCTOR Y LA ESPECIALIDAD */}
                <div className="flex flex-wrap pl-10">
                    {availableHours.map((hour, index) => (
                        <ScheduleChip
                            key={index}
                            start={formatHour(hour.horaInicio)}
                            isSelected={selectedHour === hour.horaInicio}
                            onSelect={() => handleHourSelect(hour.horaInicio)}
                        />
                    ))}
                </div>

            </div>

            <div className="flex pl-4 pt-5 items-center w-fit">
                <div className="pt-3 pr-3">
                    <label htmlFor="fechaSeleccionada">
                        Fecha:
                    </label>
                    <TextInput type="text" name="fechaSeleccionada" className=" bg-transparent"
                        id="fechaSeleccionada" value={selectedDate !== null ? format(selectedDate, "yyyy-MM-dd") : ""}
                        disabled />
                </div>

                <div className="pt-3 pl-3">
                    <label htmlFor="horaSeleccionada">
                        Hora:
                    </label>
                    <TextInput type="text" name="horaSeleccionada" className="bg-transparent"
                        id="horaSeleccionada" value={selectedHour !== null ? selectedHour.substring(0, 5) : ""}
                        disabled />
                </div>

            </div>

        </section>
    )
}

export default DoctorSchedules