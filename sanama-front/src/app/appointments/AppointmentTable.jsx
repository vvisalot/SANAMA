import { useSort } from "@/hooks/useSort"; // Adjust the path according to your project structure
import Table from "@/components/table/Table";

const columns = [
  { name: "ID", sortable: false, visible: false },
  { name: "Nombre del paciente", sortable: true, sortKey: "patientName" },
  { name: "Nombre del doctor", sortable: true, sortKey: "doctorName" },
  { name: "Especialidad", sortable: true, sortKey: "specialty" },
  { name: "Fecha", sortable: true, sortKey: "date" },
  { name: "Hora", sortable: true, sortKey: "time" },
  { name: "Estado", sortable: true, sortKey: "status" },
  { name: "Opciones", sortable: false },
];

const AppointmentTable = ({ data }) => {
  const { sortedData, requestSort, sortConfig } = useSort(data);
  return (
    <Table
      url={"appointments/info"}
      columns={columns}
      data={sortedData}
      requestSort={requestSort}
      sortConfig={sortConfig}
      optionsText="Ver Cita"
    />
  );
};

export default AppointmentTable;
