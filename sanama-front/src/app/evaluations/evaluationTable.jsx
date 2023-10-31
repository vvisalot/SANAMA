import { useSort } from "@/hooks/useSort";
import Table from "@/components/table/Table";

const columns = [
  { name: "N° de Atención", sortable: true, sortKey: "appointmentNumber" },
  { name: "Fecha", sortable: true, sortKey: "date" },
  { name: "Nombre del Doctor", sortable: true, sortKey: "doctorName" },
  { name: "Opciones", sortable: false },
];

const evaluationTable = ({ data }) => {
  const { sortedData, requestSort, sortConfig } = useSort(data);
  return (
    <Table
      url={"appointments/info"}
      columns={columns}
      data={sortedData}
      requestSort={requestSort}
      sortConfig={sortConfig}
      optionsText="Ver Hoja Medica"
    />
  );
};

export default evaluationTable;
