import Table from "@/components/table/Table";

const columns = [
  { name: "ID" },
  { name: "Codigo" },
  { name: "Atendido por" },
  { name: "Fecha de " },
  { name: "Atender" },
];

const MedicalRecordsTable = ({ data }) => {
  return (
    <Table
      columns={columns}
      data={data}
      url="/evaluations/"
      optionsText="Atender"
    />
  );
};
export default MedicalRecordsTable;
