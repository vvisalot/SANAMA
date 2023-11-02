import { useSort } from "@/hooks/useSort";
import Table from "@/components/table/Table";

const defaultColumns = [
  { name: "ID", sortable: true, sortKey: "ID", visible: false },
  { name: "Nombre del paciente", sortable: true, sortKey: "patientName" },
  { name: "Nombre del doctor", sortable: true, sortKey: "doctorName" },
  { name: "Especialidad", sortable: true, sortKey: "specialty" },
  { name: "Fecha", sortable: true, sortKey: "date" },
  { name: "Hora", sortable: true, sortKey: "time" },
  { name: "Estado", sortable: true, sortKey: "status" },
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

const AppointmentTable = ({ data, columns }) => {
  const displayColumns = columns ? columns : defaultColumns;
  /* De acuerco al parámetro columns, personalizaremos lo que muestra la tabla */ /*INICIO */
  let count = 0;
  const arrayDeArraysVacios = new Array(data.length).fill(null).map(() => []);
  displayColumns.forEach((column, indexColumn) => {
    let indexTablaDefa = columnExists(column.name);
    if (indexTablaDefa != -1) {
      data.forEach((elemento, index) => {
        arrayDeArraysVacios[index][count] = elemento[indexTablaDefa];
      });
      count++;
    } else {
    }
  });
  /* De acuerco al parámetro columns, personalizaremos lo que muestra la tabla */ /* FIN */
  const { sortedData, requestSort, sortConfig } = useSort(arrayDeArraysVacios);
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

export default AppointmentTable;
