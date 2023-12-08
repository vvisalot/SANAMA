"use client";
import { useEffect, useState } from "react";
import { useAppointmentData } from "@/hooks/useAppointmentData";
import AppointmentTable from "@/components/appointments/AppointmentTable";

const initialRequest = {
  pn_id_especialidad: null,
  pv_filtro: "",
  pd_fecha_inicio: null,
  pd_fecha_fin: null,
  arregloEstados: [],
};

const CitasRecientes = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const { appointmentTable, fetchData } = useAppointmentData();

  useEffect(() => {
    fetchData(initialRequest);
  }, [initialRequest]);

  const options = [
    {
      text: "Ver",
      link: "/appointments",
      icon: "/icons/eye.svg",
    },
  ];

  return (
    <section className="w-full">
      <div
        className="text-xl font-bold text-black-500 px-4"
        style={{ color: "#28539E" }}
      >
        Citas pendientes
      </div>

      <section className="w-full p-4">
        <AppointmentTable
          data={appointmentTable}
          options={options}
          loadingTable={loadingTable}
        />
      </section>
    </section>
  );
};

export default CitasRecientes;
