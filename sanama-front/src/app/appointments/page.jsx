"use client";

import { useEffect, useState } from "react";
import AppointmentTable from "./AppointmentTable";
import { appointmentService } from "@/services/appointmentService";
import { parseAppointmentTable } from "@/util/appointmentParser";
import Link from "next/link";
import SearchBar from "@/components/bars/SearchBar";
import DateRangePicker from "@/components/Date/DateRangePicker";
import DropdownCheckbox from "@/components/Dropdowns/DropdownCheckbox";
import { format } from "date-fns";
import AppointmentIcon from "@/components/icons/AppointmentIcon";
import TitleWithIcon from "@/components/TitleWithIcon";
import { useRouter } from "next/navigation";

const initialRequest = {
  pn_id_especialidad: null,
  pv_filtro: "",
  pd_fecha_inicio: null,
  pd_fecha_fin: null,
  arregloEstados: [
    {
      estado: null,
    },
  ],
};

const AppointmentPage = () => {
  const [appointmentTable, setAppointmentTable] = useState([]);
  const router = useRouter();
  const [statusList, setStatusList] = useState([]);
  const [statusState, setStatusState] = useState({});

  const [dateInitial, setDateInitial] = useState(new Date());
  const [dateFinal, setDateFinal] = useState(new Date());

  const fetchStateList = async () => {
    try {
      const data = await appointmentService.listarEstados();
      setStatusList(data);
      let initialValues = {};
      data.forEach((status) => {
        initialValues[status.idValue] = false;
      });
      console.log(initialValues);
      setStatusState(initialValues);
      //console.log(data)
    } catch (error) {
      console.log("No se pudo obtener la lista de estados");
    }
  };

  const fetchData = async (request) => {
    try {
      const data = await appointmentService.listarCitasFiltro(request);
      const tableData = parseAppointmentTable(data);
      setAppointmentTable(tableData);
      //console.log(data);
    } catch (error) {
      console.log("No se pudo obtener la lista de las citas");
    }
  };

  useEffect(() => {
    fetchStateList();
    fetchData(initialRequest);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const filtro = elements.namedItem("search-bar-appointments").value;

    const stateArray = Object.entries(statusState)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        return {
          estado: key,
        };
      });
    //console.log(stateArray)
    const request = {
      pn_id_especialidad: null,
      pv_filtro: filtro,
      pd_fecha_inicio: format(dateInitial, "yyyy-MM-dd"),
      pd_fecha_fin: format(dateFinal, "yyyy-MM-dd"),
      arregloEstados: stateArray,
    };
    fetchData(request);
  };

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Citas"} Icon={AppointmentIcon} />
      <button
        type="submit"
        className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4"
        onClick={() => router.push("/appointments/createAppointment")}
      >
        Buscar
      </button>
      <form
        className="flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-4 md:grid-cols-4"
        onSubmit={handleSubmit}
      >
        <SearchBar
          name={"search-bar-appointments"}
          width={"w-[800px]"}
          placeholderText={"Buscar por nombre del paciente"}
        />
        <DateRangePicker
          dateInitial={dateInitial}
          setDateInitial={setDateInitial}
          dateFinal={dateFinal}
          setDateFinal={setDateFinal}
        />
        <DropdownCheckbox
          text={"Estado"}
          statusList={statusList}
          statusState={statusState}
          setStatusState={setStatusState}
        />
      </form>
      <section className="w-full md:w-fit">
        <AppointmentTable data={appointmentTable}></AppointmentTable>
      </section>
    </section>
  );
};

export default AppointmentPage;
