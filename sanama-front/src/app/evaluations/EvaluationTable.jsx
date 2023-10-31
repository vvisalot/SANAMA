import Table from "@/components/table/Table";

const columns = [
  { name: "N° de Atención", sortable: true, sortKey: "appointmentNumber" },
  { name: "Fecha", sortable: true, sortKey: "date" },
  { name: "Nombre del Doctor", sortable: true, sortKey: "doctorName" },
  { name: "Opciones", sortable: false },
];

const EvaluationTable = ({ data }) => {
  return (
    <Table
      url={"appointments/info"}
      columns={columns}
      data={data}
      optionsText="Ver Hoja Medica"
    />
  );
};

export default EvaluationTable;
