"use client";
import { useEffect, useState } from "react";
import LaboratoryTable from "./LaboratoryTable";
import { parseLaboratoryTable } from "@/util/patientLaboratoryParser";
import { laboratoryService } from "@/services/laboratoryService";

const PatientLaboratoryResults = ({ params }) => {
  const [laboratoryTable, setLaboratoryTable] = useState([]);

  console.log("Recibe: ", params.idPatient)

  const fetchData = async (idPatient, fechaDesde, fechaHasta) => {
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
    
        return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
      };
    
      const fechaDesdeToSend = fechaDesde ? addHours(fechaDesde, 15) : null;
      const fechaHastaToSend = fechaHasta ? addHours(fechaHasta, 15) : null;

      const data = await laboratoryService.listarOrdenLaboratorioPorFiltro(idPatient, fechaDesdeToSend, fechaHastaToSend);
      const tableData = parseLaboratoryTable(data);
      setLaboratoryTable(tableData);
    } catch (error) {
      console.error("No se pudo obtener los datos de los laboratorios", error);
    }
  };

  useEffect(() => {
    fetchData(params.idPatient, null, null);
  }, [params.idPatient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const fechaDesde = elements.namedItem("fechaDesde").value;
    const fechaHasta = elements.namedItem("fechaHasta").value;
    fetchData(params.idPatient, fechaDesde, fechaHasta);
  };

  return (
    <section className="p-10">
      <h1 className="font-bold text-blue-500 text-6xl pb-8">
        Laboratorios del Paciente
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
        </div>
      </form>
      <div style={{ marginBottom: "1rem", color: "black" }} className="pl-12 pr-14 mt-4">
        Número de resultados: {laboratoryTable.length}
      </div>
      <section className="pl-4 pr-2">
        <LaboratoryTable data={laboratoryTable}></LaboratoryTable>
      </section>
    </section>
  );
};

export default PatientLaboratoryResults;