"use client";
import SearchAndAddBar from "@/components/bars/SearchAndAddBar";
import AppointmentTable from "./AppointmentTable";

const AppointmentPage = () => {
  return (
    <section className="p-10">
      <h1 className="font-bold text-blue-500 text-6xl pb-8">Citas</h1>
      <SearchAndAddBar linkHref="appointments/createAppointment" />
      <AppointmentTable />
    </section>
  );
};

export default AppointmentPage;
