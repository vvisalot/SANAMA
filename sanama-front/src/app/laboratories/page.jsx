"use client";
import { useEffect, useState } from "react";
import LaboratoryTable from "./LaboratoryTable";
import { parseLaboratoryTable } from "@/util/laboratoryParser";
import SearchBar from "@/components/bars/SearchBar";
import { laboratoryService } from "@/services/laboratoryService";
import TitleWithIcon from "@/components/TitleWithIcon";
import LabIcon from "@/components/icons/LabIcon";
import DateRangePicker from "@/components/Date/DateRangePicker"
import { format } from "date-fns"

const LaboratoryPage = () => {
  const [laboratoryTable, setLaboratoryTable] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [dateInitial, setDateInitial] = useState(null);
  const [dateFinal, setDateFinal] = useState(null);

  const fetchData = async (filtro, fechaDesde, fechaHasta) => {
    try {
      const data = await laboratoryService.listarOrdenLaboratorioPorFiltro(
        filtro,
        fechaDesde,
        fechaHasta
      );
      const tableData = parseLaboratoryTable(data);
      setLaboratoryTable(tableData);
    } catch (error) {
      console.error("No se pudo obtener los datos de los laboratorios", error);
    }
  };

  useEffect(() => {
    fetchData(filtro, null, null);
  }, [filtro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    setFiltro(elements.namedItem("patients-search").value);
    const fechaDesde = dateInitial ? format(dateInitial, "yyyy-MM-dd") : null;
    const fechaHasta = dateFinal ? format(dateFinal, "yyyy-MM-dd") : null;
    fetchData(filtro, fechaDesde, fechaHasta);
  };

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Laboratorio"} Icon={LabIcon} />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-start items-center">

        <SearchBar
            name={"patients-search"}
            width={"flex-grow"}
            placeholderText="Buscar por Nombre o DNI"
          />

          <DateRangePicker
            dateInitial={dateInitial}
            setDateInitial={setDateInitial}
            dateFinal={dateFinal}
            setDateFinal={setDateFinal}
          />
        </div>
      </form>
      <div
        style={{ marginBottom: "1rem", color: "black" }}
        className="pl-12 pr-14 mt-2"
      >
        Número de resultados: {laboratoryTable.length}
      </div>
      <section>
        <LaboratoryTable data={laboratoryTable}></LaboratoryTable>
      </section>
    </section>
  );
};

export default LaboratoryPage;
