"use client";
import { useEffect, useState } from "react";
import PatientTable from "./PatientTable";
import { patientService } from "@/services/patientService";
import { parsePatientTable } from "@/util/patientParser";
import SearchBar from "@/components/bars/SearchBar";
import TitleWithIcon from "@/components/TitleWithIcon";
import PatientIcon from "@/components/icons/PatientIcon";

const PatientPage = () => {
  const [patientTable, setPatientTable] = useState([]);

  const fetchData = async (filtro) => {
    try {
      const data = await patientService.buscarPorFiltro(filtro);
      const tableData = parsePatientTable(data);
      console.log(tableData);
      setPatientTable(tableData);
    } catch (error) {
      console.log("No se pudo obtener los datos de los pacientes");
    }
  };

  useEffect(() => {
    fetchData("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const filtro = elements.namedItem("patients-search").value;
    fetchData(filtro);
  };

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Pacientes"} Icon={PatientIcon} />
      <form className="flex pl-8 pr-10 pb-4" onSubmit={handleSubmit}>
        <SearchBar
          name={"patients-search"}
          width={"w-full"}
          placeholderText={"Buscar por nombre o DNI"}
        />{" "}
        {/*ph: placeholder */}
      </form>

      <section className="pl-12 pr-14">
        <PatientTable data={patientTable}></PatientTable>
      </section>
    </section>
  );
};

export default PatientPage;
