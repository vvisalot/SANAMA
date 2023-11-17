"use client";
import { useEffect, useState } from "react";
import TriajeTable from "./TriajeTable";
import { parseTriajeTable } from "@/util/triajeParser";
import SearchBar from "@/components/bars/SearchBar";
import { triajeService } from "@/services/triajeService";
import TitleWithIcon from "@/components/TitleWithIcon";
import TriageIcon from "@/components/icons/TriageIcon";
import DateRangePicker from "@/components/Date/DateRangePicker";
import DropdownCheckbox from "@/components/Dropdowns/DropdownCheckbox";
import { laboratoryService } from "@/services/laboratoryService";
import { format } from "date-fns";

const TriajePage = () => {
  const [triajeTable, setTriajeTable] = useState([]);
  const [dateInitial, setDateInitial] = useState(null);
  const [dateFinal, setDateFinal] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const [statusState, setStatusState] = useState({});
  const initialRequest = {
    pn_id_triaje: null,
    pv_filtro: "",
    pd_fecha_inicio: null,
    pd_fecha_fin: null,
    arregloEstados: [
      {
        estado: null,
      },
    ],
  };

  const fetchData = async (request) => {
    try {
      const data = await triajeService.listarTriajePorFiltro(request);
      const tableData = parseTriajeTable(data);
      setTriajeTable(tableData);
    } catch (error) {
      console.log("No se pudo obtener los datos de los triajes");
    }
  };

  const fetchStateList = async () => {
    try {
      const data = await laboratoryService.listarEstadosOrdenesLaboratorio();
      setStatusList(data);
      let initialValues = {};
      data.forEach((status) => {
        initialValues[status.idValue] = false;
      });
      console.log(initialValues);
      setStatusState(initialValues);
    } catch (error) {
      console.log("No se pudo obtener la lista de estados");
    }
  };

  useEffect(() => {
    fetchStateList();
    fetchData(initialRequest);
  }, []);

  const handleSubmit = async (e) => {
    const stateArray = Object.entries(statusState)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        return {
          estado: key,
        };
      });
    e.preventDefault();
    const elements = e.target.elements;
    const filtro = elements.namedItem("patients-search").value;
    const fechaDesde = dateInitial ? format(dateInitial, "yyyy-MM-dd") : null;
    const fechaHasta = dateFinal ? format(dateFinal, "yyyy-MM-dd") : null;
    const request = {
      pn_id_triaje: null,
      pv_filtro: filtro,
      pd_fecha_inicio: fechaDesde,
      pd_fecha_fin: fechaHasta,
      arregloEstados: stateArray,
    };
    fetchData(request);
  };

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Triajes"} Icon={TriageIcon} />
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-start items-center">
          <SearchBar
            name={"patients-search"}
            width={"flex-grow"}
            placeholderText="Buscar por Nombre, DNI o Código del Triaje"
          />

          <DropdownCheckbox
            text={"Estado"}
            statusList={statusList}
            statusState={statusState}
            setStatusState={setStatusState}
          />

          <DateRangePicker
            dateInitial={dateInitial}
            setDateInitial={setDateInitial}
            dateFinal={dateFinal}
            setDateFinal={setDateFinal}
          />

          <button
            type="submit"
            className="ml-2 text-white bg-[#28539E] hover:bg-primary-dusk-blue focus:ring-4 focus:outline-none focus:ring-primary-light-periwinkle font-medium rounded-lg text-sm px-4 py-2.5"
          >
            Buscar
          </button>
        </div>
      </form>
      <div
        style={{ marginBottom: "1rem", color: "black" }}
        className="pl-12 pr-14 mt-2 mb-8"
      >
        Número de resultados: {triajeTable.length}
      </div>
      <section>
        <TriajeTable data={triajeTable}></TriajeTable>
      </section>
    </section>
  );
};

export default TriajePage;
