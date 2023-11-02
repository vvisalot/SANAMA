import Table from "@/components/table/Table";

const columns = [
  { name: "idCita" },
  { name: "Código cita" },
  { name: "Nombre del paciente" },
  { name: "Nombre del doctor" },
  { name: "Especialidad" },
  { name: "Fecha" },
  { name: "Hora" },
  { name: "Estado" },
  { name: "Opciones" },
];

const AppointmentTable = ({ data }) => {
  return (
    <Table
      columns={columns}
      data={data}
      url="appointment/view"
      optionsText="Ver perfil"
    />
  );
};
export default AppointmentTable;
