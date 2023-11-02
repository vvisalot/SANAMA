import { useSort } from "@/hooks/useSort";
import Table from "@/components/table/Table";

const defaultColumns = [
  {
    name: "ID",
    sortable: true,
    sortKey: "ID",
    visible: true,
  },
  { name: "ID Hoja Médica", sortable: true, sortKey: "idHojaMedica" },
  { name: "ID Médico Creador", sortable: true, sortKey: "idMedicoCreador" },
  { name: "Opciones", sortable: false },
];

function columnExists(columnName) {
  for (let i = 0; i < defaultColumns.length - 1; i++) {
    if (defaultColumns[i].name === columnName) {
      return i;
    }
  }
  return -1;
}

const medicalRecordsTable = ({ data, columns }) => {
  const displayColumns = columns ? columns : defaultColumns;
  const { sortedData, requestSort, sortConfig } = useSort(data);
  return (
    <Table
      url={"appointments/view"}
      columns={displayColumns}
      data={sortedData}
      requestSort={requestSort}
      sortConfig={sortConfig}
      optionsText="Ver Cita"
    />
  );
};

export default medicalRecordsTable;
