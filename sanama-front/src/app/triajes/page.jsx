"use client";
import { useEffect, useState } from "react";
import TriajeTable from "./TriajeTable";
import { parseTriajeTable } from "@/util/triajeParser";
import SearchBar from "@/components/bars/SearchBar";
import { triajeService } from "@/services/triajeService";
import TitleWithIcon from "@/components/TitleWithIcon";
import TriageIcon from "@/components/icons/TriageIcon";
import DateRangePicker from "@/components/Date/DateRangePicker"
import { format } from "date-fns"

const TriajePage = () => {
  const [triajeTable, setTriajeTable] = useState([]);
  const [dateInitial, setDateInitial] = useState(null);
  const [dateFinal, setDateFinal] = useState(null);

  const fetchData = async (filtro, fechaDesde, fechaHasta) => {
    try {
      const data = await triajeService.listarTriajePorFiltro(
        filtro,
        fechaDesde,
        fechaHasta
      );
      const tableData = parseTriajeTable(data);
      setTriajeTable(tableData);
    } catch (error) {
      console.log("No se pudo obtener los datos de los triajes");
    }
  };

  useEffect(() => {
    fetchData("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const filtro = elements.namedItem("patients-search").value;
    const fechaDesde = dateInitial ? format(dateInitial, "yyyy-MM-dd") : null;
    const fechaHasta = dateFinal ? format(dateFinal, "yyyy-MM-dd") : null;
    fetchData(filtro, fechaDesde, fechaHasta);
  };

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Triaje"} Icon={TriageIcon} />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-start items-center">
          
          <DateRangePicker
            dateInitial={dateInitial}
            setDateInitial={setDateInitial}
            dateFinal={dateFinal}
            setDateFinal={setDateFinal}
          />

          <SearchBar
            name={"patients-search"}
            width={"flex-grow"}
            placeholderText="Buscar por Nombre o DNI"
          />
        </div>
      </form>
      <div
        style={{ marginBottom: "1rem", color: "black" }}
        className="pl-12 pr-14"
      >
        Número de resultados: {triajeTable.length}
      </div>
      <section className="pl-4 pr-2">
        <TriajeTable data={triajeTable}></TriajeTable>
      </section>
    </section>
  );
};

export default TriajePage;
