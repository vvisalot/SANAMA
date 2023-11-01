"use client";
import { useEffect, useState } from "react";
import TriajeTable from "./TriajeTable";
import { parseTriajeTable } from "@/util/triajeParser";
import SearchBar from "@/components/bars/SearchBar";
import { triajeService } from "@/services/triajeService";

const TriajePage = () => {
  const [triajeTable, setTriajeTable] = useState([]);
  const [filtro, setFiltro] = useState("");

  const fetchData = async (filtro, fechaDesde, fechaHasta) => {
    try {
        const data = await triajeService.listarTriajePorFiltro(filtro, fechaDesde, fechaHasta)
        console.log(data);
        const tableData = parseTriajeTable(data);
        setTriajeTable(tableData);
    } catch (error) {
        console.log("No se pudo obtener los datos de los triajes");
    }
    }

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
    <section className="p-10">
      <h1 className="font-bold text-blue-500 text-6xl pb-8">
        Gestión de Triajes
      </h1>
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
      <div style={{ marginBottom: "1rem", color: "black" }} className="pl-12 pr-14">
        Número de resultados: {triajeTable.length}
      </div>
      <section className="pl-4 pr-2">
        <TriajeTable data={triajeTable}></TriajeTable>
      </section>
    </section>
  );
};

export default TriajePage;

