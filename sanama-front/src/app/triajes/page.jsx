"use client";
import { useEffect, useState } from "react";
import TriajeTable from "./TriajeTable";
import { parseTriajeTable } from "@/util/triajeParser";
import SearchBar from "@/components/bars/SearchBar";
import { triajeService } from "@/services/triajeService";
import TitleWithIcon from "@/components/TitleWithIcon";
import TriageIcon from "@/components/icons/TriageIcon";

const TriajePage = () => {
  const [triajeTable, setTriajeTable] = useState([]);
  const [filtro, setFiltro] = useState("");

  const fetchData = async (filtro, fechaDesde, fechaHasta) => {
    try {
      const addHours = (dateStr, hoursToAdd) => {
        let date = new Date(dateStr);
        date.setHours(date.getHours() + hoursToAdd);

        // Formatear de vuelta al formato original
        let dd = String(date.getDate()).padStart(2, "0");
        let mm = String(date.getMonth() + 1).padStart(2, "0"); // Enero es 0!
        let yyyy = date.getFullYear();
        let hh = String(date.getHours()).padStart(2, "0");
        let min = String(date.getMinutes()).padStart(2, "0");
        let ss = String(date.getSeconds()).padStart(2, "0");

        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`; // Esto asume que tu formato es "YYYY-MM-DD HH:mm:ss"
      };

      const fechaDesdeToSend = fechaDesde ? addHours(fechaDesde, 15) : null;
      const fechaHastaToSend = fechaHasta ? addHours(fechaHasta, 15) : null;

      const data = await triajeService.listarTriajePorFiltro(
        filtro,
        fechaDesdeToSend,
        fechaHastaToSend
      );
      console.log(data);
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
    const fechaDesde = elements.namedItem("fechaDesde").value;
    const fechaHasta = elements.namedItem("fechaHasta").value;
    fetchData(filtro, fechaDesde, fechaHasta);
  };

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Triaje"} Icon={TriageIcon} />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-start items-center">
          <div className="ml-4">
            <label htmlFor="fechaDesde" className="mr-2">
              Desde:
            </label>
            <input type="date" name="fechaDesde" id="fechaDesde" />
          </div>
          <div className="ml-4">
            <label htmlFor="fechaHasta" className="mr-2">
              Hasta:
            </label>
            <input type="date" name="fechaHasta" id="fechaHasta" />
          </div>

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
