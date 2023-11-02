"use client";
import { useEffect, useState } from "react";
import LaboratoryTable from "./LaboratoryTable";
import { parseLaboratoryTable } from "@/util/laboratoryParser";
import SearchBar from "@/components/bars/SearchBar";
import { laboratoryService } from "@/services/laboratoryService";

const LaboratoryPage = () => {
  const [laboratoryTable, setLaboratoryTable] = useState([]);
  const [filtro, setFiltro] = useState("");

  const fetchData = async (filtro, fechaDesde, fechaHasta) => {
    try {
      const addHours = (dateStr, hoursToAdd) => {
        let date = new Date(dateStr);
        date.setHours(date.getHours() + hoursToAdd);
        
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        let hh = String(date.getHours()).padStart(2, '0');
        let min = String(date.getMinutes()).padStart(2, '0');
        let ss = String(date.getSeconds()).padStart(2, '0');
    
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      };
    
      const fechaDesdeToSend = fechaDesde ? addHours(fechaDesde, 15) : null;
      const fechaHastaToSend = fechaHasta ? addHours(fechaHasta, 15) : null;

      const data = await laboratoryService.listarOrdenLaboratorioPorFiltro(filtro, fechaDesdeToSend, fechaHastaToSend);
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
    const fechaDesde = elements.namedItem("fechaDesde").value;
    const fechaHasta = elements.namedItem("fechaHasta").value;
    fetchData(filtro, fechaDesde, fechaHasta);
  };

  return (
    <section className="p-10">
      <h1 className="font-bold text-blue-500 text-6xl pb-8">
        Laboratorios
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
        Número de resultados: {laboratoryTable.length}
      </div>
      <section className="pl-4 pr-2">
        <LaboratoryTable data={laboratoryTable}></LaboratoryTable>
      </section>
    </section>
  );
};

export default LaboratoryPage;
