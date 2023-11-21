"use client";
import { useEffect, useState, useCallback } from "react";
import { appointmentService } from "@/services/appointmentService";
import { doctorService } from "@/services/doctorService";
import AppointmentTable from "@/components/appointments/AppointmentTable";
import { parseAppointmentTable } from "@/util/appointmentParser";
import SearchBar from "@/components/bars/SearchBar";
import DateRangePicker from "@/components/Date/DateRangePicker";
import DropdownCheckbox from "@/components/Dropdowns/DropdownCheckbox";
import AppointmentIcon from "@/components/icons/AppointmentIcon";
import TitleWithIcon from "@/components/TitleWithIcon";
import Dropdown from "@/components/Dropdowns/Dropdown";
import { format } from "date-fns";
import Link from "next/link";

const initialRequest = {
  pn_id_especialidad: null,
  pv_filtro: "",
  pd_fecha_inicio: null,
  pd_fecha_fin: null,
  arregloEstados: [],
};

const AppointmentPage = () => {
  const [appointmentTable, setAppointmentTable] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [statusState, setStatusState] = useState({});
  const [dateInitial, setDateInitial] = useState(null);
  const [dateFinal, setDateFinal] = useState(null);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(
    "Todas las especialidades"
  );

  const fetchInitialData = useCallback(async () => {
    try {
      const [statusData, specialtyData] = await Promise.all([
        appointmentService.listarEstados(),
        doctorService.listarEspecialidades(),
      ]);

      setStatusList(statusData);
      setSpecialties(specialtyData);

      const statusStateInit = statusData.reduce(
        (acc, status) => ({ ...acc, [status.idValue]: false }),
        {}
      );
      setStatusState(statusStateInit);
    } catch (error) {
      console.error("Error al obtener datos iniciales:", error);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
    fetchData(initialRequest);
  }, [fetchInitialData]);

  const fetchData = async (request) => {
    try {
      const data = await appointmentService.listarCitasFiltro(request);
      const tableData = parseAppointmentTable(data);
      console.log(tableData);
      setAppointmentTable(tableData);
    } catch (error) {
      console.log("No se pudo obtener la lista de las citas");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const filtro = elements.namedItem("search-bar-appointments").value;
    const filtroEspecialidad = elements.namedItem("speciality-dropdown").value;

    const stateArray = Object.entries(statusState)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        return {
          estado: key,
        };
      });

    const request = {
      pn_id_especialidad: filtroEspecialidad ? filtroEspecialidad : null,
      pv_filtro: filtro,
      pd_fecha_inicio: dateInitial ? format(dateInitial, "yyyy-MM-dd") : null,
      pd_fecha_fin: dateFinal ? format(dateFinal, "yyyy-MM-dd") : null,
      arregloEstados: stateArray,
    };
    fetchData(request);
  };

  const options = [
    {
      text: "Ver",
      link: "/appointments",
      icon: "/icons/eye.svg",
    },
  ];

  return (
    <section className="w-full px-14 py-6">
      <section className="flex justify-between items-center">
        <TitleWithIcon name={"Citas"} Icon={AppointmentIcon} />
        <Link
          className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4"
          href="/appointments/createAppointment"
        >
          Crear Nueva Cita
        </Link>
      </section>

      <form className="flex items-center" onSubmit={handleSubmit}>
        <SearchBar
          name={"search-bar-appointments"}
          width={"w-full"}
          placeholderText={"Buscar por Nombre, DNI o Código"}
        />
        <DropdownCheckbox
          text={"Estado"}
          statusList={statusList}
          statusState={statusState}
          setStatusState={setStatusState}
        />
        <Dropdown
          data={specialties}
          defaultText={"Todas las especialidades"}
          text={"nombre"}
          defaultValue={""}
          value={"idEspecialidad"}
          name={"speciality-dropdown"}
          width={"w-[240px]"}
          height={"h-[43px]"}
          handleChange={(event) => {
            setEspecialidadSeleccionada(event.target.value);
          }}
        ></Dropdown>

        <DateRangePicker
          dateInitial={dateInitial}
          setDateInitial={setDateInitial}
          dateFinal={dateFinal}
          setDateFinal={setDateFinal}
        />
        <button
          type="submit"
          className="text-white bg-primary-dark-blue hover:bg-primary-dusk-blue focus:ring-4 focus:outline-none focus:ring-primary-light-periwinkle font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Buscar
        </button>
      </form>

      <section className="w-full">
        <AppointmentTable
          data={appointmentTable}
          options={options}
        ></AppointmentTable>
      </section>
    </section>
  );
};

export default AppointmentPage;
