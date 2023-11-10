"use client";
import DoctorTable from "./DoctorsTable";
import { doctorService } from "@/services/doctorService";
import { useEffect, useState } from "react";
import { parseDoctorsTable } from "@/util/doctorParser";
import Dropdown from "@/components/Dropdowns/Dropdown";
import SearchBar from "@/components/bars/SearchBar";
import TitleWithIcon from "@/components/TitleWithIcon";
import DoctorIcon from "@/components/icons/DoctorIcon";

const DoctorsPage = () => {
  const [doctorTable, setDoctorTable] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(
    "Todas las especialidades"
  );
  const fetchData = async (filtro, especialidad) => {
    try {
      const data = await doctorService.buscarPorMedicoEspecialidad(
        filtro,
        especialidad
      );
      const tableData = parseDoctorsTable(data);
      //console.log(tableData)
      setDoctorTable(tableData);
    } catch (error) {
      console.log("No se pudo obtener los datos de los doctores");
    }
  };

  const fetchSpecialty = async () => {
    try {
      const data = await doctorService.listarEspecialidades();
      setSpecialties(data);
      //console.log(data)
    } catch (error) {
      console.log("No se pudo obtener los datos de las especialidades");
    }
  };

  useEffect(() => {
    fetchData("", "");
    fetchSpecialty();
  }, []);

  // useEffect(() => {
  //     fetchData("", especialidadSeleccionada)
  // }, [especialidadSeleccionada])

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const dropdownValue = elements.namedItem("speciality-dropdown").value;
    const filtro = elements.namedItem("doctor-search").value;
    fetchData(filtro, dropdownValue);
  };

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Medicos"} Icon={DoctorIcon} />
      <form className="flex px-10 pb-4" onSubmit={handleSubmit}>
        <Dropdown
          data={specialties}
          defaultText={"Todas las especialidades"}
          text={"nombre"}
          defaultValue={""}
          value={"nombre"}
          name={"speciality-dropdown"}
          width={"w-[400px]"}
          handleChange={(event) => {
            setEspecialidadSeleccionada(event.target.value);
          }}
        ></Dropdown>
        <SearchBar
          name={"doctor-search"}
          width={"w-full"}
          placeholderText={"Buscar por nombre o CMP"}
          hrefBtnNuevo={"/doctors/newDoctor"}
        ></SearchBar>
      </form>
      <div
        style={{ marginBottom: "1rem", color: "black" }}
        className="pl-12 pr-14"
      >
        Número de resultados: {doctorTable.length}
      </div>
      <section className="pl-12 pr-14">
        <DoctorTable data={doctorTable}></DoctorTable>
      </section>
    </section>
  );
};

export default DoctorsPage;
