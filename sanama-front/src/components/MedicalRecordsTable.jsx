import Table from "@/components/table/Table";

const columns = [
  { name: "ID" },
  { name: "Código" },
  { name: "Médico" },
  { name: "Especialidad" },
  { name: "Hora de Atención" },
  { name: "Fecha de Atención" },
];

const MedicalRecordsTable = ({ data }) => {
  return (
    <Table
      columns={columns}
      data={data}
      url="/evaluations/"
      optionsText="Ver"
    />
  );
};
export default MedicalRecordsTable;
