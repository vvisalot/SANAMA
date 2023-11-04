//Listado de citas
"use client";

import SearchAndAddBar from "@/components/bars/SearchAndAddBar";
import { useEffect, useState } from "react";
import AppointmentTable from "./AppointmentTable";
import { appointmentService } from "@/services/appointmentService";
import { parseAppointmentTable } from "@/util/appointmentParser";

const AppointmentPage = () => {
  const [appointmentTable, setAppointmentTable] = useState([]);

  const fetchData = async () => {
    try {
      const data = await appointmentService.listar();
      const tableData = parseAppointmentTable(data);
      setAppointmentTable(tableData);
      //console.log(data);
    } catch (error) {
      console.log("No se pudo obtener la lista de las citas");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const filtro = elements.namedItem("filtro").value;
    try {
      const data = await appointmentService.buscar(filtro);
      const tableData = parseAppointmentTable(data);
      setAppointmentTable(tableData);
    } catch (error) {
      console.log("Error al buscar las citas:", error);
    }
  };

  return (
    <section className="p-10">
      <h1 className="font-bold text-blue-500 text-6xl pb-8">Citas</h1>
      <SearchAndAddBar
        linkHref="appointments/createAppointment"
        onSubmit={handleSubmit}
        permitirGenerarNuevaCita={true}
      />
      <AppointmentTable data={appointmentTable}></AppointmentTable>
    </section>
  );
};

export default AppointmentPage;
